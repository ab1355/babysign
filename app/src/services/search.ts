import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { searchPosts } from './forum';

export interface SearchResult {
  type: 'sign' | 'lesson' | 'post';
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  url: string;
  tags?: string[];
  category?: string;
  matchScore: number;
}

export const searchAll = async (searchQuery: string): Promise<SearchResult[]> => {
  try {
    const [signResults, lessonResults, postResults] = await Promise.all([
      searchSigns(searchQuery),
      searchLessons(searchQuery),
      searchPosts(searchQuery),
    ]);

    const results: SearchResult[] = [
      ...signResults.map(sign => ({
        type: 'sign' as const,
        id: sign.id,
        title: sign.word,
        description: sign.description,
        thumbnail: sign.thumbnailUrl,
        url: `/library/${sign.id}`,
        tags: sign.tags,
        category: sign.category,
        matchScore: calculateMatchScore(searchQuery, sign.word, sign.description),
      })),
      ...lessonResults.map(lesson => ({
        type: 'lesson' as const,
        id: lesson.id,
        title: lesson.title,
        description: lesson.description,
        thumbnail: lesson.thumbnailUrl,
        url: `/lessons/${lesson.id}`,
        category: lesson.category,
        matchScore: calculateMatchScore(searchQuery, lesson.title, lesson.description),
      })),
      ...postResults.map(post => ({
        type: 'post' as const,
        id: post.id,
        title: post.content.substring(0, 100) + '...',
        description: '',
        url: `/forum/post/${post.id}`,
        tags: post.tags,
        matchScore: calculateMatchScore(searchQuery, post.content, post.tags.join(' ')),
      })),
    ];

    // Sort results by match score
    return results.sort((a, b) => b.matchScore - a.matchScore);
  } catch (error) {
    console.error('Error searching:', error);
    throw error;
  }
};

const searchSigns = async (query: string) => {
  const q = collection(db, 'signs');
  const snapshot = await getDocs(q);
  return snapshot.docs
    .map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))
    .filter(sign =>
      sign.word.toLowerCase().includes(query.toLowerCase()) ||
      sign.description.toLowerCase().includes(query.toLowerCase()) ||
      sign.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
};

const searchLessons = async (query: string) => {
  const q = collection(db, 'lessons');
  const snapshot = await getDocs(q);
  return snapshot.docs
    .map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))
    .filter(lesson =>
      lesson.title.toLowerCase().includes(query.toLowerCase()) ||
      lesson.description.toLowerCase().includes(query.toLowerCase())
    );
};

// Helper function to calculate relevance score
const calculateMatchScore = (query: string, ...fields: string[]): number => {
  const queryWords = query.toLowerCase().split(' ');
  let score = 0;

  fields.forEach(field => {
    const fieldLower = field.toLowerCase();
    queryWords.forEach(word => {
      // Exact match
      if (fieldLower === word) {
        score += 10;
      }
      // Contains word
      else if (fieldLower.includes(word)) {
        score += 5;
      }
      // Partial match
      else if (word.length > 3 && fieldLower.includes(word.substring(0, word.length - 1))) {
        score += 2;
      }
    });
  });

  return score;
};
