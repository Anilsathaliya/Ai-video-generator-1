app.post("/generate", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await axios.post(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`
        },
        responseType: "arraybuffer"
      }
    );

    const base64 = Buffer.from(response.data, "binary").toString("base64");

    res.json({
      image: `data:image/png;base64,${base64}`
    });

  } catch (error) {
    console.log("ERROR:", error.response?.data || error.message);

    res.status(500).json({
      error: "Generation failed",
      details: error.message
    });
  }
});
