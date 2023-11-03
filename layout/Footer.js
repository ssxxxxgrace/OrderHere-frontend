import React from 'react';
import { Box, Container, Typography, Grid, Link, IconButton } from '@mui/material';
import NextClientOnly from '../components/NextClientOnly';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import styles from './Footer.module.scss';

const PAGES = ["Home", "About", "Menu", "Pricing", "Blog", "Contact", "Delivery"];
const UTILITY_PAGES = ["Start Here", "Styleguide", "Password Protected", "404 Not Found", "Licenses", "Changelog", "View More"];

const RenderPages = ({ title, pages }) => (
  <Grid item xs={12} md={3}>
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    <Box>
      {pages.map((text, index) => (
        <Typography key={index}>
          <Link href="#" className={styles.linkStyle}>{text}</Link>
        </Typography>
      ))}
    </Box>
  </Grid>
);

const Footer = () => {
  return (
    <NextClientOnly>
      <Container maxWidth="lg">
        <Box sx={{ mt: 8, py: 5, backgroundColor: "#333", color: "#fff", paddingLeft: ['12px', '72px'], paddingRight: ['12px', '72px'], paddingTop: '100px', paddingBottom: '80px' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Box display="flex" alignItems="center" mb={2}>
                <img src="/image/Logo.svg" alt="Logo img" className={styles.logoImg} />
                <Typography variant="h5" gutterBottom className={styles.title}>
                  Order Here
                </Typography>
              </Box>
              <Typography className={styles.linkStyle}>
                In the new era of technology we look a in the future with certainty and pride to for our company and.
              </Typography>
              <Box mt={2}>
                <IconButton className={styles.redCircleBackground} color="inherit"><TwitterIcon /></IconButton>
                <IconButton className={styles.redCircleBackground} color="inherit"><FacebookIcon /></IconButton>
                <IconButton className={styles.redCircleBackground} color="inherit"><InstagramIcon /></IconButton>
                <IconButton className={styles.redCircleBackground} color="inherit"><PinterestIcon /></IconButton>
              </Box>
            </Grid>

            <RenderPages title="Pages" pages={PAGES} />
            <RenderPages title="Utility Pages" pages={UTILITY_PAGES} />

            <Grid item xs={12} md={3}>
              <Typography variant="h6" gutterBottom>
                Follow Us On Instagram
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <img src="/image/instagram1.png" alt="Instagram Image 1" className={styles.instagramImage} />
                </Grid>
                <Grid item xs={6}>
                  <img src="/image/instagram2.png" alt="Instagram Image 2" className={styles.instagramImage} />
                </Grid>
                <Grid item xs={6}>
                  <img src="/image/instagram3.png" alt="Instagram Image 3" className={styles.instagramImage} />
                </Grid>
                <Grid item xs={6}>
                  <img src="/image/instagram4.png" alt="Instagram Image 4" className={styles.instagramImage} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box mt={5} textAlign="center">
            <Typography variant="body2" className={styles.copyright}>Copyright © 2023 OrderHere Developer. All Rights Reserved</Typography>
          </Box>
        </Box>
      </Container>
    </NextClientOnly>
  );
};

export default Footer;
