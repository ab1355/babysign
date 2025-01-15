import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Avatar,
  Chip,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  ThumbUp as ThumbUpIcon,
  Comment as CommentIcon,
  Share as ShareIcon,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { formatDistanceToNow } from 'date-fns';

interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  images?: string[];
  likes: string[];
  comments: Comment[];
  tags: string[];
  createdAt: Date;
}

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: Date;
}

const ForumPost: React.FC<{
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string, comment: string) => void;
  onDelete?: (postId: string) => void;
}> = ({ post, onLike, onComment, onDelete }) => {
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleLike = () => {
    onLike(post.id);
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onComment(post.id, newComment);
      setNewComment('');
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'Baby Sign Language Forum Post',
        text: post.content,
        url: window.location.href,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar src={post.userAvatar} sx={{ mr: 2 }} />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">{post.userName}</Typography>
            <Typography variant="caption" color="text.secondary">
              {formatDistanceToNow(post.createdAt, { addSuffix: true })}
            </Typography>
          </Box>
          {user?.id === post.userId && (
            <>
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={() => setShowDeleteDialog(true)}>
                  Delete
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>

        <Typography paragraph>{post.content}</Typography>

        {post.tags.length > 0 && (
          <Box sx={{ mb: 2 }}>
            {post.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{ mr: 1 }}
              />
            ))}
          </Box>
        )}

        {post.images && post.images.length > 0 && (
          <Box sx={{ mb: 2 }}>
            {post.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Post image ${index + 1}`}
                style={{
                  maxWidth: '100%',
                  maxHeight: 300,
                  objectFit: 'cover',
                  borderRadius: 8,
                  marginBottom: 8,
                }}
              />
            ))}
          </Box>
        )}

        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Button
            startIcon={<ThumbUpIcon />}
            onClick={handleLike}
            color={post.likes.includes(user?.id || '') ? 'primary' : 'inherit'}
          >
            {post.likes.length} Likes
          </Button>
          <Button
            startIcon={<CommentIcon />}
            onClick={() => setShowComments(!showComments)}
          >
            {post.comments.length} Comments
          </Button>
          <Button startIcon={<ShareIcon />} onClick={handleShare}>
            Share
          </Button>
        </Box>

        {showComments && (
          <Box sx={{ ml: 2 }}>
            {post.comments.map((comment) => (
              <Box key={comment.id} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Avatar
                    src={comment.userAvatar}
                    sx={{ width: 24, height: 24, mr: 1 }}
                  />
                  <Typography variant="subtitle2">{comment.userName}</Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ ml: 1 }}
                  >
                    {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                  </Typography>
                </Box>
                <Typography variant="body2">{comment.content}</Typography>
              </Box>
            ))}

            <Box component="form" onSubmit={handleComment} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                sx={{ mb: 1 }}
              />
              <Button
                type="submit"
                variant="contained"
                size="small"
                disabled={!newComment.trim()}
              >
                Post Comment
              </Button>
            </Box>
          </Box>
        )}
      </CardContent>

      <Dialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
      >
        <DialogTitle>Delete Post</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this post? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
          <Button
            onClick={() => {
              onDelete?.(post.id);
              setShowDeleteDialog(false);
            }}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

const Forum: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPostContent, setNewPostContent] = useState('');
  const [showNewPostDialog, setShowNewPostDialog] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // Load posts from Firebase
    // This will be implemented in the forum service
    setLoading(false);
  }, []);

  const handleCreatePost = () => {
    // Implement post creation
    setNewPostContent('');
    setShowNewPostDialog(false);
  };

  const handleLike = (postId: string) => {
    // Implement like functionality
  };

  const handleComment = (postId: string, comment: string) => {
    // Implement comment functionality
  };

  const handleDelete = (postId: string) => {
    // Implement delete functionality
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
          <Typography variant="h4">Community Forum</Typography>
          <Button
            variant="contained"
            onClick={() => setShowNewPostDialog(true)}
          >
            Create Post
          </Button>
        </Box>

        {posts.map((post) => (
          <ForumPost
            key={post.id}
            post={post}
            onLike={handleLike}
            onComment={handleComment}
            onDelete={handleDelete}
          />
        ))}

        <Dialog
          open={showNewPostDialog}
          onClose={() => setShowNewPostDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Create New Post</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="What's on your mind?"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              sx={{ mt: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowNewPostDialog(false)}>Cancel</Button>
            <Button
              onClick={handleCreatePost}
              variant="contained"
              disabled={!newPostContent.trim()}
            >
              Post
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default Forum;
