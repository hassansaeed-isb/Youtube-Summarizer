import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Typography, Box, Tabs, Tab, Container, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Logo from './logo.svg'; // Import your SVG logo
import './MainComponent.css'; // Ensure your CSS is correctly linked

function MainComponent() {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="xl">
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Box display="flex" alignItems="center" width="100%" justifyContent="space-between">
            <img src={Logo} alt="YouTube Summarizer Logo" height={isMobile ? "30" : "50"} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
              Want deep insights of what you can't grab from one visual sight? Get it from our app!
            </Typography>
            <Button color="inherit" onClick={() => navigate('/login')}>Login</Button> {/* Temporary navigation */}
          </Box>
        </Toolbar>
      </AppBar>

      <Tabs
  value={value}
  onChange={handleChange}
  centered
  textColor="secondary"
  indicatorColor="secondary"
  sx={{
    '.MuiTabs-indicator': {
      backgroundColor: '#4f5d9c',
    },
    '.MuiTab-root': {
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'scale(1.1)',
        backgroundColor: '#eceff1',
      }
    }
  }}
>
  <Tab label="Get Summary" />
  <Tab label="Get Sentimental Analysis" />
  <Tab label="Explore More" />
</Tabs>


 
{value === 0 && (
  <TabContainer>
    <Typography variant="h5" gutterBottom>Get Summary</Typography>
    <Typography paragraph>
      Quickly summarize YouTube videos with our state-of-the-art AI technology. See key points and main ideas at a glance.
    </Typography>
    <Button variant="contained" color="primary" onClick={() => navigate('/Summarizer')} sx={{ marginTop: 2 }}>
      Video Summary
    </Button>
  </TabContainer>
)}

{value === 1 && (
  <TabContainer>
    <Typography variant="h5" gutterBottom>Get Sentimental Analysis</Typography>
    <Typography paragraph>
      Understand the underlying emotions of the dialogue within your favorite videos. Our tools provide a deep analysis of sentiments expressed in any video.
    </Typography>
    <Button variant="contained" color="primary" onClick={() => navigate('/SentimentAnalyzer')} sx={{ marginTop: 2 }}>
      Sentiment Analysis
    </Button>
  </TabContainer>
)}

{value === 2 && (
  <TabContainer>
    <Typography variant="h5" gutterBottom>Explore More</Typography>
    <Typography paragraph>
      Dive deeper into additional features like detailed analytics, content suggestions, and more. Enhance your YouTube viewing experience beyond just watching videos.
    </Typography>
    <Button variant="contained" color="primary" onClick={() => navigate('/about')} sx={{ marginTop: 2 }}>
      Explore More
    </Button>
  </TabContainer>
)}

    </Container>
  );
}

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

export default MainComponent;
