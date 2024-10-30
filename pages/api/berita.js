// BERITA INI MENGGUNAKAN API DARI LIPUTAN6.COM
import axios from "axios";

export default async function handler(req, res) {

    if(req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const response = await axios.get('https://widipe.com/liputan6');
        res.status(200).json(response.data);
    } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
    }
}