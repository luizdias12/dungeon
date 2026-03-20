const racesService = require('../../services/racesService');
const asyncHandler = require('../../middlewares/asyncHandler');
const { classesDTO } = require('../../dtos/racesDTO');

module.exports = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const races = await racesService.getById(id);

  res.json({
    success: true,
    data: racesDTO(races)
  });
});