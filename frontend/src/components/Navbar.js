import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  useTheme,
  Select,
  FormControl,
  CircularProgress
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LogoutIcon from '@mui/icons-material/Logout';
import { useCurrency, CURRENCIES } from './CurrencyContext';

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  
  // Use currency context
  const { 
    selectedCurrency, 
    setSelectedCurrency, 
    loading: currencyLoading 
  } = useCurrency();

  const pages = [
    { name: 'Home', path: '/', icon: <HomeIcon /> },
    { name: 'Crypto', path: '/crypto', icon: <CurrencyBitcoinIcon /> },
    { name: 'Stocks', path: '/stock', icon: <ShowChartIcon /> },
    { name: 'Tax', path: '/tax', icon: <ReceiptIcon /> },
    { name: 'News', path: '/news', icon: <NewspaperIcon /> },
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleCloseNavMenu();
  };

  const handleLogout = () => {
    navigate('/logout');
  };

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.main }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo for larger screens */}
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            PORTAFOLIO
          </Typography>

          {/* Mobile menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={() => handleNavigate(page.path)}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {page.icon}
                    <Typography textAlign="center">{page.name}</Typography>
                  </Box>
                </MenuItem>
              ))}
              
              {/* Currency selector in mobile menu */}
              <MenuItem>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FormControl size="small" sx={{ minWidth: 80 }}>
                    <Select
                      value={selectedCurrency}
                      onChange={handleCurrencyChange}
                      sx={{ 
                        color: 'inherit',
                        '& .MuiSelect-select': { py: 0.5, px: 1 }
                      }}
                      displayEmpty
                      variant="outlined"
                    >
                      {Object.keys(CURRENCIES).map((curr) => (
                        <MenuItem key={curr} value={curr}>
                          {curr}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {currencyLoading && <CircularProgress size={16} />}
                </Box>
              </MenuItem>
              
              <MenuItem onClick={handleLogout}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LogoutIcon />
                  <Typography textAlign="center">Logout</Typography>
                </Box>
              </MenuItem>
            </Menu>
          </Box>

          {/* Logo for mobile */}
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            PORTAFOLIO
          </Typography>

          {/* Desktop menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => handleNavigate(page.path)}
                sx={{ color: 'white', display: 'flex', alignItems: 'center', gap: 1 }}
              >
                {page.icon}
                {page.name}
              </Button>
            ))}
          </Box>

          {/* Currency selector for desktop */}
          <Box sx={{ 
            display: { xs: 'none', md: 'flex' }, 
            alignItems: 'center',
            mr: 2
          }}>
            <FormControl size="small">
              <Select
                value={selectedCurrency}
                onChange={handleCurrencyChange}
                sx={{ 
                  color: 'white',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                  '& .MuiSvgIcon-root': {
                    color: 'white',
                  }
                }}
                displayEmpty
                variant="outlined"
              >
                {Object.keys(CURRENCIES).map((curr) => (
                  <MenuItem key={curr} value={curr}>
                    {curr}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {currencyLoading && <CircularProgress size={16} sx={{ ml: 1, color: 'white' }} />}
          </Box>

          {/* Logout button  */}
          <Button
            onClick={handleLogout}
            sx={{
              color: 'white',
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: 1
            }}
          >
            <LogoutIcon />
            Logout
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;