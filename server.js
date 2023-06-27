const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/photos', async (req, res) => {
  const albumId = req.query.albumId;
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/photos`,
    {
      params: { albumId },
    },
  );

  res.json(data);
});

app.get('/photos/:id', async (req, res) => {
  debugger;
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/photos/${req.params.id}`,
  );

  res.json(data);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

function cache(key, callback) {
  return new Promise((resolve, reject) => {
    client.get(key, (err, data) => {
      if (err) reject(err);
      if (data != null) resolve(JSON.parse(data));
      else {
        callback().then(data => {
          client.set(key, JSON.stringify(data));
          resolve(data);
        });
      }
    });
  });
}
