const http = require('http');
const fs = require('fs/promises');
const uuid = require('uuid');

const server = http.createServer((request, respons) => {
  if (request.method == 'Get' || request.url == '/html') {
    respons.setHeader('Content-Tye', 'text/html');
    fs.readFile('index.html').then((data) => {
      respons.end(data);
    });
  } else if (request.url == '/json') {
    respons.setHeader('Content-Tye', 'json');
    let data = {
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
    };
    respons.end(JSON.stringify(data));
  } else if (request.url == '/uuid') {
    respons.setHeader('Content-Type', 'json');
    let Uuid = uuid.v4();
    let json = {
      Uuid,
    };
    respons.end(JSON.stringify(json));
  } else if (request.url.includes('/status/')) {
    let path = request.url.split('/').pop();
    respons.statusCode = path;
    respons.end(path);
  } else if (request.url.includes('/delay/')) {
    let delay = request.url.split('/').pop();

    setTimeout(() => {
      respons.end('times is ' + delay + 'sec');
    }, delay * 1000);
  } else {
    respons.statusCode = 404;
    respons.end('not found');
  }
});
server.listen(3000, '127.0.0.1', () => {
  console.log('sucess full');
});
