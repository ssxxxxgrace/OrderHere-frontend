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

  // 设置自动轮播
  useEffect(() => {
    const intervalId = setInterval(nextImage, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const images = [
    '/image/Dish1.png',
    '/image/Dish2.png',
    '/image/instagram1.png',
    '/image/instagram2.png',
    '/image/instagram3.png',
    '/image/instagram4.png',
  ];

  const titleStyle = {
    color: '#fff', // 根据您的设计调整文字颜色
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
    backgroundColor: 'rgba(0,0,0,0.3)', // 调整为您需要的遮罩颜色和透明度
  };

  const imageBannerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '300px',
    width: '1440px',
    backgroundImage: `url(${images[activeIndex]})`, // 设置背景图片为当前活动的图片
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
          color: activeIndex === index ? 'white' : 'rgba(255, 255, 255, 0.5)', // 当前页为白色，其他为半透明
        }}
      >
        <FiberManualRecordIcon fontSize="small" />
      </IconButton>
    ));
  };

  // ...其他样式保持不变

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
          bottom: 10, // 或者您需要的值
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
