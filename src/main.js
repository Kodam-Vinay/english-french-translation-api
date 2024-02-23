const express = require("express");
const dotenv = require("dotenv");
const { TRANSLATE_API } = require("./constants");
const cors = require("cors");
dotenv.config();
const port = process.env.PORT || 8080;
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.post("/translate", async (req, res) => {
  const { text } = req.body;
  try {
    if (text === "") {
      res.status(400).send({ message: "Please Enter Some Text" });
      return;
    }

    const options = {
      method: "POST",
      headers: {
        "X-RapidAPI-Key": process.env.RAPID_API_KEY,
        "X-RapidAPI-Host": process.env.RAPID_API_HOST_GOOGLE,
      },
      body: new URLSearchParams({
        from: "en",
        to: "fr",
        text,
      }),
    };

    const response = await fetch(TRANSLATE_API, options);
    const data = await response.json();
    data &&
      res.status(200).json({
        translation: data.trans,
      });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log("server running at port:" + port);
});
