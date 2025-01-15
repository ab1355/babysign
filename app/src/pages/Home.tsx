import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';

const Home: React.FC = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 6,
          borderRadius: 2,
        }}
      >
        <Container maxWidth="md">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            gutterBottom
          >
            Baby Sign Language
          </Typography>
          <Typography
            variant="h5"
            align="center"
            paragraph
            sx={{ mb: 4 }}
          >
            Empower communication between you and your little one
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              component={RouterLink}
              to="/library"
              variant="contained"
              color="secondary"
              size="large"
            >
              Start Learning
            </Button>
            <Button
              component={RouterLink}
              to="/lessons"
              variant="outlined"
              color="inherit"
              size="large"
            >
              View Lessons
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image="/placeholder.jpg"
                alt="Sign Language Library"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Sign Language Library
                </Typography>
                <Typography>
                  Access our comprehensive library of baby signs with clear,
                  animated demonstrations.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image="/placeholder.jpg"
                alt="Interactive Lessons"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Interactive Lessons
                </Typography>
                <Typography>
                  Learn through engaging, step-by-step lessons designed for
                  both parents and babies.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image="/placeholder.jpg"
                alt="Progress Tracking"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Progress Tracking
                </Typography>
                <Typography>
                  Monitor your child's learning journey and celebrate their
                  communication milestones.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
