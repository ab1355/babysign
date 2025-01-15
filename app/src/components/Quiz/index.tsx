import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Quiz, QuizQuestion, QuizAttempt } from '../../types/quiz';
import { useAuth } from '../../context/AuthContext';
import confetti from 'canvas-confetti';

interface QuizComponentProps {
  quiz: Quiz;
  onComplete: (attempt: QuizAttempt) => void;
}

const QuizComponent: React.FC<QuizComponentProps> = ({ quiz, onComplete }) => {
  const { user } = useAuth();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<string, string | boolean>>(new Map());
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit ? quiz.timeLimit * 60 : 0);
  const [showResults, setShowResults] = useState(false);
  const [startTime] = useState(new Date());
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = (currentQuestionIndex / quiz.questions.length) * 100;

  useEffect(() => {
    if (quiz.timeLimit && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleQuizComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [quiz.timeLimit, timeLeft]);

  const handleAnswer = (answer: string | boolean) => {
    setAnswers(new Map(answers.set(currentQuestion.id, answer)));
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setShowExplanation(false);
    } else {
      handleQuizComplete();
    }
  };

  const handleQuizComplete = () => {
    const endTime = new Date();
    const timeSpent = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);

    const attemptAnswers = Array.from(answers.entries()).map(([questionId, userAnswer]) => {
      const question = quiz.questions.find((q) => q.id === questionId)!;
      return {
        questionId,
        userAnswer,
        correct: userAnswer === question.correctAnswer,
      };
    });

    const score = attemptAnswers.reduce((total, answer) => {
      const question = quiz.questions.find((q) => q.id === answer.questionId)!;
      return total + (answer.correct ? question.points : 0);
    }, 0);

    const maxScore = quiz.questions.reduce((total, question) => total + question.points, 0);
    const percentageScore = (score / maxScore) * 100;
    const passed = percentageScore >= quiz.passingScore;

    if (passed) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }

    const attempt: QuizAttempt = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user?.id || '',
      quizId: quiz.id,
      score,
      answers: attemptAnswers,
      completedAt: endTime,
      timeSpent,
      passed,
    };

    onComplete(attempt);
    setShowResults(true);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      {/* Progress Bar */}
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{ mb: 4, height: 8, borderRadius: 4 }}
      />

      {/* Timer */}
      {quiz.timeLimit && (
        <Typography variant="h6" align="right" sx={{ mb: 2 }}>
          Time Left: {formatTime(timeLeft)}
        </Typography>
      )}

      {!showResults ? (
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Question {currentQuestionIndex + 1} of {quiz.questions.length}
            </Typography>
            
            <Typography variant="h6" sx={{ mb: 3 }}>
              {currentQuestion.question}
            </Typography>

            {currentQuestion.videoUrl && (
              <Box sx={{ mb: 3 }}>
                <video
                  controls
                  width="100%"
                  src={currentQuestion.videoUrl}
                />
              </Box>
            )}

            {currentQuestion.type === 'multiple-choice' && (
              <RadioGroup
                value={answers.get(currentQuestion.id) || ''}
                onChange={(e) => handleAnswer(e.target.value)}
              >
                {currentQuestion.options?.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            )}

            {currentQuestion.type === 'true-false' && (
              <RadioGroup
                value={answers.get(currentQuestion.id) || ''}
                onChange={(e) => handleAnswer(e.target.value === 'true')}
              >
                <FormControlLabel value="true" control={<Radio />} label="True" />
                <FormControlLabel value="false" control={<Radio />} label="False" />
              </RadioGroup>
            )}

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant="outlined"
                onClick={() => setShowExplanation(true)}
                disabled={!answers.has(currentQuestion.id)}
              >
                Check Answer
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!answers.has(currentQuestion.id)}
              >
                {currentQuestionIndex === quiz.questions.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent>
            <Typography variant="h4" gutterBottom align="center">
              Quiz Complete!
            </Typography>
            <Typography variant="h5" align="center" sx={{ mb: 3 }}>
              Your Score: {Math.round((Array.from(answers.entries()).filter(([questionId, answer]) => {
                const question = quiz.questions.find((q) => q.id === questionId)!;
                return answer === question.correctAnswer;
              }).length / quiz.questions.length) * 100)}%
            </Typography>
            <Button
              variant="contained"
              fullWidth
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Explanation Dialog */}
      <Dialog open={showExplanation} onClose={() => setShowExplanation(false)}>
        <DialogTitle>Answer Explanation</DialogTitle>
        <DialogContent>
          <Typography paragraph>
            {currentQuestion.explanation || 'No explanation available for this question.'}
          </Typography>
          <Typography color={
            answers.get(currentQuestion.id) === currentQuestion.correctAnswer
              ? 'success.main'
              : 'error.main'
          }>
            {answers.get(currentQuestion.id) === currentQuestion.correctAnswer
              ? 'Correct!'
              : 'Incorrect. Try again!'}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowExplanation(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default QuizComponent;
