import React, { useState, useContext, useEffect } from 'react';
import { Button, Box, Typography, CircularProgress } from '@mui/material';
import UserContext from '../../Context/UserContext.jsx';

const AiAssistantButton = ({ chemicals }) => {
  const { sendPromptToOpenAi } = useContext(UserContext);
  const [aiResponse, setAiResponse] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const [isFirstLineDisplayed, setIsFirstLineDisplayed] = useState(false);
  const [firstLineIndex, setFirstLineIndex] = useState(0);
  const [secondLineIndex, setSecondLineIndex] = useState(0);
  const [showSpinner, setShowSpinner] = useState(false);

  const firstLineTypingSpeed = 30; 
  const secondLineTypingSpeed = 35; 

  const firstMessage = "Communicating with OpenAI...";
  const extractLabels = (chemicalsObj) => {
    let labels = [];
    for (const key in chemicalsObj) {
      if (chemicalsObj[key].l) labels.push(chemicalsObj[key].l.label);
      if (chemicalsObj[key].r) labels.push(chemicalsObj[key].r.label);
    }
    return labels.join(", ");
  };

  const chemicalLabels = extractLabels(chemicals);
  const secondMessage = `Our chief inspector is reviewing your chemicals: ${chemicalLabels}`;

  const handleAiClick = async () => {
    setAiResponse('');
    setTypingIndex(0);
    setIsFirstLineDisplayed(true);
    setFirstLineIndex(0);
    setSecondLineIndex(0);
    setShowSpinner(false);


    for (let i = 0; i <= firstMessage.length; i++) {
      setTimeout(() => {
        setFirstLineIndex(i);
      }, i * firstLineTypingSpeed);
    }

    let delayForSecondMessage = firstMessage.length * firstLineTypingSpeed +1000;
    setTimeout(() => {
      setIsWaitingForResponse(true);
      for (let i = 0; i <= secondMessage.length; i++) {
        setTimeout(() => {
          setSecondLineIndex(i);
        }, i * secondLineTypingSpeed);
      }

      setTimeout(() => {
        setShowSpinner(true);
      }, 4000);

    }, delayForSecondMessage);


    try {
      const response = await sendPromptToOpenAi(chemicalLabels);
      if (response) {
        setAiResponse(response);
      }
    } catch (error) {
      console.error('Error communicating with AI:', error);
    }
    setIsWaitingForResponse(false);
    setIsFirstLineDisplayed(false);
  };

  useEffect(() => {
    if (aiResponse && typingIndex < aiResponse.length) {
      const timeoutId = setTimeout(() => {
        setTypingIndex(typingIndex + 1);
      }, 20);
      return () => clearTimeout(timeoutId);
    }
  }, [aiResponse, typingIndex]);

  const handleClearResponse = () => {
    setAiResponse('');
    setTypingIndex(0);
    setIsFirstLineDisplayed(false);
    setIsWaitingForResponse(false);
    setShowSpinner(false);
    setFirstLineIndex(0);
    setSecondLineIndex(0);
  };

  return (
    <Box>
      <Button variant="contained" color="primary" onClick={handleAiClick}>
        AI Assistant
      </Button>
      {isFirstLineDisplayed && (
        <Typography variant="body2" style={{ marginTop: '10px' }}>
          {firstMessage.substring(0, firstLineIndex)}
        </Typography>
      )}
      {isWaitingForResponse && (
        <>
          <Typography variant="body2" style={{ marginTop: '10px' }}>
            {secondMessage.substring(0, secondLineIndex)}
          </Typography>
          {showSpinner && (
            <CircularProgress size={24} style={{ marginTop: '10px' }} />
          )}
        </>
      )}
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
