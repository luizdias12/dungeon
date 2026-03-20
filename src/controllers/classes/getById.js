const classesService = require('../../services/classesService');
const asyncHandler = require('../../middlewares/asyncHandler');
const { classesDTO } = require('../../dtos/classesDTO');

module.exports = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const classes = await classesService.getById(id);

  res.json({
    success: true,
    data: classesDTO(classes)
  });
});