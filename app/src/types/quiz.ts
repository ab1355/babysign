export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'video-matching' | 'true-false';
  question: string;
  options?: string[];
  correctAnswer: string | boolean;
  videoUrl?: string;
  explanation?: string;
  points: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questions: QuizQuestion[];
  timeLimit?: number; // in minutes
  passingScore: number;
}

export interface QuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  score: number;
  answers: {
    questionId: string;
    userAnswer: string | boolean;
    correct: boolean;
  }[];
  completedAt: Date;
  timeSpent: number; // in seconds
  passed: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  criteria: {
    type: 'quiz_score' | 'lessons_completed' | 'practice_streak' | 'signs_learned';
    threshold: number;
  };
}

export interface UserAchievement {
  userId: string;
  badgeId: string;
  earnedAt: Date;
  progress: number;
}
