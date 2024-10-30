// pages/api/remini.js
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    // Log the URL being processed
    console.log('Processing URL:', url);

    const response = await axios.get('https://itzpire.com/tools/remini', {
      params: {
        url: url
      },
      timeout: 60000, // Increased timeout to 60 seconds
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://itzpire.com/',
        'Origin': 'https://itzpire.com'
      }
    });

    // Verify response
    if (!response.data) {
      throw new Error('Empty response from API');
    }

    return res.status(200).json(response.data);

  } catch (error) {
    console.error('API Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });

    return res.status(error.response?.status || 500).json({
      error: 'Processing failed',
      message: error.response?.data?.message || error.message
    });
  }
}