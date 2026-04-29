app.post("/generate", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await axios.post(
  "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json"
        },
        responseType: "arraybuffer",
        validateStatus: () => true   // 👈 IMPORTANT
      }
    );

    // 👇 check if response is JSON error
    const contentType = response.headers["content-type"];

    if (contentType && contentType.includes("application/json")) {
      const errorJson = JSON.parse(response.data.toString());
      console.log("HF ERROR:", errorJson);

      return res.status(500).json({
        error: "HuggingFace Error",
        details: errorJson
      });
    }

    // 👇 success image
    const base64 = Buffer.from(response.data).toString("base64");

    res.json({
      image: `data:image/png;base64,${base64}`
    });

  } catch (error) {
    console.log("SERVER ERROR:", error.message);

    res.status(500).json({
      error: "Server crashed",
      details: error.message
    });
  }
});
