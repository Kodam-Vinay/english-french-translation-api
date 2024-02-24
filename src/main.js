const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");
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

  const options = {
    method: "POST",
    url: TRANSLATE_API,
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "21bd153868mshc02d65a505100b3p1e031bjsncd39968d4b1e",
      "X-RapidAPI-Host": "translate-plus.p.rapidapi.com",
    },
    data: JSON.stringify({
      text: text,
      source: "en",
      target: "fr",
    }),
  };
  try {
    if (text === "") {
      res.status(400).send({ message: "Please Enter Some Text" });
      return;
    }
    const response = await axios.request(options);
    if (response?.status === 200)
      res.status(200).send({
        translation: response?.data?.translations?.translation,
      });
    else
      res.status(500).send({
        message: "Something Went Wrong, Please Try again Later!",
      });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log("server running at port:" + port);
});
