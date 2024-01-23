import React, { useState, useContext, useEffect } from 'react';
import { Button, Box, Typography } from '@mui/material';
import UserContext from '../../Context/UserContext.jsx';

const AiAssistantButton = ({ chemicals }) => { // Ensure that chemicals is destructured
  const { sendPromptToOpenAi } = useContext(UserContext);
  const [aiResponse, setAiResponse] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);

  // Function to extract labels
  const extractLabels = (chemicalsObj) => {
    let labels = [];
    for (const key in chemicalsObj) {
      if (chemicalsObj[key].l) labels.push(chemicalsObj[key].l.label);
      if (chemicalsObj[key].r) labels.push(chemicalsObj[key].r.label);
    }
    return labels.join(", ");
  };

  const chemicalLabels = extractLabels(chemicals);

  const handleAiClick = async () => {
    setAiResponse('');
    setTypingIndex(0);
    const prompt = chemicalLabels; 
    const response = await sendPromptToOpenAi(prompt);
    if (response) {
      console.log(response);
      setAiResponse(response);
    }
  };

  useEffect(() => {
    if (aiResponse && typingIndex < aiResponse.length) {
      const timeoutId = setTimeout(() => {
        setTypingIndex(typingIndex + 1);
      }, 30);
      return () => clearTimeout(timeoutId);
    }
  }, [aiResponse, typingIndex]);

  const handleClearResponse = () => {
    setAiResponse('');
    setTypingIndex(0);
  };

  return (
    <Box>
      <Button variant="contained" color="primary" onClick={handleAiClick}>
        AI Assistant
      </Button>
      {aiResponse && (
        <>
          <Typography variant="body1" style={{ marginTop: '10px' }} className="typing-effect">
            {aiResponse.substring(0, typingIndex)}
          </Typography>
          <Button variant="outlined" color="secondary" onClick={handleClearResponse} style={{ marginTop: '10px' }}>
            Clear Response
          </Button>
        </>
      )}
    </Box>
  );
};

export default AiAssistantButton;
