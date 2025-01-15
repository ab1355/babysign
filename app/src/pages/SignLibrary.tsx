import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { SignLanguageSign } from '../types';

// Mock data - replace with Firebase data later
const mockSigns: SignLanguageSign[] = [
  {
    id: '1',
    name: 'Milk',
    category: 'Food & Drink',
    videoUrl: '/videos/milk.mp4',
    description: 'Open and close your fist, like milking a cow.',
    difficulty: 'beginner',
  },
  {
    id: '2',
    name: 'More',
    category: 'Common Words',
    videoUrl: '/videos/more.mp4',
    description: 'Tap your fingertips together.',
    difficulty: 'beginner',
  },
  {
    id: '3',
    name: 'All Done',
    category: 'Common Words',
    videoUrl: '/videos/all-done.mp4',
    description: 'Turn your palms up and out from your body.',
    difficulty: 'beginner',
  },
];

const categories = ['All', 'Food & Drink', 'Common Words', 'Animals', 'Family', 'Emotions'];

const SignLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(0);

  const handleCategoryChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedCategory(newValue);
  };

  const filteredSigns = mockSigns.filter(sign => {
    const matchesSearch = sign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sign.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 0 || sign.category === categories[selectedCategory];
    return matchesSearch && matchesCategory;
  });

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Sign Language Library
        </Typography>
        
        {/* Search Bar */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search signs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 4 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* Category Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs
            value={selectedCategory}
            onChange={handleCategoryChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            {categories.map((category, index) => (
              <Tab key={category} label={category} />
            ))}
          </Tabs>
        </Box>

        {/* Signs Grid */}
        <Grid container spacing={4}>
          {filteredSigns.map((sign) => (
            <Grid item xs={12} sm={6} md={4} key={sign.id}>
              <Card>
                <CardMedia
                  component="video"
                  height="200"
                  src={sign.videoUrl}
                  title={sign.name}
                  controls
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {sign.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {sign.category}
                  </Typography>
                  <Typography variant="body1">
                    {sign.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default SignLibrary;
