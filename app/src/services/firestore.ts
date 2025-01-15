import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { SignLanguageSign, LessonProgress, UserPreferences } from '../types';

// Signs
export const getSigns = async (): Promise<SignLanguageSign[]> => {
  try {
    const signsSnapshot = await getDocs(collection(db, 'signs'));
    return signsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as SignLanguageSign));
  } catch (error) {
    console.error('Error getting signs:', error);
    throw error;
  }
};

export const getSignsByCategory = async (category: string): Promise<SignLanguageSign[]> => {
  try {
    const q = query(
      collection(db, 'signs'),
      where('category', '==', category)
    );
    const signsSnapshot = await getDocs(q);
    return signsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as SignLanguageSign));
  } catch (error) {
    console.error('Error getting signs by category:', error);
    throw error;
  }
};

// Progress
export const updateProgress = async (
  userId: string,
  signId: string,
  progress: Partial<LessonProgress>
): Promise<void> => {
  try {
    const progressRef = doc(db, 'progress', `${userId}_${signId}`);
    const progressDoc = await getDoc(progressRef);

    if (progressDoc.exists()) {
      await updateDoc(progressRef, progress);
    } else {
      await setDoc(progressRef, {
        userId,
        signId,
        completed: false,
        lastPracticed: new Date(),
        proficiencyLevel: 0,
        ...progress,
      });
    }
  } catch (error) {
    console.error('Error updating progress:', error);
    throw error;
  }
};

export const getUserProgress = async (userId: string): Promise<LessonProgress[]> => {
  try {
    const q = query(
      collection(db, 'progress'),
      where('userId', '==', userId),
      orderBy('lastPracticed', 'desc')
    );
    const progressSnapshot = await getDocs(q);
    return progressSnapshot.docs.map(doc => ({
      ...doc.data(),
    } as LessonProgress));
  } catch (error) {
    console.error('Error getting user progress:', error);
    throw error;
  }
};

// User Preferences
export const getUserPreferences = async (userId: string): Promise<UserPreferences> => {
  try {
    const preferencesDoc = await getDoc(doc(db, 'preferences', userId));
    if (preferencesDoc.exists()) {
      return preferencesDoc.data() as UserPreferences;
    }
    
    // Return default preferences if none exist
    return {
      userId,
      notificationsEnabled: true,
      reminderFrequency: 'daily',
      preferredCategories: [],
    };
  } catch (error) {
    console.error('Error getting user preferences:', error);
    throw error;
  }
};

export const updateUserPreferences = async (
  userId: string,
  preferences: Partial<UserPreferences>
): Promise<void> => {
  try {
    const preferencesRef = doc(db, 'preferences', userId);
    await updateDoc(preferencesRef, preferences);
  } catch (error) {
    console.error('Error updating user preferences:', error);
    throw error;
  }
};

// Analytics
export const trackUserActivity = async (
  userId: string,
  activity: {
    type: string;
    details: any;
    timestamp: Date;
  }
): Promise<void> => {
  try {
    const activityRef = collection(db, 'activity');
    await setDoc(doc(activityRef), {
      userId,
      ...activity,
    });
  } catch (error) {
    console.error('Error tracking user activity:', error);
    throw error;
  }
};
