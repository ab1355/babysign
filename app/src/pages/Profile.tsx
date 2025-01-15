import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
} from '@mui/material';
import { UserPreferences } from '../types';

const Profile: React.FC = () => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    userId: '1',
    notificationsEnabled: true,
    reminderFrequency: 'daily',
    preferredCategories: ['Food & Drink', 'Common Words'],
  });

  const [profile, setProfile] = useState({
    displayName: 'John Doe',
    email: 'john@example.com',
    childName: 'Baby Doe',
    childAge: '12 months',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    // TODO: Implement save to Firebase
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Profile Settings
        </Typography>

        {saveSuccess && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Profile updated successfully!
          </Alert>
        )}

        <Grid container spacing={4}>
          {/* Profile Information */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar
                  sx={{ width: 80, height: 80, mr: 2 }}
                  src="/placeholder-avatar.jpg"
                />
                <Box>
                  <Typography variant="h5">{profile.displayName}</Typography>
                  <Typography color="text.secondary">{profile.email}</Typography>
                </Box>
              </Box>

              <Typography variant="h6" gutterBottom>
                Parent Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Display Name"
                    value={profile.displayName}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setProfile({ ...profile, displayName: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={profile.email}
                    disabled={!isEditing}
                    type="email"
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                  />
                </Grid>
              </Grid>

              <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                Child Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Child's Name"
                    value={profile.childName}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setProfile({ ...profile, childName: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Child's Age"
                    value={profile.childAge}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setProfile({ ...profile, childAge: e.target.value })
                    }
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 3 }}>
                {!isEditing ? (
                  <Button
                    variant="contained"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                      variant="contained"
                      onClick={handleSave}
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>

          {/* Preferences */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Preferences
              </Typography>

              <Box sx={{ mb: 3 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={preferences.notificationsEnabled}
                      onChange={(e) =>
                        setPreferences({
                          ...preferences,
                          notificationsEnabled: e.target.checked,
                        })
                      }
                    />
                  }
                  label="Enable Notifications"
                />
              </Box>

              <Divider sx={{ my: 3 }} />

              <Typography variant="subtitle1" gutterBottom>
                Reminder Frequency
              </Typography>
              <Grid container spacing={2}>
                {['daily', 'weekly', 'monthly'].map((frequency) => (
                  <Grid item key={frequency}>
                    <Button
                      variant={
                        preferences.reminderFrequency === frequency
                          ? 'contained'
                          : 'outlined'
                      }
                      onClick={() =>
                        setPreferences({
                          ...preferences,
                          reminderFrequency: frequency as any,
                        })
                      }
                    >
                      {frequency.charAt(0).toUpperCase() + frequency.slice(1)}
                    </Button>
                  </Grid>
                ))}
              </Grid>

              <Box sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    // TODO: Save preferences to Firebase
                    setSaveSuccess(true);
                    setTimeout(() => setSaveSuccess(false), 3000);
                  }}
                >
                  Save Preferences
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Profile;
