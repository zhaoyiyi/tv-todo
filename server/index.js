import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import config from './config';
import routes from './routes';

mongoose.Promise = global.Promise;
mongoose.connect(config.db);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);

app.get('/', (req, res) => {
  res.send('Hello world');
});


app.listen(config.port, () => {
  console.log(`listening to port ${config.port}`);
});

