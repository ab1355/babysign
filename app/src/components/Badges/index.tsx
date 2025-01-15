import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Tooltip,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { Badge, UserAchievement } from '../../types/quiz';
import { getBadges, getUserAchievements } from '../../services/quiz';
import { useAuth } from '../../context/AuthContext';

const BadgesComponent: React.FC = () => {
  const { user } = useAuth();
  const [badges, setBadges] = useState<Badge[]>([]);
  const [achievements, setAchievements] = useState<UserAchievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  useEffect(() => {
    const loadBadgesAndAchievements = async () => {
      if (!user) return;

      try {
        const [allBadges, userAchievements] = await Promise.all([
          getBadges(),
          getUserAchievements(user.id),
        ]);
        setBadges(allBadges);
        setAchievements(userAchievements);
      } catch (error) {
        console.error('Error loading badges:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBadgesAndAchievements();
  }, [user]);

  const getAchievementForBadge = (badgeId: string) => {
    return achievements.find(a => a.badgeId === badgeId);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Your Achievements
      </Typography>

      <Grid container spacing={3}>
        {badges.map((badge) => {
          const achievement = getAchievementForBadge(badge.id);
          const isEarned = !!achievement;

          return (
            <Grid item xs={6} sm={4} md={3} key={badge.id}>
              <Tooltip
                title={isEarned ? 'Earned!' : `Complete ${badge.criteria.threshold} ${badge.criteria.type.replace('_', ' ')} to earn`}
              >
                <Card
                  sx={{
                    cursor: 'pointer',
                    opacity: isEarned ? 1 : 0.6,
                    transition: 'transform 0.2s, opacity 0.2s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                  onClick={() => setSelectedBadge(badge)}
                >
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Avatar
                      src={badge.imageUrl}
                      sx={{
                        width: 80,
                        height: 80,
                        mx: 'auto',
                        mb: 2,
                        filter: isEarned ? 'none' : 'grayscale(100%)',
                      }}
                    />
                    <Typography variant="subtitle1" noWrap>
                      {badge.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Tooltip>
            </Grid>
          );
        })}
      </Grid>

      {/* Badge Details Dialog */}
      <Dialog
        open={!!selectedBadge}
        onClose={() => setSelectedBadge(null)}
        maxWidth="xs"
        fullWidth
      >
        {selectedBadge && (
          <>
            <DialogTitle>{selectedBadge.name}</DialogTitle>
            <DialogContent>
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Avatar
                  src={selectedBadge.imageUrl}
                  sx={{
                    width: 120,
                    height: 120,
                    mx: 'auto',
                    mb: 2,
                    filter: getAchievementForBadge(selectedBadge.id)
                      ? 'none'
                      : 'grayscale(100%)',
                  }}
                />
              </Box>
              <Typography paragraph>{selectedBadge.description}</Typography>
              <Typography color="text.secondary">
                {getAchievementForBadge(selectedBadge.id)
                  ? `Earned on ${getAchievementForBadge(selectedBadge.id)?.earnedAt.toLocaleDateString()}`
                  : `Complete ${selectedBadge.criteria.threshold} ${selectedBadge.criteria.type.replace('_', ' ')} to earn this badge`}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelectedBadge(null)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default BadgesComponent;
