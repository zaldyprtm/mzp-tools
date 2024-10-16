import axios from "axios";
import Navbar from "@/components/navbar";
import { motion } from "framer-motion";
import { useState } from "react";

export default function InstagramDownloader() {
    const [url, setUrl] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDownload = async () => {
        setLoading(true);
        setError(null);
        setResult(null); // Reset result before a new download attempt

        try {
            const response = await axios.post("/api/igdl", { url });
            if (response.data.status && response.data.result) {
                setResult(response.data.result);
            } else {
                setError("Gagal mendapatkan URL. Silakan periksa URL dan coba lagi.");
            }
        } catch (error) {
            console.error("Download error:", error.response ? error.response.data : error);
            setError(
                error.response?.data?.details ?? error.message ?? "Terjadi kesalahan. Silakan coba lagi nanti."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 text-white shadow-lg w-full h-screen">
                <div>
                    <h1 className="font-bold text-2xl text-center mt-10">Instagram Reels Downloader</h1>
                    <div className="container mx-auto flex flex-col justify-center items-center mt-10">
                        <input
                            type="text"
                            placeholder="Masukkan URL Instagram Reels"
                            className="w-96 rounded-lg text-black p-4 mb-4"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            className={`bg-blue-500 text-white p-2 rounded-md ${loading ? "opacity-50" : ""}`}
                            onClick={loading ? null : handleDownload}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <svg
                                        className="animate-spin h-5 w-5 text-white inline-block mr-2"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                    Loading...
                                </>
                            ) : (
                                "Download"
                            )}
                        </motion.button>
                    </div>

                    {result && (
                        <div className="mt-4 text-center">
                            <a
                                href={result.url}
                                className="bg-blue-500 text-white p-2 rounded-md"
                                download
                            >
                                Download Video
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
