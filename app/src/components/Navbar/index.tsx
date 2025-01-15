import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from '@mui/material';

const Navbar: React.FC = () => {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Container>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
              flexGrow: 1,
              fontWeight: 'bold',
            }}
          >
            Baby Sign Language
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              component={RouterLink}
              to="/library"
              color="inherit"
            >
              Library
            </Button>
            <Button
              component={RouterLink}
              to="/lessons"
              color="inherit"
            >
              Lessons
            </Button>
            <Button
              component={RouterLink}
              to="/quizzes"
              color="inherit"
            >
              Quizzes
            </Button>
            <Button
              component={RouterLink}
              to="/dashboard"
              color="inherit"
            >
              Dashboard
            </Button>
            <Button
              component={RouterLink}
              to="/profile"
              color="primary"
              variant="contained"
            >
              Profile
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
