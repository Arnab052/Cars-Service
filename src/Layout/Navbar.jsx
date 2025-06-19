import React, { useEffect, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import CalendarToday from "@mui/icons-material/CalendarToday";
import Lock from "@mui/icons-material/Lock";
import ExitToApp from "@mui/icons-material/ExitToApp";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/AuthSlice";
import { ImageUrl } from "../Api/AxiosInstance/imageUrl";
import TopbarPart from "../components/Topbar"


const Navbar = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    Swal.fire({
      icon: "success",
      text: "Logged Out Successfully",
    });
    handleMenuClose();
    setDrawerOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    { text: "Home", path: "/" },
    { text: "About", path: "/about" },
    { text: "Services", path: "/services" },
    { text: "Bookings", path: "/bookings" },
    { text: "Contact", path: "/contact" },
  ];
  



  return (
    <>
    <TopbarPart/>
      <AppBar position="sticky" color="default" sx={{ boxShadow: 1 ,backgroundColor:'white'}}>
        <Toolbar>
          {/* Logo */}
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: "none",
              color: "primary.main",
              display: "flex",
              alignItems: "center",
              fontSize:'28px',
              fontWeight:800
            }}
          >
            <DirectionsCarIcon sx={{ mr:.5,fontSize:'30px'}} />
            Cars<span style={{color:'red'}}>Serv</span>
          </Typography>

          {/* Desktop Links */}
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
           
              <Button
                component={RouterLink}
                to='/'
                 sx={{  color: isActive('/') ? 'red' : 'black',
                   fontWeight: isActive('/') ? 'bold' : 500}}
              >
                 home
              </Button>
              
              <Button
                component={RouterLink}
                to='/about'
                sx={{  color: isActive('/about') ? 'red' : 'black',
                   fontWeight: isActive('/about') ? 'bold' : 500,}}
                 
              >
                 About
              </Button>

               <Button
                component={RouterLink}
                to='/services'
                sx={{  color: isActive('/services') ? 'red' : 'black',
                   fontWeight: isActive('/services') ? 'bold' : 500,}}
              >
                 Services
              </Button>
            {isLoggedIn && user ? 
            (
               <Button
                component={RouterLink}
                to='/bookings'
                  sx={{  color: isActive('/bookings') ? 'red' : 'black',
                   fontWeight: isActive('/bookings') ? 'bold' : 500,}}
              >
                 Bookings
              </Button>
            ):(
               <Button
                component={RouterLink}
                to='/login'
                sx={{  color: isActive('/login') ? 'red' : 'black',
                   fontWeight: isActive('/login') ? 'bold' : 500,}}
              >
                 Bookings
              </Button>
            )}
              

              <Button
                component={RouterLink}
                to='/contact'
                 sx={{  color: isActive('/contact') ? 'red' : 'black',
                   fontWeight: isActive('/contact') ? 'bold' : 500,}}
              >
              
                 Contact
              </Button>




              
        
            {isLoggedIn && user ? (
              <>
                <IconButton
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  sx={{ ml: 2 }}
                >
                  <Avatar
                    src={`${ImageUrl}/${user.profileImage}`}
                    alt={user.firstName}
                  />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem
                    component={RouterLink}
                    to="/update-password"
                    onClick={handleMenuClose}
                  >
                    <ListItemIcon>
                      <Lock fontSize="small" />
                    </ListItemIcon>
                    Update Password
                  </MenuItem>
                  <MenuItem
                    component={RouterLink}
                    to={`/view-bookings/${user._id}`}
                    onClick={handleMenuClose}
                  >
                    <ListItemIcon>
                      <CalendarToday fontSize="small" />
                    </ListItemIcon>
                    View Bookings
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    component={RouterLink}
                    to="/login"
                    onClick={handleLogout}
                    sx={{ color: "error.main" }}
                  >
                    <ListItemIcon>
                      <ExitToApp fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                component={RouterLink}
                to="/login"
                variant="contained"
                sx={{ ml: 2 }}
              >
                Login
              </Button>
            )}
          </Box>

          {/* Mobile Menu Icon */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ display: { md: "none" } }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.text}
                component={RouterLink}
                to={item.path}
                onClick={() => setDrawerOpen(false)}
              >
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
          {isLoggedIn && user && (
            <>
              <Divider />
              <Box display="flex" alignItems="center" p={2}>
                <Avatar
                  src={`${ImageUrl}/${user.profileImage}`}
                  alt={user.firstName}
                  sx={{ width: 40, height: 40, mr: 1 }}
                />
                <Typography variant="body1">{user.firstName}</Typography>
              </Box>
              <List>
                <ListItem
                  button
                  component={RouterLink}
                  to="/update-password"
                  onClick={() => setDrawerOpen(false)}
                >
                  <ListItemIcon>
                    <Lock />
                  </ListItemIcon>
                  <ListItemText primary="Update Password" />
                </ListItem>
                <ListItem
                  button
                  component={RouterLink}
                  to={`/view-bookings/${user._id}`}
                  onClick={() => setDrawerOpen(false)}
                >
                  <ListItemIcon>
                    <CalendarToday />
                  </ListItemIcon>
                  <ListItemText primary="View Bookings" />
                </ListItem>
                <ListItem
                  button
                  component={RouterLink}
                  to="/login"
                  onClick={handleLogout}
                >
                  <ListItemIcon>
                    <ExitToApp sx={{ color: "error.main" }} />
                  </ListItemIcon>
                  <ListItemText primary="Logout" sx={{ color: "error.main" }} />
                </ListItem>
              </List>
            </>
          )}
          {!isLoggedIn && (
            <Box p={2}>
              <Button
                component={RouterLink}
                to="/login"
                variant="contained"
                fullWidth
                onClick={() => setDrawerOpen(false)}
              >
                Login
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
