import React from 'react';
import { Box, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import IconButton from "@mui/material/IconButton";


const Contact = ({data}) => {
    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h5" component="h3" sx={{ fontSize: '36px', textDecoration: 'underline' }}>
                Contact
            </Typography>
            <Typography sx={{ fontSize: '28px' }}>{data.contactNumber}</Typography>
            <Typography sx={{ fontSize: '28px' }}>{data.email}</Typography>
            <Typography sx={{ fontSize: '28px' }}>{data.address}</Typography>
            <Box>
                <IconButton href="https://facebook.com" target="_blank" sx={{paddingLeft:0}}>
                    <FacebookIcon sx={{ fontSize: '2rem' }}/>
                </IconButton>
                <IconButton href="https://twitter.com" target="_blank">
                    <TwitterIcon sx={{ fontSize: '2rem' }}/>
                </IconButton>
                <IconButton href="https://instagram.com" target="_blank">
                    <InstagramIcon sx={{ fontSize: '2rem' }}/>
                </IconButton>
            </Box>
        </Box>
    );
};

export default Contact;
