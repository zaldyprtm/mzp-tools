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
    // Pola pertanyaan tentang nama
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
      const nameResponse = "Halo! Nama saya Ve, asisten AI pribadimu. Ada yang bisa saya bantu hari ini?";
      return res.status(200).json({ 
        status: "success",
        message: "OK",
        result: nameResponse
      });
    }

    const apiResponse = await axios.get(`https://widipe.com/gpt4?text=${encodeURIComponent(text)}`, {
      params: {
        style: "kamu adalah ai berbahasa indonesia yang ramah dan informatif" 
      }
    });

    if (apiResponse.data && apiResponse.data.result) {
      const result = apiResponse.data.result;
      const responseMessage = `Ve: ${result}. Ada lagi yang bisa saya bantu?`;
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
