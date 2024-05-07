import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import MainComponent from './MainComponent';
import Summarizer from './Summarizer';
import SentimentAnalyzer from './SentimentAnalyzer';
import AboutProject from './AboutProject';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/main" element={<MainComponent />} />
        <Route path="/Summarizer" element={<Summarizer />} />
        <Route path="/SentimentAnalyzer" element={<SentimentAnalyzer />} />
        <Route path="/about" element={<AboutProject />} />
      </Routes>
    </div>
  );
}

export default App;
  