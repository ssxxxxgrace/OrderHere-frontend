import {Box, Button, Paper, Typography} from "@mui/material";
import * as React from "react";
import Link from "next/link";

export default function LoginFirst() {
    return (
        <div>
            <Box sx={{ width: '100%', overflow: 'hidden'}}>
                <img src="/image/ProfileHeader.svg" alt="Profile Header" alt="Profile Header" width="100%" />
            </Box>
            <Paper
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 500,
                    textAlign: 'center',
                    marginTop: 20,}}>
                <Typography
                    fontSize="45px"
                    gutterBottom
                    fontWeight="500"
                    sx={{
                        marginTop: 4,
                    }}>Please login first</Typography>
                <Link href="/" passHref>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            marginTop: 8,
                            marginBottom: 10,
                            backgroundColor: 'button.main',
                            '&:hover': {
                                backgroundColor: 'button.main',
                                opacity: 0.7,
                                transition: '0.3s',
                            },
                            borderRadius: '8px',
                            padding: '8px, 16px, 8px, 16px',
                            width: '300px',
                            height: '64px',
                            fontSize: '1.25rem',
                        }}
                    >
                        BACK TO HOME
                    </Button>
                </Link>
            </Paper>
        </div>
    );
}