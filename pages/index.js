import React from 'react'
import Home from './home'
import Navbar from '../components/navbar'
import Footer from '@/components/footer'
import Head from 'next/head'

export default function index() {
  return (
    <>
      <Head
        title="MZP-TOOLS"
      />
      <div>
        <Navbar />
        <Home />
        <Footer />
      </div>
    </>
  )
}
