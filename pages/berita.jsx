import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Link from "next/link";
import { motion } from "framer-motion"; // pastikan menggunakan { motion } jika ingin menggunakan animasi

export default function Berita() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .post("/api/berita")
            .then((response) => {
                setNews(response.data.result); // Mulai dari indeks ke-24
                setLoading(false);
                console.log(response.data.result);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    return (
        <>
            <Navbar />
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-screen mx-auto px-4">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl p-3 text-center font-bold mb-6 text-white">Berita Terkini</h1>
                </div>

                {loading && (
                    <p className="text-center text-white">Loading...</p>
                )}

                {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                        <h3 className="text-red-800 font-semibold">Error</h3>
                        <p className="text-red-600">{error}</p>
                    </div>
                )}

                {!loading && news.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {news.map((item, index) => (
                            <motion.div
                                key={index}
                                className="bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
                                whileHover={{ scale: 1.05 }} // animasi hover dengan Framer Motion
                            >
                                <h3 className="font-bold text-black">{item.title}</h3>
                                <p className="text-sm font-bold text-sky-400">{item.date}</p>
                                {/* <img src={item.thumb} alt={item.judul} className="w-50 h-44 object-cover" /> */}
                                <p className="text-black">{item.description}</p>
                                <a 
                                    href={item.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="mt-2 inline-block bg-sky-400 hover:bg-blue-400 rounded-md p-2 text-center text-white transition-colors"
                                >
                                    Read More
                                </a>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
