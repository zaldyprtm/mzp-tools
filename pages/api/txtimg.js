import axios from "axios";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        const response = await axios.get('https://itzpire.com/ai/realistic', {
            params: {
                prompt: encodeURIComponent(prompt), // Ensure the prompt is URL-encoded
            },
        });

        // Assuming the response contains the image URL
        const imageUrl = response.data?.result || response.data; // Adjust based on actual API response structure

        res.status(200).json({
            result: imageUrl,
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: error.message });
    }
}
