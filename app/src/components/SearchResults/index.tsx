import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Tabs,
  Tab,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import {
  Search as SearchIcon,
  SignLanguage as SignLanguageIcon,
  School as SchoolIcon,
  Forum as ForumIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { searchAll, SearchResult } from '../../services/search';
import { useDebounce } from '../../hooks/useDebounce';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
  <div role="tabpanel" hidden={value !== index}>
    {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
  </div>
);

const SearchResults: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const debouncedSearch = useDebounce(searchQuery, 300);

  useEffect(() => {
    const performSearch = async () => {
      if (debouncedSearch.trim().length < 2) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const searchResults = await searchAll(debouncedSearch);
        setResults(searchResults);
      } catch (error) {
        console.error('Error searching:', error);
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [debouncedSearch]);

  const filteredResults = (type: 'sign' | 'lesson' | 'post') =>
    results.filter(result => result.type === type);

  const handleResultClick = (result: SearchResult) => {
    navigate(result.url);
  };

  const renderResultItem = (result: SearchResult) => (
    <ListItem
      key={`${result.type}-${result.id}`}
      sx={{
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'action.hover',
        },
      }}
      onClick={() => handleResultClick(result)}
    >
      <ListItemAvatar>
        {result.thumbnail ? (
          <Avatar src={result.thumbnail} />
        ) : (
          <Avatar>
            {result.type === 'sign' && <SignLanguageIcon />}
            {result.type === 'lesson' && <SchoolIcon />}
            {result.type === 'post' && <ForumIcon />}
          </Avatar>
        )}
      </ListItemAvatar>
      <ListItemText
        primary={result.title}
        secondary={
          <Box>
            <Typography variant="body2" color="text.secondary" noWrap>
              {result.description}
            </Typography>
            {result.tags && result.tags.length > 0 && (
              <Box sx={{ mt: 1 }}>
                {result.tags.map(tag => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    sx={{ mr: 0.5, mb: 0.5 }}
                  />
                ))}
              </Box>
            )}
          </Box>
        }
      />
    </ListItem>
  );

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <TextField
          fullWidth
          placeholder="Search signs, lessons, or community posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: searchQuery && (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={() => setSearchQuery('')}
                  size="small"
                >
                  <CloseIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 4 }}
        />

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : results.length > 0 ? (
          <Box>
            <Tabs
              value={selectedTab}
              onChange={(_, newValue) => setSelectedTab(newValue)}
              centered
            >
              <Tab
                label={`All (${results.length})`}
                icon={<SearchIcon />}
                iconPosition="start"
              />
              <Tab
                label={`Signs (${filteredResults('sign').length})`}
                icon={<SignLanguageIcon />}
                iconPosition="start"
              />
              <Tab
                label={`Lessons (${filteredResults('lesson').length})`}
                icon={<SchoolIcon />}
                iconPosition="start"
              />
              <Tab
                label={`Posts (${filteredResults('post').length})`}
                icon={<ForumIcon />}
                iconPosition="start"
              />
            </Tabs>

            <TabPanel value={selectedTab} index={0}>
              <List>
                {results.map(result => renderResultItem(result))}
              </List>
            </TabPanel>

            <TabPanel value={selectedTab} index={1}>
              <List>
                {filteredResults('sign').map(result => renderResultItem(result))}
              </List>
            </TabPanel>

            <TabPanel value={selectedTab} index={2}>
              <List>
                {filteredResults('lesson').map(result => renderResultItem(result))}
              </List>
            </TabPanel>

            <TabPanel value={selectedTab} index={3}>
              <List>
                {filteredResults('post').map(result => renderResultItem(result))}
              </List>
            </TabPanel>
          </Box>
        ) : searchQuery.trim().length >= 2 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary">
              No results found for "{searchQuery}"
            </Typography>
            <Typography color="text.secondary">
              Try different keywords or check your spelling
            </Typography>
          </Box>
        ) : null}
      </Box>
    </Container>
  );
};

export default SearchResults;
