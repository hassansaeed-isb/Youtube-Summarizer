import React from 'react';
import { Typography, Container, Box, Paper, Link } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  backgroundColor: theme.palette.background.paper, // Optional: adjust color to fit your theme
  boxShadow: '0px 2px 5px rgba(0,0,0,0.1)'  // Soft shadow for depth
}));

function AboutProject() {
  return (
    <Container maxWidth="md">
      <Box my={4} sx={{ overflowY: 'auto', maxHeight: '100vh' }}> {/* Scrollable Box */}
        <Typography variant="h3" gutterBottom component="h1">
          About the Project
        </Typography>

        <StyledPaper elevation={2}>
          <Typography variant="h5" gutterBottom component="h2">
            Overview
          </Typography>
          <Typography paragraph>
            This project, YouTube Summarizer and Sentiment Analysis, is designed to enhance user interaction with YouTube videos by providing quick summaries and emotional analyses. Our tools use AI and machine learning to deliver insights efficiently.
          </Typography>
        </StyledPaper>

        <StyledPaper elevation={2}>
          <Typography variant="h5" gutterBottom component="h2">
            Technology Stack
          </Typography>
          <Typography paragraph>
            Built using:
            <ul>
              <li>React.js for the frontend.</li>
              <li>Python with Flask for the backend.</li>
              <li>youtube_transcript_api & TextBlob for sentiment Analsis</li>
            </ul>
          </Typography>
        </StyledPaper>

        <StyledPaper elevation={2}>
          <Typography variant="h5" gutterBottom component="h2">
            Features
          </Typography>
          <Typography paragraph>
            Key features include:
            <ul>
              <li>Video Summarization</li>
              <li>Sentimental Analysis</li>
              <li>Customizable Preferences(TODO)</li>
            </ul>
          </Typography>
        </StyledPaper>

        <StyledPaper elevation={2}>
          <Typography variant="h5" gutterBottom component="h2">
            Future Enhancements
          </Typography>
          <Typography paragraph>
            Plans for the future include:
            <ul>
              <li>Language support expansion.</li>
              <li>Mobile app development.</li>
            </ul>
          </Typography>
        </StyledPaper>

        <StyledPaper elevation={2}>
          <Typography variant="h5" gutterBottom component="h2">
            Team
          </Typography>
          <Typography paragraph>
            Developed by @HASSAN SAEED - i21-1703
            <ul>
              <li>Web Programming Project (Spring'24)</li>
              </ul>
          </Typography>
          <Typography paragraph>
            Visit our <Link href="#" underline="hover">GitHub Repository</Link>.
          </Typography>
        </StyledPaper>
      </Box>
    </Container>
  );
}

export default AboutProject;
