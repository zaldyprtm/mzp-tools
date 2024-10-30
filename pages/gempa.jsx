import { useState } from "react";
import { Loader2 } from "lucide-react";
import axios from "axios";
import Navbar from "@/components/navbar";


export default function Gempa() {
    const [gempa, setGempa] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('/api/gempa');

            setGempa(response.data.result);
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.details || error.message || "Terjadi kesalahan. Silakan coba lagi nanti.");
        } finally {
            setLoading(false);


        }
    };

    return (
        <>
        <Navbar />
            <div className="w-full max-w-2xl mx-auto mt-40  p-6 bg-white rounded-lg shadow-lg">
                <header className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Info Gempa Terkini</h1>
                </header>

                <div className="space-y-4">
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Loading...
                            </span>
                        ) : (
                            'Get Earthquake Info'
                        )}
                    </button>

                    {error && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                            <h3 className="text-red-800 font-semibold">Error</h3>
                            <p className="text-red-600">{error}</p>
                        </div>
                    )}

                    {gempa && (
                        <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                            {gempa.image && (
                                <div className="w-full flex justify-center p-4 bg-white border-b border-gray-200">
                                    <img
                                        src={gempa.image}
                                        alt="Peta Gempa"
                                        className="max-w-full h-auto rounded-lg shadow-md"
                                    />
                                </div>
                            )}

                            <div className="p-6 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <h2 className="text-lg font-semibold text-gray-900">Waktu</h2>
                                        <p className="text-gray-700">Tanggal: {gempa.tanggal}</p>
                                        <p className="text-gray-700">Jam: {gempa.jam}</p>
                                    </div>

                                    <div className="space-y-2">
                                        <h2 className="text-lg font-semibold text-gray-900">Lokasi</h2>
                                        <p className="text-gray-700">Lintang: {gempa.lintang}</p>
                                        <p className="text-gray-700">Bujur: {gempa.bujur}</p>
                                    </div>

                                    <div className="space-y-2">
                                        <h2 className="text-lg font-semibold text-gray-900">Kekuatan</h2>
                                        <p className="text-gray-700">Magnitude: {gempa.magnitude}</p>
                                        <p className="text-gray-700">Kedalaman: {gempa.kedalaman}</p>
                                    </div>

                                    <div className="space-y-2">
                                        <h2 className="text-lg font-semibold text-gray-900">Wilayah</h2>
                                        <p className="text-gray-700">{gempa.wilayah}</p>
                                    </div>
                                </div>

                                {gempa.potensi && (
                                    <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                                        <h2 className="text-lg font-semibold text-yellow-800 mb-2">Potensi</h2>
                                        <p className="text-yellow-700">{gempa.potensi}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}