import axios from "axios";
import Navbar from "@/components/navbar";
import { motion } from "framer-motion";
import { useState } from "react";

export default function YouTubeDownloader() {
    const [url, setUrl] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDownload = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('/api/ytdl', { url });
            if (response.data.result && response.data.status) {
                setResult(response.data.result);
            } else {
                setError("Gagal mendapatkan URL. Silakan periksa URL dan coba lagi.");
            }
        } catch (error) {
            console.error("Download error:", error);
            setError(error.response?.data?.details || error.message || "Terjadi kesalahan. Silakan coba lagi nanti.");
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setUrl("");
        setResult(null);
    };

    // Function to render download options
    const renderDownloadOptions = () => (
        <div className="flex flex-col md:flex-row justify-center mt-4 gap-4">
            {result.data.sd && (
                <DownloadCard
                    quality="SD"
                    data={result.data.sd}
                    color="bg-blue-500"
                />
            )}
            {result.data.hd && (
                <DownloadCard
                    quality="HD"
                    data={result.data.hd}
                    color="bg-green-500"
                />
            )}
            {result.data.mp3 && (
                <DownloadCard
                    quality="MP3"
                    data={result.data.mp3}
                    color="bg-purple-500"
                />
            )}
        </div>
    );

    return (
        <>
            <Navbar />

            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 text-white  shadow-lg w-full h-screen">
                <motion.h1 className="font-bold text-center mt-10 text-2xl">
                    YouTube Downloader
                </motion.h1>

                <div className="container mx-auto flex flex-col justify-center items-center mt-20">
                    <input
                        type="text"
                        value={url}
                        placeholder="Masukkan URL YouTube video..."
                        onChange={(e) => setUrl(e.target.value)}
                        className="text-black p-2 rounded-lg w-96 mb-4"
                    />

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        className={`bg-white text-white font-bold rounded-md p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-4 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        onClick={loading ? null : handleDownload}
                        disabled={loading}
                    >
                        {loading ? "Downloading..." : "Download"}
                    </motion.button>

                    {result && (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="bg-white text-white font-bold rounded-md p-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                            onClick={handleReset}
                        >
                            Reset
                        </motion.button>
                    )}
                </div>

                <div className="mt-5 mb-20 text-center" aria-live="polite">
                    {error && <p className="text-red-500">{error}</p>}
                    {result && (
                        <div className="text-green-500 mb-10">
                            <p className="text-xl font-semibold text-white mb-2">Video Title: <span className="text-white">{result.title}</span></p>
                            <h2 className="mt-4 text-md text-white font-semibold">Available Downloads:</h2>
                            {renderDownloadOptions()}
                        </div>
                    )}
                </div>

            </div>
        </>
    );
}

// DownloadCard component for reusable download option rendering
const DownloadCard = ({ quality, data, color }) => (
    <div className={`${color} text-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 `}>
        <h3 className="font-bold">{quality} ({data.quality})</h3>
        <p>{data.size}</p>
        <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block bg-white text-blue-500 rounded-md p-2 text-center transition-colors hover:bg-blue-400 hover:text-white"
        >
            Download
        </a>
    </div>
);
