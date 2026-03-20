const racesService = require('../../services/racesService');
const asyncHandler = require('../../middlewares/asyncHandler');
const { racesDTO } = require('../../dtos/racesDTO');

module.exports = asyncHandler(async (req, res) => {
  const races = await racesService.getAll();

  res.json({
    success: true,
    data: racesDTO(races)
  });
});