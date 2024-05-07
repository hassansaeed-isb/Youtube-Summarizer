import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, CircularProgress, Typography, Link, Box } from '@mui/material';

function Summarizer() {
    const [videoId, setVideoId] = useState('');
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(100); // Adjust the number of words per page as needed

    const extractVideoID = (url) => {
        const match = url.match(/(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        return match ? match[1] : url;
    };

    const getSummary = async () => {
        if (!videoId) {
            setError('Please enter a valid YouTube video ID or URL');
            return;
        }
        setError('');
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/summarize', { videoId: extractVideoID(videoId) });
            setSummary(response.data.summary);
        } catch (error) {
            setError('Error fetching summary: ' + error.message);
            setSummary('');
        } finally {
            setLoading(false);
        }
    };

    const paginateSummary = () => {
        const words = summary.split(' ');
        const totalPages = Math.ceil(words.length / itemsPerPage);
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return { text: words.slice(start, end).join(' '), totalPages };
    };

    const { text, totalPages } = summary ? paginateSummary() : { text: '', totalPages: 0 };

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
                label="YouTube Video ID or URL"
                value={videoId}
                onChange={(e) => setVideoId(e.target.value)}
                fullWidth
                variant="outlined"
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={getSummary} disabled={loading} sx={{ mb: 2 }}>
                {loading ? <CircularProgress size={24} /> : "Summarize"}
            </Button>
            {error && <Typography color="error">{error}</Typography>}
            {summary && (
                <>
                    <Typography variant="subtitle1" gutterBottom component="div" sx={{ p: 2, border: '1px solid #ddd', borderRadius: '4px', bgcolor: 'background.paper' }}>
                        {text}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 2 }}>
                        <Button
                            variant="contained"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            Previous
                        </Button>
                        <Typography>Page {currentPage} of {totalPages}</Typography>
                        <Button
                            variant="contained"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            Next
                        </Button>
                    </Box>
                </>
            )}
            <Link href="#" onClick={() => window.history.back()} sx={{ mt: 2 }}>Go Back</Link>
        </Container>
    );
}

export default Summarizer;
