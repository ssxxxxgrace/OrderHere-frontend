import React from 'react';
import { Box, Container, Typography, Grid, Link, IconButton } from '@mui/material';
import NextClientOnly from '../components/NextClientOnly';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';

export const styleNew = {
  title: {
    color: '#FFF',
    fontFamily: 'Playfair Display',
    fontSize: '35px',
    fontStyle: 'italic',
    fontWeight: 600,
    lineHeight: '29.333px',
    letterSpacing: '-0.4px',
  },
  logoImg: {
    width: '83.785px',
    height: '55px',
    flexShrink: 0,
  },
  linkStyle: {
    color: '#DBDFD0',
    fontFamily: 'DM Sans',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '24px',
  },
  redCircleBackground: {
    backgroundColor: '#AD343E',
    borderRadius: '50%',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '35px',
    height: '35px',
    marginRight: '8px',
    '&:last-child': {
      marginRight: 0,
    },
  },
  copyright: {
    color: '#ADB29E',
    fontFamily: 'DM Sans',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '24px',
  }
};

const PAGES = ["Home", "About", "Menu", "Pricing", "Blog", "Contact", "Delivery"];
const UTILITY_PAGES = ["Start Here", "Styleguide", "Password Protected", "404 Not Found", "Licenses", "Changelog", "View More"];

const RenderPages = ({ title, pages }) => (
  <Grid item xs={12} md={3}>
    <Typography variant="h6" gutterBottom sx={{ marginBottom: '40px' }}>
      {title}
    </Typography>
    <Box>
      {pages.map((text, index) => (
        <Typography key={index} sx={{ marginBottom: index !== pages.length - 1 ? '20px' : '0' }}>
          <Link href="#" sx={styleNew.linkStyle}>{text}</Link>
        </Typography>
      ))}
    </Box>
  </Grid>
);

const Footer = () => {
  return (
    <NextClientOnly>
      <Container maxWidth="false" sx={{
        paddingLeft: { xs: '0px', sm: '0px' },
        paddingRight: { xs: '0px', sm: '0px' },
        paddingTop: { xs: '0px', sm: '0px' },
        paddingBottom: { xs: '0px', sm: '0px' },
      }}>
        <Box sx={{ mt: 8, py: 5, backgroundColor: "#333", width: '100.6vw', minHeight: '100%', color: "#fff", paddingLeft: ['12px', '72px'], paddingRight: ['12px', '72px'], paddingTop: '100px', paddingBottom: '60px' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Box display="flex" alignItems="center" mb={2} sx={{ marginBottom: '20px' }}>
                <img src="/image/Logo.svg" alt="Logo img" sx={styleNew.logoImg} />
                <Typography variant="h5" gutterBottom sx={styleNew.title}>
                  Order Here
                </Typography>
              </Box>
              <Typography sx={styleNew.linkStyle}>
                In the new era of technology we look a in the future with certainty and pride to for our company and.
              </Typography>
              <Box mt={2} sx={{ marginTop: '20px' }}>
                <IconButton sx={styleNew.redCircleBackground} color="inherit"><TwitterIcon /></IconButton>
                <IconButton sx={styleNew.redCircleBackground} color="inherit"><FacebookIcon /></IconButton>
                <IconButton sx={styleNew.redCircleBackground} color="inherit"><InstagramIcon /></IconButton>
                <IconButton sx={styleNew.redCircleBackground} color="inherit"><PinterestIcon /></IconButton>
              </Box>
            </Grid>

            <RenderPages title="Pages" pages={PAGES} />
            <RenderPages title="Utility Pages" pages={UTILITY_PAGES} />

            <Grid item xs={12} md={3}>
              <Typography variant="h6" gutterBottom sx={{ marginBottom: '40px' }}>
                Follow Us On Instagram
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <img src="/image/instagram1.png"
                    alt="Instagram Image 1"
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                      display: 'block',
                      borderRadius: '12px'
                    }} />
                </Grid>
                <Grid item xs={6}>
                  <img src="/image/instagram2.png"
                    alt="Instagram Image 2"
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                      display: 'block',
                      borderRadius: '12px'
                    }} />
                </Grid>
                <Grid item xs={6}>
                  <img src="/image/instagram3.png"
                    alt="Instagram Image 3"
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                      display: 'block',
                      borderRadius: '12px'
                    }} />
                </Grid>
                <Grid item xs={6}>
                  <img src="/image/instagram4.png"
                    alt="Instagram Image 4"
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                      display: 'block',
                      borderRadius: '12px'
                    }} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box mt={5} textAlign="center">
            <Typography variant="body2" sx={styleNew.copyright}>Copyright © 2023 OrderHere Developer. All Rights Reserved</Typography>
          </Box>
        </Box>
      </Container>
    </NextClientOnly>
  );
};

export default Footer;
