const express = require('express');
const axios = require('axios');
const cors = require('cors');

const { cache } = require('./cache');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/photos', async (req, res) => {
  debugger
  const albumId = req.query.albumId;

  try {
    const data = await cache(`photos?albumId=${albumId}`, async () => {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/photos`,
        {
          params: { albumId },
        },
      );
      return data;
    });
    return res.json(data);
  } catch (error) {
    return res.json({ error: error.message });
  }
});

app.get('/photos/:id', async (req, res) => {
  try {
    const data = await cache(`photos:${req.params.id}`, async () => {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/photos/${req.params.id}`,
      );
      return data;
    });
    return res.json(data);
  } catch (error) {
    return res.json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
