import React, { useEffect, useRef } from 'react';
import videoSource from '../BTC_fire_insurance.mp4';

const VideoModal = ({ isOpen, onClose }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      videoRef.current.play().catch(() => {
        console.log('Autoplay blocked');
      });

      // Set a timeout to close the modal after 6 seconds
      const timeout = setTimeout(() => {
        onClose();
      }, 6500);

      // Clean up the timeout when the component unmounts or modal closes
      return () => clearTimeout(timeout);
    }
  }, [isOpen, onClose]);

  const handleClose = () => {
    onClose();
  };

  return (
    <div className={`video-modal ${isOpen ? 'open' : ''}`}>
      {isOpen && (
        <div className="video-modal-content">
          <video ref={videoRef} src={videoSource} loop controls />
          <button className="close-button" onClick={handleClose}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoModal;




