import React from 'react';
import { Box, Typography} from '@mui/material';

const FailurePage = () => {
    return (
        <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh' ,
                backgroundColor: '#FEF6E9',
                minHeight: '100vh',
                minWidth: '100vw',
                padding: '20px',
                margin: 0,
            }}>
            <Box sx={{
                display: 'flex',
                width: '160px',
                height: '160px',
                justifyContent: 'center',
                alignItems: 'center',
                flexShrink: 0,
                '& img': {
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                }
            }}>
                <img src="/icons/payment/failedImg.png" alt="Success"/>
            </Box>
            <Typography gutterBottom sx={{
                color: '#474747',
                fontFeatureSettings: "'clig' off, 'liga' off",
                textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                fontFamily: 'DM Sans',
                fontSize: '60px',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: '24px',
                my:8
            }}>
                Payment Failed
            </Typography>
            <Typography sx={{
                color: '#595959',
                textAlign: 'center',
                fontFamily: 'Estedad-VF',
                fontSize: '45px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: '42px',
                my: 6,
            }}>
                Please check your payment information.
            </Typography>
        </Box>
    );
};

export default FailurePage;