import { useState } from "react";
import axios from "axios";
import Navbar from "@/components/navbar";
import { motion } from "framer-motion";

export default function BlackBox() {
    const [text, setText] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('/api/blackbox', {
                text: text
            });
            setResult(response.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 mt-20">
                <h1 className="text-3xl font-bold mb-6">Blackbox AI</h1>

                <div className="max-w-2xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-4 text-black">
                        <div>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="w-full p-3 border rounded-lg min-h-[150px]"
                                placeholder="Enter your text here..."
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
                        >
                            {loading ? 'Processing...' : 'Submit'}
                        </button>
                    </form>

                    {error && (
                        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
                            Error: {error}
                        </div>
                    )}

                    {result && (
                        <>
                            <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                            >
                                <div className="mt-6 text-black mb-20">
                                    <h2 className="text-xl font-semibold mb-2">Result:</h2>
                                    <div className="p-4 bg-gray-100 rounded-lg">
                                        <pre>
                                            <code className="whitespace-pre-wrap">
                                                {result.result}
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}


