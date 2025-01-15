import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  LinearProgress,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  progress: number;
  signs: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

const mockLessons: Lesson[] = [
  {
    id: '1',
    title: 'Getting Started with Baby Signs',
    description: 'Learn the most essential signs for daily communication with your baby.',
    duration: '15 mins',
    progress: 0,
    signs: ['Milk', 'More', 'All Done'],
    difficulty: 'Beginner',
  },
  {
    id: '2',
    title: 'Mealtime Signs',
    description: 'Essential signs for communicating during meals.',
    duration: '20 mins',
    progress: 30,
    signs: ['Eat', 'Drink', 'Please', 'Thank You'],
    difficulty: 'Beginner',
  },
  {
    id: '3',
    title: 'Emotions and Feelings',
    description: 'Help your baby express their emotions through sign language.',
    duration: '25 mins',
    progress: 0,
    signs: ['Happy', 'Sad', 'Tired', 'Love'],
    difficulty: 'Intermediate',
  },
];

const Lessons: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const handleStartLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
  };

  const handleCloseDialog = () => {
    setSelectedLesson(null);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Interactive Lessons
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Learn baby sign language through our structured, interactive lessons
        </Typography>

        <Grid container spacing={4}>
          {mockLessons.map((lesson) => (
            <Grid item xs={12} md={6} lg={4} key={lesson.id}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {lesson.title}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={lesson.difficulty}
                      color={
                        lesson.difficulty === 'Beginner'
                          ? 'success'
                          : lesson.difficulty === 'Intermediate'
                          ? 'primary'
                          : 'error'
                      }
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Chip
                      label={lesson.duration}
                      variant="outlined"
                      size="small"
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {lesson.description}
                  </Typography>
                  <Box sx={{ mt: 2, mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Progress
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={lesson.progress}
                      sx={{ mt: 1 }}
                    />
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    startIcon={
                      lesson.progress > 0 ? (
                        <CheckCircleIcon />
                      ) : (
                        <PlayCircleOutlineIcon />
                      )
                    }
                    onClick={() => handleStartLesson(lesson)}
                    fullWidth
                  >
                    {lesson.progress > 0 ? 'Continue' : 'Start Lesson'}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Lesson Dialog */}
      <Dialog
        open={!!selectedLesson}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        {selectedLesson && (
          <>
            <DialogTitle>{selectedLesson.title}</DialogTitle>
            <DialogContent>
              <Typography variant="subtitle1" paragraph>
                Signs you'll learn in this lesson:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {selectedLesson.signs.map((sign) => (
                  <Chip key={sign} label={sign} />
                ))}
              </Box>
              <Typography variant="body1">
                This lesson will guide you through learning these signs with
                interactive videos and practice exercises.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button variant="contained" onClick={handleCloseDialog}>
                Start Learning
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default Lessons;
