import React from 'react'
import Home from './home'
import Navbar from '../components/navbar'
import Footer from '@/components/footer'

export default function index() {
  return (
    <div>
      <Navbar />
      <Home />
      <Footer />
    </div>
  )
}
