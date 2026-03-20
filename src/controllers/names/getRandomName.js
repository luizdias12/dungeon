const namesService = require('../../services/namesService');
const asyncHandler = require('../../middlewares/asyncHandler');
const { namesDTO } = require('../../dtos/namesDTO');

module.exports = asyncHandler(async (req, res) => {
  const { genderId, raceId } = req.params;
  const names = await namesService.getRandomName(genderId, raceId);

  res.json({
    success: true,
    data: namesDTO(names)
  });
});