import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip,
  Paper,
} from '@mui/material';
import {
  Mic as MicIcon,
  MicOff as MicOffIcon,
  VolumeUp as VolumeUpIcon,
  Check as CheckIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { VoiceRecognitionService } from '../../services/voiceRecognition';

interface SignPracticeProps {
  sign: {
    id: string;
    word: string;
    videoUrl: string;
    description: string;
    alternatives?: string[];
  };
  onSuccess?: () => void;
}

const SignPractice: React.FC<SignPracticeProps> = ({ sign, onSuccess }) => {
  const [isListening, setIsListening] = useState(false);
  const [result, setResult] = useState<string>('');
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error' | 'info' | null;
    message: string;
  }>({ type: null, message: '' });
  const [isPlaying, setIsPlaying] = useState(false);
  const voiceService = useRef<VoiceRecognitionService>();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    voiceService.current = new VoiceRecognitionService();
    return () => {
      if (voiceService.current) {
        voiceService.current.stop();
      }
    };
  }, []);

  const handleStartListening = () => {
    if (!voiceService.current) return;

    setIsListening(true);
    setResult('');
    setFeedback({ type: 'info', message: 'Listening...' });

    voiceService.current.start(
      (text) => {
        setResult(text);
        checkResult(text);
      },
      (error) => {
        setFeedback({
          type: 'error',
          message: `Error: ${error}. Please try again.`,
        });
        setIsListening(false);
      }
    );
  };

  const handleStopListening = () => {
    if (!voiceService.current) return;
    voiceService.current.stop();
    setIsListening(false);
  };

  const checkResult = (text: string) => {
    const correctWords = [sign.word.toLowerCase(), ...(sign.alternatives || []).map(alt => alt.toLowerCase())];
    const isCorrect = correctWords.some(word => text.includes(word));

    if (isCorrect) {
      setFeedback({
        type: 'success',
        message: 'Great job! You pronounced it correctly!',
      });
      onSuccess?.();
    } else {
      setFeedback({
        type: 'error',
        message: `Try again! You said "${text}" but we're looking for "${sign.word}"`,
      });
    }
    setIsListening(false);
  };

  const toggleVideo = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', my: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Practice: {sign.word}
        </Typography>

        <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
          <Box sx={{ position: 'relative', mb: 2 }}>
            <video
              ref={videoRef}
              src={sign.videoUrl}
              style={{ width: '100%', borderRadius: '8px' }}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
            <IconButton
              sx={{
                position: 'absolute',
                bottom: 8,
                right: 8,
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                },
              }}
              onClick={toggleVideo}
            >
              <VolumeUpIcon sx={{ color: 'white' }} />
            </IconButton>
          </Box>

          <Typography variant="body1" gutterBottom>
            {sign.description}
          </Typography>
        </Paper>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Tooltip title={isListening ? 'Stop Recording' : 'Start Recording'}>
            <IconButton
              color={isListening ? 'error' : 'primary'}
              onClick={isListening ? handleStopListening : handleStartListening}
              sx={{ mr: 2 }}
            >
              {isListening ? <MicOffIcon /> : <MicIcon />}
            </IconButton>
          </Tooltip>
          <Typography
            variant="body1"
            color={isListening ? 'error' : 'text.secondary'}
          >
            {isListening ? 'Recording...' : 'Click the microphone to start'}
          </Typography>
        </Box>

        {result && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              You said:
            </Typography>
            <Paper
              sx={{
                p: 2,
                backgroundColor: 'grey.100',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Typography>{result}</Typography>
              {feedback.type === 'success' ? (
                <CheckIcon color="success" />
              ) : (
                <CloseIcon color="error" />
              )}
            </Paper>
          </Box>
        )}

        {feedback.type && (
          <Alert
            severity={feedback.type}
            sx={{ mt: 2 }}
            action={
              feedback.type === 'info' && (
                <CircularProgress size={20} sx={{ ml: 1 }} />
              )
            }
          >
            {feedback.message}
          </Alert>
        )}

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="outlined"
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.currentTime = 0;
                videoRef.current.play();
              }
            }}
          >
            Watch Again
          </Button>
          <Button
            variant="contained"
            onClick={handleStartListening}
            disabled={isListening}
          >
            Try Speaking
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SignPractice;
