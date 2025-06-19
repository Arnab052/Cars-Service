import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, useMediaQuery } from '@mui/material';
import { LocationOn, AccessTime, Phone } from '@mui/icons-material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useTheme } from '@mui/material/styles';

const TopbarPart = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  if (!isLargeScreen) return null;

  return (
    <AppBar position="static" color="default" elevation={0} sx={{ backgroundColor: '#f8f9fa' }}>
      <Toolbar sx={{ justifyContent: 'space-between', px: 5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
            <LocationOn sx={{ color: 'primary.main', mr: 1 }} />
            <Typography variant="body2" color="textSecondary">
              123 Street, Kolkata, India , Arnab Barman
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccessTime sx={{ color: 'primary.main', mr: 1 }} />
            <Typography variant="body2" color="textSecondary">
              Mon - Fri : 09.00 AM - 09.00 PM
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
            <Phone sx={{ color: 'primary.main', mr: 1 }} />
            <Typography variant="body2" color="textSecondary">
              +012 345 6789
            </Typography>
          </Box>
          <Box>
            <IconButton size="small" sx={{ color: 'primary.main', mr: 1 }}>
              <FacebookIcon />
            </IconButton>
            <IconButton size="small" sx={{ color: 'primary.main', mr: 1 }}>
              <TwitterIcon />
            </IconButton>
            <IconButton size="small" sx={{ color: 'primary.main', mr: 1 }}>
              <LinkedInIcon />
            </IconButton>
            <IconButton size="small" sx={{ color: 'primary.main' }}>
              <InstagramIcon />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopbarPart;
