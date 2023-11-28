import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextImage = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  };

  useEffect(() => {
    const intervalId = setInterval(nextImage, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const images = [
    '/image/Dish1.png',
    '/image/carouselImage1.webp',
    '/image/carouselImage2.webp',
    '/image/carouselImage3.webp',
    '/image/carouselImage4.webp',
    '/image/carouselImage5.webp',
  ];

  const titleStyle = {
    color: '#fff',
    textAlign: 'center',
    zIndex: 2,
  };

  const seeMoreButtonStyle = {
    zIndex: 2,
    marginTop: 6,
    backgroundColor: 'red',
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  };

  const imageBannerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '300px',
    width: '100%',
    backgroundImage: `url(${images[activeIndex]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
  };
  const renderPagination = () => {
    return images.map((_, index) => (
      <IconButton
        key={index}
        size="small"
        onClick={() => setActiveIndex(index)}
        sx={{
          color: activeIndex === index ? 'white' : 'rgba(255, 255, 255, 0.5)',
          color: activeIndex === index ? 'white' : 'rgba(255, 255, 255, 0.5)',
        }}
      >
        <FiberManualRecordIcon fontSize="small" />
      </IconButton>
    ));
  };

  return (
    <Box sx={imageBannerStyle}>
      <Box sx={overlayStyle} />
      <Button sx={{ zIndex: 2, color: 'white' }} onClick={prevImage}>
        <ArrowBackIosIcon />
      </Button>
      <Box sx={titleStyle}>
        <Typography variant="h3" component="h2">
          Our Special List
        </Typography>
        <Button variant="contained" color="secondary" sx={seeMoreButtonStyle}>
          See More
        </Button>
      </Box>
      <Button sx={{ zIndex: 2, color: 'white' }} onClick={nextImage}>
        <ArrowForwardIosIcon />
      </Button>
      <Box
        sx={{
          position: 'absolute',
          bottom: 10,
          bottom: 10,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
        }}
      >
        {renderPagination()}
      </Box>
    </Box>
  );
};

export default Carousel;
