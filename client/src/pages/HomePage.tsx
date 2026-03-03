import React from 'react'
import HeroSection from '../components/Home/HeroSection'
import FeatureSection from '../components/Home/FeatureSection'
import HowItWork from '../components/Home/HowItWork'
import CtaSection from '../components/Home/CtaSection'
import Footer from '../components/Footer'
import Header from '../components/Header'

function HomePage() {
  return (
   <>
   <Header/>
   <HeroSection/>
   <FeatureSection/>
   <HowItWork/>
   <CtaSection/>
   <Footer/>
   </>
  )
}

export default HomePage