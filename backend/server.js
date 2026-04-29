const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI Backend Running 🚀");
});

app.post("/generate", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const url =
      "https://image.pollinations.ai/prompt/" +
      encodeURIComponent(prompt);

    const response = await axios.get(url, {
      responseType: "arraybuffer"
    });

    const base64 = Buffer.from(response.data).toString("base64");

    res.json({
      image: `data:image/png;base64,${base64}`
    });

  } catch (error) {
    console.log("ERROR:", error.message);

    res.status(500).json({
      error: "Generation failed",
      details: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
