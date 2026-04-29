const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

// HOME TEST
app.get("/", (req, res) => {
  res.send("AI Backend Running 🚀");
});

// GENERATE API
app.post("/generate", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await axios.post(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2",
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${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}`
        },
        responseType: "arraybuffer"
      }
    );

    const base64 = Buffer.from(response.data, "binary").toString("base64");

    res.json({
      image: `data:image/png;base64,${base64}`
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
