const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));

app.post("/generate", async (req, res) => {
  try {
    const { prompt, width, height } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt missing" });
    }

    console.log("Prompt:", prompt);
    console.log("Size:", width, height);

    // 🔥 TEMP DEMO IMAGE (replace with real AI API)
    const imageUrl = `https://via.placeholder.com/${width || 512}x${height || 512}.png?text=${encodeURIComponent(prompt)}`;

    res.json({
      image: imageUrl
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Generation failed" });
  }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
