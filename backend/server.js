app.post("/generate-video", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt missing" });
    }

    // 🔥 VIDEO GENERATION (example AI API pattern)
    const response = await axios.post(
      "https://queue.fal.run/fal-ai/minimax/video", 
      {
        prompt: prompt,
        duration: 5
      },
      {
        headers: {
          Authorization: `Key ${process.env.FAL_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const videoUrl = response.data.video?.url;

    res.json({
      video: videoUrl
    });

  } catch (err) {
    console.log(err.response?.data || err.message);
    res.status(500).json({
      error: "Video generation failed",
      details: err.message
    });
  }
});
