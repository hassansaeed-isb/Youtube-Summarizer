import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'; // Ensure the CSS path is correct

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: -50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      y: { type: "spring", stiffness: 120 }
    }
  }
};

const LandingPage = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/main');
  };

  return (
    <div className="landing-page">
      <motion.div
        className="container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 variants={itemVariants}>Welcome to YouTube Summarizer!</motion.h1>
        <motion.p variants={itemVariants}>
          Summarize your favorite YouTube videos quickly and effectively.
        </motion.p>
        <motion.button variants={itemVariants} onClick={handleGetStarted}>Get Started</motion.button>
      </motion.div>
    </div>
  );
};

export default LandingPage;
