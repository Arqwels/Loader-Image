const imageModel = require('../models/image-model');
const ApiError = require('../error/api-error');

class imageService {
  async checkExtension(orignNameFile) {
    const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif'];
    const fileExtension = orignNameFile.substring(orignNameFile.lastIndexOf('.')).toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      throw ApiError.BadRequest("Ошибка в расширении файла! Разрешённые расширение: png, jpg, jpeg и gif.");
    };
  };

  async checkName(nameFile) {
    const banSymbols = ['#', '%', '&', '?', '@', ' '];
    const containsBanSymbol = banSymbols.some(symbol => nameFile.includes(symbol));
    if(containsBanSymbol) {
      throw ApiError.BadRequest("Имя файла содержит запрещенные символы.");
    };
  };

  async existenceImage(nameFile) {
    const existingImage = await imageModel.findOne({where: { nameFile: nameFile }});
    if (existingImage) {
      throw ApiError.BadRequest("Имя файла уже существует! Выберите другое имя файла.");
    };
  };

  async searchImage(name) {
    const image = await imageModel.findOne({where: { nameFile: name }});
    if (!image) {
      throw ApiError.BadRequest("Фото не найдено!");
    };
    return {
      name: image.nameFile,
      description: image.descriptionFile,
      image: image.data
    };
  };
};

module.exports = new imageService();