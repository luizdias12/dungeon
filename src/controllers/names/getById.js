const namesService = require('../../services/namesService');
const asyncHandler = require('../../middlewares/asyncHandler');
const { namesDTO } = require('../../dtos/namesDTO');

module.exports = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const names = await namesService.getById(id);

  res.json({
    success: true,
    data: namesDTO(names)
  });
});