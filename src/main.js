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
        "content-type": "application/json",
        "X-RapidAPI-Key": process.env.RAPID_API_KEY,
        "X-RapidAPI-Host": process.env.RAPID_API_HOST,
      },
      body: JSON.stringify({
        text: text,
        source: "en",
        target: "fr",
      }),
    };
    const response = await fetch(TRANSLATE_API, options);
    const data = await response.json();
    if (Object.keys(data).length > 0) {
      res.status(200).send({
        translation: data?.translations?.translation,
      });
    } else {
      res.status(500).send({
        message: "Unable To Process The Data Please Try Again Later!",
      });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log("server running at port:" + port);
});
