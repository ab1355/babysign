import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserPreferences, updateUserPreferences } from '../services/firestore';
import { UserPreferences } from '../types';

export const usePreferences = () => {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPreferences = async () => {
      if (!user) {
        setPreferences(null);
        setLoading(false);
        return;
      }

      try {
        const userPreferences = await getUserPreferences(user.id);
        setPreferences(userPreferences);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchPreferences();
  }, [user]);

  const updatePreferences = async (newPreferences: Partial<UserPreferences>) => {
    if (!user || !preferences) return;

    try {
      await updateUserPreferences(user.id, newPreferences);
      setPreferences({ ...preferences, ...newPreferences });
      setError(null);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return {
    preferences,
    loading,
    error,
    updatePreferences,
  };
};

export default usePreferences;
