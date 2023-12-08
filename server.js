const express = require('express');
const uuid = require('uuid');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/html', (req, res) => {
  res.sendFile('/home/abhishek/Mountblue/httpProject/index.html');
});

app.get('/json', (req, res) => {
  res.json({
    slideshow: {
      author: 'Yours Truly',
      date: 'date of publication',
      slides: [
        {
          title: 'Wake up to WonderWidgets!',
          type: 'all',
        },
        {
          items: [
            'Why <em>WonderWidgets</em> are great',
            'Who <em>buys</em> WonderWidgets',
          ],
          title: 'Overview',
          type: 'all',
        },
      ],
      title: 'Sample Slide Show',
    },
  });
});

app.get('/uuid', (req, res) => {
  const UUID = uuid.v4();
  res.json({ uuid: UUID });
});

app.get('/status/:code', (req, res) => {
  res.statusCode = parseInt(req.params.code);
  res.send({
    msg: `returned with the given status code ${req.params.code}`,
  });
});

app.get('/delay/:seconds', (req, res) => {
  setTimeout(() => {
    res.send(`response send in ${req.params.seconds} seconds`);
  }, req.params.seconds * 1000);
});

app.listen('3000', () => {
  console.log('sucessfully connected');
});
