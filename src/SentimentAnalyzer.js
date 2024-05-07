import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, CircularProgress, Typography } from '@mui/material';

function SentimentAnalyzer() {
    const [url, setUrl] = useState('');  // Ensure the state for URL is declared
    const [sentiment, setSentiment] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const analyzeSentiment = async () => {
        if (!url) {
            setError('Please enter a YouTube URL');
            return;
        }
        setError('');
        setLoading(true);
        console.log('Sending URL:', url);  // Log the URL being sent
        try {
            const response = await axios.post('http://localhost:5000/analyze_sentiment', { url });
            console.log('Received response:', response.data);  // Log the response data
            setSentiment(response.data.sentiment);
        } catch (error) {
            console.error('Error analyzing sentiment:', error);
            setError('Error analyzing sentiment: ' + error.message);
            setSentiment(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        
        <Container component="main" maxWidth="md" sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            background: 'linear-gradient(to bottom right, #ade6e6, #ade6e6)', // Corrected gradient
        }}>
            <TextField
                label="YouTube Video URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                fullWidth
                variant="outlined"
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={analyzeSentiment} disabled={loading}>
                {loading ? <CircularProgress size={24} /> : "Analyze Sentiment"}
            </Button>
            {error && <Typography color="error">{error}</Typography>}
            {sentiment && (
                <Typography sx={{ mt: 2 }}>
                    Polarity: {sentiment.polarity.toFixed(2)} (Negative to Positive)
                    <br />
                    Subjectivity: {sentiment.subjectivity.toFixed(2)} (Objective to Subjective)
                </Typography>
            )}
        </Container>
    );
}

export default SentimentAnalyzer;
