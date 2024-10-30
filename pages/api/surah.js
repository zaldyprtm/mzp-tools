// pages/api/surah.js
import axios from 'axios';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method tidak diizinkan' });
    }

    const { no } = req.query;

    if (!no || isNaN(no) || no < 1 || no > 114) {
        return res.status(400).json({ 
            status: false,
            message: 'Nomor surah tidak valid' 
        });
    }

    try {
        const response = await axios.get(`https://widipe.com/surah?no=${no}`);
        // Forward the exact response from widipe.com
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching surah:', error);
        res.status(500).json({ 
            status: false,
            message: 'Terjadi kesalahan saat mengambil data surah'
        });
    }
}