
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { nanoid } = require('nanoid');

const app = express();
app.use(express.static('public'));
const port = process.env.PORT || 3000;
const data = {};

app.use(bodyParser.json());
app.use(cors());

app.post('/upload', (req, res) => {
  const text = req.body.text;
  const id = nanoid();
  data[id] = text;
  const url = `https://aw-paste.vercel.app/${id}`;
  res.status(200).send(url);
});

app.get('/:id', (req, res) => {
  const id = req.params.id;
  if (id in data) {
    const text = data[id];
    res.send(`
    <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Paste Upload Website</title>
  <link rel="stylesheet" href="styles.css">
  <script src="https://kit.fontawesome.com/29254b01ee.js" crossorigin="anonymous"></script>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #131417;
    }

    #container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    h1 {
      font-size: 36px;
      margin-top: 0;
      margin-bottom: 20px;
    }

    label {
      font-size: 20px;
      display: block;
      margin-bottom: 10px;
    }

    textarea {
      content: counter(line-number);
      counter-increment: line-number;
      background-color: #26282D;
      width: 100%;
      height: 400px;
      max-width: 750px;
      margin: 20px auto 0;
      resize: none;
      display: block;
      top: 30px;
      border-radius: 10px;
      margin-bottom: 1rem;
      color: white;
    }

    textarea::before {
      content: counter(line-number);
      counter-increment: line-number;
    }

    button {

      display: block;
      margin: 0 auto;
      padding: 10px 30px;
      font-size: 18px;
      background-color: #224EFE;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    button:hover {
      background-color: #3e8e41;
    }

    #result {
      margin-top: 20px;
      font-size: 18px;
      color: white;

    }

    a {
      color: #224EFE;
    }

    .hero {
      background-color: #212327;
      width: 100%;
      height: 500px;
      max-width: 800px;
      margin: 0 auto;
      border-radius: 10px;
    }

    .contain {
      width: 100%;

      max-width: 800px;
      margin: 20px auto 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .button-container {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      margin-top: 0px;
      margin-bottom: 20px;
      margin-right: 50vh;
    }

    .button-container button {
      margin-right: 10px;
    }

    .advertisments {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .box {
      width: 350px;
      height: 150px;
      background-color: #26282D;
      margin: 10px;
      border-radius: 10px;
      font-family: Arial, sans-serif;
      font-size: 18px;
      color: white;
    }

    p {
      font-size: 20px;
      margin-left: 32%;
      margin-top: 18%;

    }

    .image-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      /* Set the height of the container */
    }

    img {
      max-width: 100%;
      /* Ensure the image doesn't exceed the container width */
      max-height: 100%;
      /* Ensure the image doesn't exceed the container height */
    }

    .angelwings {
      height: 120px;
      width: 120px;
    }
  </style>
</head>

<body>
  <div class="advertisments">
    <div class="box">
      <p>Buy This Spot</p>
    </div>
    <div class="box">
      <p>Buy This Spot</p>
    </div>
  </div>
  <div class="image-container">
    <img class="angelwings" src="https://i.imgur.com/CPi1n0X.png" alt="angelwings">
  </div>
  <div class="hero">
    <div class="contain">
      <textarea rows="10" cols="50" number id="pasteText">${text}</textarea>
      <div class="button-container">
        <button id="uploadButton">Get More Leaks<i class="fa-solid fa-arrow-right"
            style="color: #92AAFE; margin-left: 0.5rem;"></i></button>
        

      </div>
      <div id="result"></div>
    </div>

  </div>
  <script src="server.js"></script>

  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
 

</body>

</html>
    `);
  } else {
    res.status(404).send('Paste not found'); // If ID is not found, send a 404 status
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
