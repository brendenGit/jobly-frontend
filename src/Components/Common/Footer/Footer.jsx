import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const footerStyles = {
    appBar: {
        marginTop: 'auto',
    },
};

function Footer() {
    return (
        <AppBar position="static" sx={footerStyles.appBar}>
            <Container maxWidth="xl">
                <Toolbar sx={{ justifyContent: 'center' }}>
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            mr: 10
                        }}
                    >
                        Jobly 2024
                    </Typography>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="https://github.com/brendenGit/jobly-frontend"
                        target="_blank"
                        sx={{
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Github Repo
                    </Typography>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        target="_blank"
                        href="https://github.com/brendenGit"
                        sx={{
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            ml: 10,
                        }}
                    >
                        @BrendenGit
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Footer;
