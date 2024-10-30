import Link from "next/link";
import Navbar from "@/components/navbar";
import { motion } from "framer-motion";

export default function Tools() {


    return (
        <>
            <Navbar />
            <div className="w-full h-screen mx-auto p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                <motion.h1
                    initial={{ opacity: 0, y: 70 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="font-bold text-3xl text-center mt-10 mb-5"
                >
                    Tools
                </motion.h1>
                <motion.div
                    initial={{ opacity: 0, y: -80 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* card */}

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 2.2 }}
                        >
                            <div className="bg-white shadow-lg backdrop-blur-2xl  p-4 rounded-lg shadow-md">
                                <h2 className="font-bold text-xl mb-2 text-black">VeTalk</h2>
                                <p className="text-gray-600"> Talk with Ve, your AI assistant. </p>
                                <Link href="/chatbot">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        className="bg-blue-500 text-white p-2 rounded-md mt-4"
                                    >
                                        Get Started
                                    </motion.button>
                                </Link>
                            </div>
                           

                        </motion.div>

                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="font-bold text-xl mb-2 text-black">Downloader</h2>
                            <p className="text-gray-600"> Video and audio downloader </p>
                            <Link href="/downloader">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    className="bg-blue-500 text-white p-2 rounded-md mt-4"
                                >
                                    Get Started
                                </motion.button>
                            </Link>
                        </div>

                        {/* <div className="bg-slate-200 p-4 rounded-lg shadow-md" aria-disabled>
                            <h2 className="font-bold text-xl mb-2 text-black">Coming Soon</h2>
                            <p className="text-gray-600"> Soon </p>
                            <Link href="#">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    className="bg-blue-500 text-white hover:bg-blue-400 p-2 rounded-md mt-4"
                                  
                                >
                                    Coming Soon
                                </motion.button>
                            </Link>
                        </div>
                     */}
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="font-bold text-xl mb-2 text-black">BlackBox Ai</h2>
                            <p className="text-gray-600"> Your Programming Assistant </p>
                            <Link href="/blackbox">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    className="bg-blue-500 text-white p-2 rounded-md mt-4"
                                >
                                    Get Started
                                </motion.button>
                            </Link>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="font-bold text-xl mb-2 text-black">Info Gempa</h2>
                            <p className="text-gray-600"> Info gempa terkini </p>
                            <Link href="/gempa">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    className="bg-blue-500 text-white p-2 rounded-md mt-4"
                                >
                                    Get Started
                                </motion.button>
                            </Link>
                        </div>  

                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="font-bold text-xl mb-2 text-black">Berita Terkini</h2>
                            <p className="text-gray-600"> Info Berita terkini </p>
                            <Link href="/berita">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    className="bg-blue-500 text-white p-2 rounded-md mt-4"
                                >
                                    Get Started
                                </motion.button>
                            </Link>
                        </div>  

                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="font-bold text-xl mb-2 text-black">Surah</h2>
                            <p className="text-gray-600"> Surah Quran </p>
                            <Link href="/surah">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    className="bg-blue-500 text-white p-2 rounded-md mt-4"
                                >
                                    Get Started
                                </motion.button>
                            </Link>
                        </div>  



                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="font-bold text-xl mb-2 text-black">Text to Image Generator</h2>
                            <p className="text-gray-600"> Generate Realistic Image </p>
                            <Link href="/text2img">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    className="bg-blue-500 text-white p-2 rounded-md mt-4"
                                >
                                    Get Started
                                </motion.button>
                            </Link>
                        </div>  


                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="font-bold text-xl mb-2 text-black">Search Movies</h2>
                            <p className="text-gray-600"> Cari film apik </p>
                            <Link href="/filmapik">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    className="bg-blue-500 text-white p-2 rounded-md mt-4"
                                >
                                    Get Started
                                </motion.button>
                            </Link>
                        </div>  



                    </div>
                </motion.div>

        

            </div>
        </>
    );
}
