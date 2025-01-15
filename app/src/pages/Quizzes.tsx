import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  CircularProgress,
  Dialog,
} from '@mui/material';
import { Quiz as QuizType, QuizAttempt } from '../types/quiz';
import { getQuizzes, submitQuizAttempt } from '../services/quiz';
import Quiz from '../components/Quiz';
import BadgesComponent from '../components/Badges';

const Quizzes: React.FC = () => {
  const [quizzes, setQuizzes] = useState<QuizType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuiz, setSelectedQuiz] = useState<QuizType | null>(null);
  const [showBadges, setShowBadges] = useState(false);

  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        const loadedQuizzes = await getQuizzes();
        setQuizzes(loadedQuizzes);
      } catch (error) {
        console.error('Error loading quizzes:', error);
      } finally {
        setLoading(false);
      }
    };

    loadQuizzes();
  }, []);

  const handleQuizComplete = async (attempt: QuizAttempt) => {
    try {
      await submitQuizAttempt(attempt);
      setSelectedQuiz(null);
      // Show badges after completing a quiz
      setShowBadges(true);
    } catch (error) {
      console.error('Error submitting quiz attempt:', error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
          <Typography variant="h3" component="h1">
            Practice Quizzes
          </Typography>
          <Button
            variant="outlined"
            onClick={() => setShowBadges(true)}
          >
            View Achievements
          </Button>
        </Box>

        <Grid container spacing={4}>
          {quizzes.map((quiz) => (
            <Grid item xs={12} sm={6} md={4} key={quiz.id}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {quiz.title}
                  </Typography>
                  <Typography color="text.secondary" paragraph>
                    {quiz.description}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={quiz.difficulty}
                      color={
                        quiz.difficulty === 'beginner'
                          ? 'success'
                          : quiz.difficulty === 'intermediate'
                          ? 'primary'
                          : 'error'
                      }
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Chip
                      label={`${quiz.questions.length} questions`}
                      variant="outlined"
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    {quiz.timeLimit && (
                      <Chip
                        label={`${quiz.timeLimit} min`}
                        variant="outlined"
                        size="small"
                      />
                    )}
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => setSelectedQuiz(quiz)}
                  >
                    Start Quiz
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Quiz Dialog */}
      <Dialog
        open={!!selectedQuiz}
        onClose={() => setSelectedQuiz(null)}
        maxWidth="md"
        fullWidth
      >
        {selectedQuiz && (
          <Quiz
            quiz={selectedQuiz}
            onComplete={handleQuizComplete}
          />
        )}
      </Dialog>

      {/* Badges Dialog */}
      <Dialog
        open={showBadges}
        onClose={() => setShowBadges(false)}
        maxWidth="md"
        fullWidth
      >
        <BadgesComponent />
        <Box sx={{ p: 2, textAlign: 'right' }}>
          <Button onClick={() => setShowBadges(false)}>Close</Button>
        </Box>
      </Dialog>
    </Container>
  );
};

export default Quizzes;
