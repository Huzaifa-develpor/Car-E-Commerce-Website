import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import Category from '../components/Category'
import FeaturedCars from '../components/FeaturedCars'
import Footer from '../components/Footer'
import ItemDetails from './ItemDetails'
import Context from '../Context/Context'

const Home = () => {
  return (
    <div>
      
      <Navbar />
      <HeroSection />
      <Category/>
      <FeaturedCars/>
      <Footer/>
      
    
    </div>
  )
}

export default Home
