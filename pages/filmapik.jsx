import axios from "axios";
import { useState } from "react";
import Navbar from "@/components/navbar";

export default function Filmapik() {
    const [query, setQuery] = useState('');
    const [film, setFilm] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!query) return; // Prevents empty queries
        setLoading(true);

        try {
            const response = await axios.post('/api/film', { query });
            if (response.data.status) {
                setFilm(response.data.result.data); // Accessing the data array from the result
            } else {
                console.error("Error: ", response.data);
                setFilm([]);
            }
        } catch (error) {
            console.error("Error fetching films:", error);
            setFilm([]); // Clear film data on error
        } finally {
            setLoading(false); // Ensures loading state is updated in both success and error
        }
    };

    return (
        <>
            <Navbar />

            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen flex flex-col items-center">
                <div className="flex justify-center items-center gap-5 p-10">
                    <input 
                        type="text" 
                        value={query} 
                        onChange={(e) => setQuery(e.target.value)} 
                        placeholder="Masukkan judul film" 
                        className="w-24 md:w-52 h-12 bg-white text-black rounded-md p-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                    />
                    <button 
                        onClick={handleSearch} 
                        className="h-12 bg-white text-black rounded-md px-4 shadow-lg transition hover:bg-purple-500 hover:text-white"
                    >
                        Cari
                    </button>
                </div>

                {loading ? (
                    <p className="text-center text-white text-xl">Loading...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4 text-black">
                        {film.length > 0 ? (
                            film.map((item) => (
                                <div key={item.url} className="bg-white p-4 rounded-lg shadow-lg transition transform hover:scale-105">
                                    <img src={item.thumbnail} alt={item.title} className="rounded-md mb-2 w-full h-48 object-cover" />
                                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                                    <p className="text-gray-600">Rating: {item.rating}</p>
                                    <p className="text-gray-700 text-sm mb-2">{item.synopsis}</p>
                                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Watch Now</a>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-white text-lg">No films found.</p>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
