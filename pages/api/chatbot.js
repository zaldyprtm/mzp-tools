import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Metode tidak diizinkan" });
  }

  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Teks diperlukan" });
  }

  try {
    
    const namePatternsLowerCase = [
      "siapa namamu",
      "nama kamu siapa",
      "kamu siapa",
      "apa namamu",
      "boleh tau namamu",
      "hai",
      "halo",
      "hi",
      "hello"

    ];

    if (namePatternsLowerCase.some(pattern => text.toLowerCase().includes(pattern))) {
      const nameResponse = "Halo! Nama saya Ve. Saya adalah asisten AI pribadi Anda. Ada yang bisa saya bantu?";
      return res.status(200).json({ result: nameResponse });
    }

    // Jika bukan pertanyaan tentang nama, lanjutkan dengan permintaan API normal
    const apiResponse = await axios.get(`https://api.nyxs.pw/ai/gemini?text=${encodeURIComponent(text)}`);

    if (apiResponse.data && apiResponse.data.result) {
      const result = apiResponse.data.result;
      const responseMessage = `Ve: ${result} Ada lagi yang bisa saya bantu?`;
      return res.status(200).json({ result: responseMessage });
    } else {
      return res.status(500).json({ error: "Respons tidak valid dari API" });
    }
  } catch (error) {
    console.error("Kesalahan saat mengambil API:", error);
    return res.status(500).json({ error: "Kesalahan Internal Server" });
  }
}