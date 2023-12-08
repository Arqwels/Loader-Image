require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const imagesRouter = require('./routers/images-router');
const sequelize = require('./db');

const app = express();
const PORT = process.env.PORT_SERVER || 2000;

// Настройка multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(bodyParser.json());
app.use(upload.single('image'));
app.use('/image', imagesRouter);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`✅ Сервер запущен на порту - ${PORT}`);
    })
  } catch (error) {
    console.log(`⛔ Ошибка с подключение к БД - ${error}`);
  }
};

start();
