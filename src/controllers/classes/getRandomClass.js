const classesService = require('../../services/classesService');
const asyncHandler = require('../../middlewares/asyncHandler');
const { classesDTO } = require('../../dtos/classesDTO');

module.exports = asyncHandler(async (req, res) => {
  const classe = await classesService.getRandomClass();

  res.json({
    success: true,
    data: classesDTO(classe)
  });
});