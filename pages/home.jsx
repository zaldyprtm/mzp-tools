import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 text-white shadow-lg w-full h-screen">
        <h1 className="font-bold text-2xl text-center mt-10" style={{ fontFamily: 'Sixtyfour Convergence' }}>Easiest way to download and talk with MZP-TOOLS</h1>
        <div className="container mx-auto flex justify-center items-center mt-40">
          <Link href="/tools">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="bg-white text-white font-bold rounded-md p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            >
              Get Started
            </motion.button>
          </Link>
        </div>
      </div>
    </>
  );
}
