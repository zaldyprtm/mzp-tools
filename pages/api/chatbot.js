import axios from "axios";

export default async function handler(req, res) {
  // Cek metode HTTP
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Metode tidak diizinkan" });
  }

  // Ambil teks dari body request
  const { text } = req.body;

  // Validasi input teks
  if (!text) {
    return res.status(400).json({ error: "Teks diperlukan" });
  }

  try {
    // Pola pertanyaan tentang nama dalam huruf kecil
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

    // Jika teks cocok dengan pola pertanyaan nama, balas dengan jawaban default
    if (namePatternsLowerCase.some(pattern => text.toLowerCase().includes(pattern))) {
      const nameResponse = "Halo! Nama saya Ve. Saya adalah asisten AI pribadi Anda. Ada yang bisa saya bantu?";
      return res.status(200).json({ 
        status: "success",
        message: "OK",
        result: nameResponse
       });
    }

 
    const apiResponse = await axios.get(`https://api.nyxs.pw/ai/gpt4?text=${encodeURIComponent(text)}`);

    // Jika API memberikan respons yang valid, kembalikan jawaban dengan format tertentu
    if (apiResponse.data && apiResponse.data.result) {
      const result = apiResponse.data.result;
      const responseMessage = `Ve: ${result} Ada lagi yang bisa saya bantu?`;
      return res.status(200).json({ 
        status: "success",
        message: "OK",
        result: responseMessage 

      });
    } else {
      return res.status(500).json({ error: "Respons tidak valid dari API" });
    }
  } catch (error) {
    console.error("Kesalahan saat mengambil API:", error);
    return res.status(500).json({ error: "Kesalahan Internal Server" });
  }
}
