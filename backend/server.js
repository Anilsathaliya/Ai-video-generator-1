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
    res.status(500).json({
      error: "Generation failed",
      details: error.message
    });
  }
});
