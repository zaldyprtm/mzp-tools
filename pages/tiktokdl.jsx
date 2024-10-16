import React, { useState } from "react";
import axios from "axios";
import Navbar from "@/components/navbar";


const TikTokDownloader = () => {
    const [url, setUrl] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDownload = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post("/api/tiktokdl", { url });
            if (response.data.status && response.data.result.music) {
                setResult(response.data.result);
            } else {
                setError("Gagal mendapatkan URL MP3. Silakan periksa URL TikTok dan coba lagi.");
            }
        } catch (error) {
            console.error("Download error:", error.response ? error.response.data : error);
            setError(
                error.response?.data?.details ||
                error.message ||
                "Terjadi kesalahan. Silakan coba lagi nanti."
            );
        } finally {
            setLoading(false);
        }
    };

    const downloadMP3 = async () => {
        if (!result || !result.music) return;

        try {
            const response = await axios.get(result.music, {
                responseType: "blob",
            });
            const blob = new Blob([response.data], { type: "audio/mpeg" });
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = `tiktok_audio_${Date.now()}.mp3`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(downloadUrl);
        } catch (error) {
            console.error("MP3 download error:", error);
            setError("Gagal mengunduh MP3. Silakan coba lagi.");
        }
    };

    return (
        <>
            <Navbar />
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 text-white min-h-screen">
                <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">TikTok MP3 Downloader</h1>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Masukkan URL TikTok"
                        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none mb-4"
                    />
                    <button
                        onClick={handleDownload}
                        disabled={loading || !url}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
                    >
                        {loading ? "Memproses..." : "Dapatkan MP3"}
                    </button>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    {result && result.music && (
                        <div className="mt-4">
                            <button
                                onClick={downloadMP3}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Unduh MP3
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default TikTokDownloader;