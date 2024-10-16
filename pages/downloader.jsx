import Navbar from "@/components/navbar"
import Link from "next/link"
import { motion } from "framer-motion"
import { FaInstagram, FaInstagramSquare, FaTiktok, FaYoutube } from "react-icons/fa"


export default function Downloader() {

    return (
        <>
            <Navbar />
            <div
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 text-white shadow-lg w-full h-screen"
            >
                {/* card */}
                <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                >

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
                        {/* tiktokdl */}
                        <div className="bg-white p-4 rounded-lg shadow-md flex gap-2 items-center flex-wrap w-96">
                            <FaTiktok className="text-black mb-2" />
                            <h2 className="font-bold text-xl text-black mb-2">Tiktok Audio Downloader</h2>
                            <Link href="/tiktokdl">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    className="bg-blue-500 text-white p-2 rounded-md"
                                >
                                    Get Started
                                </motion.button>
                            </Link>
                        </div>

                        {/* igdl */}
                        <div className="bg-white p-4 rounded-lg shadow-md flex gap-2 items-center flex-wrap w-96">
                            <FaInstagram className="text-black mb-2" />
                            <h2 className="font-bold text-xl text-black mb-2">Instagram Reels Downloader</h2>
                            <Link href="/instagramdl">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    className="bg-blue-500 text-white p-2 rounded-md"
                                >
                                    Get Started
                                </motion.button>
                            </Link>
                        </div>

                        {/* ytdl */}

                        <div className="bg-white p-4 rounded-lg shadow-md flex gap-2 items-center flex-wrap w-96">
                            <FaYoutube className="text-black mb-2" />
                            <h2 className="font-bold text-xl text-black mb-2">Youtube Video Downloader</h2>
                            <Link href="/youtubedl">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    className="bg-blue-500 text-white p-2 rounded-md"
                                >
                                    Get Started
                                </motion.button>
                            </Link>
                        </div>


                    </div>
                </motion.div>

            </div>
        </>
    )

}