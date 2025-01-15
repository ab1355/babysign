import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Quiz, QuizAttempt, Badge, UserAchievement } from '../types/quiz';

// Quiz Management
export const getQuizzes = async (category?: string): Promise<Quiz[]> => {
  try {
    let q = collection(db, 'quizzes');
    if (category) {
      q = query(q, where('category', '==', category));
    }
    const quizzesSnapshot = await getDocs(q);
    return quizzesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as Quiz));
  } catch (error) {
    console.error('Error getting quizzes:', error);
    throw error;
  }
};

export const getQuizById = async (quizId: string): Promise<Quiz> => {
  try {
    const quizDoc = await getDoc(doc(db, 'quizzes', quizId));
    if (!quizDoc.exists()) {
      throw new Error('Quiz not found');
    }
    return {
      id: quizDoc.id,
      ...quizDoc.data(),
    } as Quiz;
  } catch (error) {
    console.error('Error getting quiz:', error);
    throw error;
  }
};

export const submitQuizAttempt = async (attempt: QuizAttempt): Promise<void> => {
  try {
    await setDoc(doc(db, 'quiz-attempts', attempt.id), attempt);
    await checkForAchievements(attempt.userId);
  } catch (error) {
    console.error('Error submitting quiz attempt:', error);
    throw error;
  }
};

// Achievement System
export const getBadges = async (): Promise<Badge[]> => {
  try {
    const badgesSnapshot = await getDocs(collection(db, 'badges'));
    return badgesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as Badge));
  } catch (error) {
    console.error('Error getting badges:', error);
    throw error;
  }
};

export const getUserAchievements = async (userId: string): Promise<UserAchievement[]> => {
  try {
    const q = query(
      collection(db, 'achievements'),
      where('userId', '==', userId),
      orderBy('earnedAt', 'desc')
    );
    const achievementsSnapshot = await getDocs(q);
    return achievementsSnapshot.docs.map(doc => ({
      ...doc.data(),
    } as UserAchievement));
  } catch (error) {
    console.error('Error getting user achievements:', error);
    throw error;
  }
};

export const awardBadge = async (userId: string, badgeId: string): Promise<void> => {
  try {
    const achievement: UserAchievement = {
      userId,
      badgeId,
      earnedAt: new Date(),
      progress: 100,
    };
    await setDoc(doc(db, 'achievements', `${userId}_${badgeId}`), achievement);
  } catch (error) {
    console.error('Error awarding badge:', error);
    throw error;
  }
};

// Helper function to check and award achievements
const checkForAchievements = async (userId: string): Promise<void> => {
  try {
    // Get all badges
    const badges = await getBadges();
    const userAchievements = await getUserAchievements(userId);
    const earnedBadgeIds = new Set(userAchievements.map(a => a.badgeId));

    // Check each badge's criteria
    for (const badge of badges) {
      if (earnedBadgeIds.has(badge.id)) continue;

      let meetsRequirement = false;
      switch (badge.criteria.type) {
        case 'quiz_score':
          const attempts = await getUserQuizAttempts(userId);
          const highScore = Math.max(...attempts.map(a => a.score));
          meetsRequirement = highScore >= badge.criteria.threshold;
          break;

        case 'lessons_completed':
          // Implementation for lessons completed criteria
          break;

        case 'practice_streak':
          // Implementation for practice streak criteria
          break;

        case 'signs_learned':
          // Implementation for signs learned criteria
          break;
      }

      if (meetsRequirement) {
        await awardBadge(userId, badge.id);
      }
    }
  } catch (error) {
    console.error('Error checking achievements:', error);
    throw error;
  }
};

// Helper function to get user's quiz attempts
const getUserQuizAttempts = async (userId: string): Promise<QuizAttempt[]> => {
  try {
    const q = query(
      collection(db, 'quiz-attempts'),
      where('userId', '==', userId),
      orderBy('completedAt', 'desc')
    );
    const attemptsSnapshot = await getDocs(q);
    return attemptsSnapshot.docs.map(doc => ({
      ...doc.data(),
    } as QuizAttempt));
  } catch (error) {
    console.error('Error getting user quiz attempts:', error);
    throw error;
  }
};
