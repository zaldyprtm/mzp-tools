import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link'; 
import {FaCircle, FaHome, FaTools} from 'react-icons/fa';


const Navbar = () => {
  const navVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 text-white shadow-lg sticky top-0 z-10"
    >
      <div className="container mx-auto flex justify-between items-center">
        <motion.h1
          whileHover={{ scale: 1.1 }}
          className="text-lg font-bold"
        >
          <Link href="/"
          className='flex items-center gap-1'
          >
          <FaCircle />
          <p className="font-sixtyfour" style={{ fontFamily: 'Sixtyfour Convergence',}}>MZP-TOOLS</p>
          
          </Link> 
        </motion.h1>
        <ul className="flex space-x-4">
          <motion.li whileHover={{ scale: 1.1 }}>
            <Link href="/" className="hover:text-blue-300">
             <FaHome />
            
            </Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }}>
            <Link href="/tools" className="hover:text-blue-300">
            <FaTools />
            </Link>
          </motion.li>
          {/* <motion.li whileHover={{ scale: 1.1 }}>
            <Link href="/services" className="hover:text-blue-300">Services</Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }}>
            <Link href="/contact" className="hover:text-blue-300">Contact</Link>
          </motion.li> */}
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navbar;
