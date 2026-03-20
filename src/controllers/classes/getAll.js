const classesService = require('../../services/classesService');
const asyncHandler = require('../../middlewares/asyncHandler');
const { classesDTO } = require('../../dtos/classesDTO');

module.exports = asyncHandler(async (req, res) => {
  const classes = await classesService.getAll();

  res.json({
    success: true,
    data: classesDTO(classes)
  });
});