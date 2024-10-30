import axios from 'axios';
import { useState } from 'react';
import Head from 'next/head';
import Navbar from '@/components/navbar';
import { motion } from 'framer-motion';

export default function TextImg() {
    const [prompt, setPrompt] = useState('');
    const [result, setResult] = useState(''); // Change to string for image URL
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('/api/txtimg', { prompt });

            if (response.data.result) { // Check if the result contains the image URL
                setResult(response.data.result); // Set the image URL directly
                console.log(response.data.result);
            } else {
                setError("Failed to generate image. Please try again.");
            }

        } catch (error) {
            console.error(error);
            setError(error.response?.data?.details || error.message || "Terjadi kesalahan. Silakan coba lagi nanti.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div>
                <Head title="MZP-TOOLS" />
                <div>
                    <Navbar />
                    <motion.div
                        initial={{ opacity: 0, y: 70 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="container mx-auto px-4 mt-20">
                            <h1 className="text-3xl font-bold mb-6">Text2Img</h1>
                            <div className="max-w-2xl mx-auto text-black">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="prompt" className="block font-bold mb-2">Prompt</label>
                                        <input
                                            type="text"
                                            id="prompt"
                                            value={prompt}
                                            onChange={(e) => setPrompt(e.target.value)}
                                            className="w-full border border-gray-400 p-2 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div className="flex justify-center">
                                        <button
                                            type="submit"
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                            disabled={loading}
                                        >
                                            {loading ? 'Generating...' : 'Generate'}
                                        </button>
                                    </div>
                                </form>
                                {error && <p className="text-red-500 mt-4">{error}</p>}
                            </div>
                        </div>
                    </motion.div>
                    {result && (
                        <motion.div
                            initial={{ opacity: 0, y: 70 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <div className="container mx-auto px-4 mt-20">
                                <h1 className="text-3xl font-bold mb-6">Result</h1>
                                <div className="max-w-2xl mx-auto text-black">
                                    <img src={result} alt="Generated Result" className="w-full h-auto rounded-md" />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </>
    );
}
