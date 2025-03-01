require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());

const apiKey = process.env.OPENAI_API_KEY;

app.post("/chat", async (req, res) => {
    try {
        let response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: req.body.messages
            })
        });

        let data = await response.json();
        res.json({ response: data.choices?.[0]?.message?.content || "Sorry, I couldn't process that." });
    } catch (error) {
        res.status(500).json({ error: "Error fetching response" });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
