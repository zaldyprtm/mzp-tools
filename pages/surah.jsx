// pages/index.js
import { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Navbar from '@/components/navbar';

export default function Home() {
    const [surahNumber, setSurahNumber] = useState('');
    const [surahData, setSurahData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSurahData(null);

        try {
            const response = await axios.post(`/api/surah?no=${surahNumber}`);
            if (!response.data.status) {
                throw new Error(response.data.message || 'Terjadi kesalahan');
            }
            setSurahData(response.data);
            console.log(response.data);
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Terjadi kesalahan saat mengambil data');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <Navbar />
            <div className="min-h-screen bg-gray-100">
                <Head>
                    <title>Baca Surah Al-Quran</title>
                    <meta name="description" content="Aplikasi untuk membaca surah Al-Quran" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold text-center text-black mb-8">
                        Baca Surah Al-Quran
                    </h1>

                    {/* Form Input */}
                    <div className="max-w-md mx-auto mb-8">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="surahNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                    Nomor Surah (1-114)
                                </label>
                                <input
                                    type="number"
                                    id="surahNumber"
                                    min="1"
                                    max="114"
                                    value={surahNumber}
                                    onChange={(e) => setSurahNumber(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 text-black rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Masukkan nomor surah"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400"
                            >
                                {loading ? 'Memuat...' : 'Tampilkan Surah'}
                            </button>
                        </form>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="max-w-md mx-auto mb-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            <p>{error}</p>
                        </div>
                    )}

                    {/* Loading Indicator */}
                    {loading && (
                        <div className="max-w-md mx-auto mb-8 text-center">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                        </div>
                    )}

                    {/* Surah Content */}
                    {surahData && !loading && (
                        <div className="max-w-2xl mx-auto">
                            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                                <div className="text-center mb-6">
                                    <h2 className="text-2xl font-bold text-gray-800">Surah {surahNumber}</h2>
                                    {surahData.creator && (
                                        <p className="text-sm text-gray-500 mt-1">Source: {surahData.creator}</p>
                                    )}
                                </div>
                            </div>

                            {surahData.result && surahData.result.map((ayat, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-md p-6 text-black mb-4">
                                    <div className="space-y-4">
                                        <div className="flex justify-end mb-2">
                                            <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                                                Ayat {index + 1}
                                            </span>
                                        </div>
                                        <div className="border-b pb-4">
                                            <div className="space-y-6">
                                                <div>
                                                    <p className="text-right text-2xl leading-loose font-arabic">
                                                        {ayat.arab}
                                                    </p>
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-700 mb-2">Arti:</h3>
                                                    <p className="text-gray-600">{ayat.rumi}</p>
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-700 mb-2">Latin:</h3>
                                                    <p className="text-gray-600">{ayat.latin}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}