import React from 'react'
import Banner from '../components/BannerPart'
import BannerServicePart from '../components/BannerServicePart'
import AboutUsPart from '../components/AboutUsPart'
import FactsPart from '../components/FactsPart'
import OurServicesParts from '../components/OurServicesPart'
import TechnicianParts from '../components/TechnicianParts'
import TestimonialsPart from '../components/TestimonialsPart'
import { useSelector } from 'react-redux'
import BookingPart from '../components/BookingPart'

const Home = () => {
    const { isLoggedIn } = useSelector((state) => state?.auth);
  return (
    <div>
         <Banner/>
     {/* Banner services part in home */}
      <BannerServicePart />

      <AboutUsPart/>

      {/* Fact */}
      <FactsPart/>

      
      {/* Our Services */}
      <OurServicesParts/>
        {/* Bookings */}
      {isLoggedIn ? <BookingPart /> : ""}
       {/* Team Parts */}
      <TechnicianParts/>
        {/* Testimonials */}
      <TestimonialsPart />
     
      
    </div>
  )
}

export default Home
