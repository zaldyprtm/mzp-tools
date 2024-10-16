import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { url } = req.body; // Ensure url is defined
        
        try {
            
            const response = await axios.get("https://api.nyxs.pw/dl/tiktok",  {
                params: {
                    url: url
                }
            });
            res.status(200).json(response.data);
        } catch (error) {
            console.error(error); // Log the error for debugging
            res.status(500).json({ error: error.message }); // Send error message
        }
    } else {
        // Handle other HTTP methods (like GET, PUT, etc.)
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
