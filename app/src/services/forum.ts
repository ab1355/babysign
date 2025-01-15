import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { db } from '../config/firebase';

interface CreatePostData {
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  images?: string[];
  tags: string[];
}

interface CreateCommentData {
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
}

export const createPost = async (data: CreatePostData) => {
  try {
    const postRef = await addDoc(collection(db, 'posts'), {
      ...data,
      likes: [],
      comments: [],
      createdAt: serverTimestamp(),
    });
    return postRef.id;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const getPosts = async (limit = 20) => {
  try {
    const q = query(
      collection(db, 'posts'),
      orderBy('createdAt', 'desc'),
      limit(limit)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error getting posts:', error);
    throw error;
  }
};

export const getPostsByUser = async (userId: string) => {
  try {
    const q = query(
      collection(db, 'posts'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error getting user posts:', error);
    throw error;
  }
};

export const getPostsByTag = async (tag: string) => {
  try {
    const q = query(
      collection(db, 'posts'),
      where('tags', 'array-contains', tag),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error getting posts by tag:', error);
    throw error;
  }
};

export const likePost = async (postId: string, userId: string) => {
  try {
    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, {
      likes: arrayUnion(userId),
    });
  } catch (error) {
    console.error('Error liking post:', error);
    throw error;
  }
};

export const unlikePost = async (postId: string, userId: string) => {
  try {
    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, {
      likes: arrayRemove(userId),
    });
  } catch (error) {
    console.error('Error unliking post:', error);
    throw error;
  }
};

export const addComment = async (postId: string, data: CreateCommentData) => {
  try {
    const postRef = doc(db, 'posts', postId);
    const comment = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      createdAt: serverTimestamp(),
    };
    await updateDoc(postRef, {
      comments: arrayUnion(comment),
    });
    return comment.id;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

export const deletePost = async (postId: string) => {
  try {
    await deleteDoc(doc(db, 'posts', postId));
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

export const searchPosts = async (query: string) => {
  try {
    // Note: For proper text search, consider using Algolia or similar service
    const q = collection(db, 'posts');
    const snapshot = await getDocs(q);
    return snapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter(post =>
        post.content.toLowerCase().includes(query.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
  } catch (error) {
    console.error('Error searching posts:', error);
    throw error;
  }
};
