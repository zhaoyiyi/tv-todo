import express from 'express';
import config from './config/';

import tvdb from './tvdb';

const app = express();

app.get('/', (req, res) => {

  res.send('Hello world');
});

app.listen(config.port, () => {
  console.log(`listening to port ${config.port}`);

  tvdb.search('game of thrones')
      .then(data => data.data[0].id)
      .then(tvdb.getDetail)
      .then(data => console.log(data));

  tvdb.search('sakamoto').then(data => console.log(data));
 
});

