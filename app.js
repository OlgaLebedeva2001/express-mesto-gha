const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const routes = require('./routes/router'); // импортируем роутер

const { PORT = 3000 } = process.env;
const app = express();
app.use(helmet());
app.disable('x-powered-by');
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '649b11d33354cf47eb588b8a' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use(routes);
mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log('БД подключена');
  })
  .catch(() => {
    console.log('Не удалось подключиться к БД');
  });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
})
