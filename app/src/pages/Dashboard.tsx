import React from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Dashboard: React.FC = () => {
  const progress = {
    totalSigns: 50,
    learnedSigns: 15,
    activeDays: 7,
    streak: 3,
  };

  const recentActivity = [
    {
      date: '2025-01-14',
      action: 'Completed "Mealtime Signs" lesson',
      type: 'lesson',
    },
    {
      date: '2025-01-13',
      action: 'Learned sign for "More"',
      type: 'sign',
    },
    {
      date: '2025-01-12',
      action: 'Started "Emotions" lesson',
      type: 'lesson',
    },
  ];

  const achievements = [
    {
      title: 'First Steps',
      description: 'Learned your first 5 signs',
      progress: 100,
    },
    {
      title: 'Consistent Learner',
      description: 'Practice for 7 days in a row',
      progress: 60,
    },
    {
      title: 'Sign Master',
      description: 'Learn 50 signs',
      progress: 30,
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Learning Dashboard
        </Typography>

        {/* Progress Overview */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Signs Learned
                </Typography>
                <Typography variant="h4">
                  {progress.learnedSigns}/{progress.totalSigns}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(progress.learnedSigns / progress.totalSigns) * 100}
                  sx={{ mt: 2 }}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Active Days
                </Typography>
                <Typography variant="h4">{progress.activeDays}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Current Streak
                </Typography>
                <Typography variant="h4">{progress.streak} days</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Next Milestone
                </Typography>
                <Typography variant="h4">5 signs</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Recent Activity and Achievements */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Recent Activity
              </Typography>
              <Timeline>
                {recentActivity.map((activity, index) => (
                  <TimelineItem key={index}>
                    <TimelineSeparator>
                      <TimelineDot color={activity.type === 'lesson' ? 'primary' : 'secondary'} />
                      {index < recentActivity.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography variant="subtitle2" color="text.secondary">
                        {activity.date}
                      </Typography>
                      <Typography>{activity.action}</Typography>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Achievements
              </Typography>
              <List>
                {achievements.map((achievement, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <EmojiEventsIcon color={achievement.progress === 100 ? 'primary' : 'disabled'} />
                    </ListItemIcon>
                    <ListItemText
                      primary={achievement.title}
                      secondary={achievement.description}
                    />
                    <Box sx={{ width: '100px' }}>
                      <LinearProgress
                        variant="determinate"
                        value={achievement.progress}
                      />
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;
