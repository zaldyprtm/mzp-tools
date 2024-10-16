import axios from "axios";

export default async function handler(req, res) {

    if(req.method === 'POST') {
        const { url } = req.body;

        try {
            const response = await axios.get("https://api.nyxs.pw/dl/yt", {
                params: {
                    url: url
                }
            })
            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}