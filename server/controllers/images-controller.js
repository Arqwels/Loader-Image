const e = require('express');
const imageModel = require('../models/image-model');
const imageService = require('../service/image-service');
const ErrorHandler = require('../utils/error-handler');

class imagesController {
  async loadImage(req, res) {
    try {
      const { originalname, buffer } = req.file;
      const { description, name } = req.body;
      // Проверка на Расширение файла
      await imageService.checkExtension(originalname);
      // Проверка на запрещающие символы в name
      await imageService.checkName(name);
      // Проверка на уже имеющиеся фото по name
      await imageService.existenceImage(name);
      await imageModel.create({ descriptionFile: description, nameFile: name, data: buffer });
      res.status(201).json({ status: 201, success: true, text: "Файл был успешно сохранён!" });
    } catch (error) {
      ErrorHandler(res, error);
    }
  };

  async sendImage(req, res) {
    try {
      const name = req.params.nameFile;
      const metaData = await imageService.searchImage(name);
      res.status(200).json({ status: 200, success: true, data: metaData });
    } catch (error) {
      ErrorHandler(res, error);
    }
  };
};

module.exports = new imagesController();