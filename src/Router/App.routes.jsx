import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
  import Wrapper from "../Layout/Wrapper";
import Register from "../Pages/Register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import OTPVerification from "../Pages/OtpVerification";
import Login  from "../Pages/Login";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { check_token } from "../Redux/AuthSlice";
import ForgotPassword from "../Pages/ForgotPassword";
import EmailVerification from "../Pages/EmailVerification";
import ForgotPasswordOTPVerification from "../Pages/ForgotPasswordOTPVerification";
import ResetPassword from "../Pages/ResetPassword";
import Home from "../Layout/Home";
import UpdatePassword from "../Pages/UpdatePassword";
import Bookings from "../Pages/Bookings";
import Services from "../Pages/Services"
import About from '../Pages/About'
import ViewBookings from '../Pages/ViewBookings'
import Contact from "../Pages/Contact";

  
  function AppRoutes() {
    const dispatch = useDispatch();
    const queryclient = new QueryClient();
    
  function PrivateRoute({ children }) {
    let token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    return token !== null && token !== undefined && token !== "" ? (
      children
    ) : (
      <Navigate to="/login" />
    );
  }

    const public_route = [
      {
        path: "/registration",
        component: <Register/>,
      },
      {
      path: "/services",
      component: <Services/>,
    },
     {
      path: "/about",
      component: <About/>,
    },
      {
        path: "/verify-otp",
        component: <OTPVerification/>,
      },
      {
        path: "/login",
        component: <Login/>,
      },
      {
        path: "/forgot-password",
        component: <ForgotPassword />,
      },
      {
        path: "/api/confirmation/:id/:email/:token",
        component: <EmailVerification />,
      },
      
  
      {
        path: "/verify-forgot-password-otp",
        component: <ForgotPasswordOTPVerification />,
      },
      {
        path: "/reset-password",
        component: <ResetPassword/>,
      },
      {
        path: "/",
        component: <Home/>,
      },
        {
      path: "/contact",
      component: <Contact/>,
    },
  
    ];

    const private_route = [
       {
      path: "/update-password",
      component: <UpdatePassword />,
    },
     {
      path: "/bookings",
      component: <Bookings/>,
    },
    {
      path: "/view-bookings/:id",
      component: <ViewBookings />,
    },
    ];

    useEffect(() => {
      dispatch(check_token());
    }, []);
  
    return (
      <>
           <ToastContainer />
          <QueryClientProvider client={queryclient}>
          <Router>
            <Wrapper>
              <Routes>
               
                {/* <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} /> 
                <Route path="/services" element={<Services />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/registration" element={<Registration />} /> */}
  
                {public_route.map((route) => (
                  <Route path={route.path} element={route.component} />
                ))}

                  {private_route.map((route) => (
                <Route
                  path={route.path}
                  element={<PrivateRoute>{route.component}</PrivateRoute>}
                />
              ))}
               
              </Routes>
            </Wrapper>
          </Router>
          </QueryClientProvider>
      </>
    );
  }
  
  export default AppRoutes;
  