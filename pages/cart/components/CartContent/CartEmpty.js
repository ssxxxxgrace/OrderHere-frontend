import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from "next/link";

export default function EmptyCart() {
    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '80vh',
                    textAlign: 'center',
                    marginTop: 20,
                }}
            >
                <Box
                    sx={{
                        width: 501,
                        height: 479,
                        borderRadius: '50%',
                        backgroundColor: '#ffefc3',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 2,
                    }}
                >
                    <img src="/icons/cart/EmptyCartIcon.svg" alt="EmptyCart"/>
                </Box>
                <Typography fontSize='60px' fontFamily={'DM Sans'} gutterBottom>
                    Your Cart is Empty
                </Typography>
                <Typography fontSize='30px' fontFamily={'DM Sans'} color="#595959">
                    Looks like you haven’t added anything to your cart yet
                </Typography>
                <Link href="/" passHref>
                    <Button variant="contained" color="primary"
                            sx={{
                                marginTop: 3,
                                backgroundColor: '#AD343E',
                                '&:hover': {
                                    backgroundColor: '#AD343F',
                                },
                                borderRadius: '8px',
                                padding: '8px, 16px, 8px, 16px',
                                width: '300px',
                                height: '64px',
                                fontSize: '1.25rem',
                            }}>
                        BACK TO MENU
                    </Button>
                </Link>
            </Box>
        </Container>
    );
}
