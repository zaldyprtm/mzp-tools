import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/navbar";
import { motion, AnimatePresence } from "framer-motion";

export default function Chatbot() {
    const [inputText, setInputText] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = async () => {
        if (inputText.trim() === "") return;

        const userMessage = { sender: "user", text: inputText };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setLoading(true);

        try {
            const response = await axios.post("/api/chatbot", { text: inputText });
            const botMessage = { sender: "bot", text: response.data.result };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: "bot", text: "Maaf, terjadi kesalahan dalam mendapatkan respons." },
            ]);
        } finally {
            setLoading(false);
        }

        setInputText("");
    };

    return (
        <>
            <Navbar />
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full min-h-screen p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center"
            >
                <motion.div 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="w-full max-w-md bg-white bg-opacity-20 backdrop-blur-xl shadow-lg rounded-lg overflow-hidden"
                >
                    <div className="p-4">
                        <h1 className="text-2xl font-bold mb-4 text-white text-center">Chat dengan Ve</h1>
                        <div className="h-80 overflow-y-auto mb-4 p-2 rounded-lg bg-white bg-opacity-10">
                            <AnimatePresence>
                                {messages.map((msg, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className={`my-2 p-3 rounded-lg ${
                                            msg.sender === "user"
                                                ? "bg-indigo-600 text-white ml-auto"
                                                : "bg-pink-600 text-white mr-auto"
                                        } max-w-[80%] break-words`}
                                    >
                                        {msg.text}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {loading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center text-white mt-2"
                                >
                                    Ve sedang mengetik...
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                        <div className="flex">
                            <input
                                type="text"
                                className="flex-1 p-2 border border-transparent bg-white bg-opacity-20 rounded-l-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
                                placeholder="Ketik pesan Anda..."
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                            />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleSendMessage}
                                className="bg-purple-600 text-white p-2 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            >
                                Kirim
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
}