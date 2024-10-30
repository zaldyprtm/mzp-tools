import axios from "axios";


export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { text } = req.body; // Ensure url is defined
        
        try {
            const response = await axios.get("https://widipe.com/blackbox", {
                params: {
                    text: text
                }
            })
            res.status(200).json(response.data);
        } catch (error) {
            console.error(error); // Log the error for debugging
            res.status(500).json({ error: error.message }); // Send error message
        }
    }
}