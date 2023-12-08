const imageModel = require('../models/image-model');

class imagesController {
  async loadImage(req, res) {
    try {
      const { originalname, buffer } = req.file;
      const { description } = req.body;

      const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif'];
      const fileExtension = originalname.substring(originalname.lastIndexOf('.')).toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        return res.status(400).json({status: 400, success: false, error: "Ошибка в расширении файла!", hint: "Разрешённые расширение: png, jpg, jpeg и gif"});
      };

      await imageModel.create({ descriptionFile: description, nameFile: originalname, data: buffer});
      res.status(201).json({status: 201, success: true, text: "Файл был успешно сохранён!"});
    } catch (error) {
      console.error(error);
      res.status(500).json({status: 500, success: false, errors: error})
    }
  };

  async sendImage(req, res) {

  };
};

module.exports = new imagesController();