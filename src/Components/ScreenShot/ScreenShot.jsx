import React, { useContext, useState } from "react";
import { Box, IconButton, Typography, Modal, CircularProgress } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import html2canvas from 'html2canvas';
import UserContext from "../../Context/UserContext.jsx";
import styles from '../ScreenShot/ScreenshotButton.module.css'; // Import CSS module

const Spinner = () => (
  <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
    <CircularProgress />
  </Box>
);

const ScreenshotButton = ({ shelfRef }) => {
  const { sendScreenshotToBackend } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleScreenshot = () => {
    if (shelfRef && shelfRef.current) {
      setLoading(true);
      html2canvas(shelfRef.current).then(canvas => {
        canvas.toBlob(blob => {
          const screenshotFile = new File([blob], "screenshot.png", { type: "image/png" });
          sendScreenshotToBackend(screenshotFile).then(() => {
            setModalOpen(true); // Open modal on successful email send
            setTimeout(() => setModalOpen(false), 3000); // Auto-close modal after 3 seconds
          });
        }, 'image/png');
      }).catch(error => {
        console.error("Screenshot failed:", error);
      }).finally(() => {
        setLoading(false);
      });
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  if (loading) {
    return <Spinner />;
  }


  return (
    <Box display="flex" justifyContent="center" >
    <Box bgcolor="#607ff0" display="flex" justifyContent="center" alignItems="center"  borderRadius="50%" padding={1}  onClick={handleScreenshot} style={{ cursor: 'pointer' }}>
      <IconButton color="primary" aria-label="take screenshot" style={{ backgroundColor: '#607ff0', color: 'white', borderRadius:"50%"}}>
        <PhotoCameraIcon />
      </IconButton>
      <Typography variant="body1" style={{ color: 'white'}}></Typography>
    </Box>
  
    <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
      <Box className={styles.modalContent}>
        <Typography variant="h6">Snapshot Sent to Your Email</Typography>
      </Box>
    </Modal>
  </Box>
  
  );
};

export default ScreenshotButton;