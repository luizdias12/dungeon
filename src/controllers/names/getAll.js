const namesService = require('../../services/namesService');
const asyncHandler = require('../../middlewares/asyncHandler');
const { namesDTO } = require('../../dtos/namesDTO');
const PaginationDTO = require('../../dtos/paginationDTO');

module.exports = asyncHandler(async (req, res) => {
  const pagination = new PaginationDTO(req.query);

  const { data, meta } = await namesService.getAll(pagination);

  res.json({
    success: true,
    data: namesDTO(data),
    meta
  });
});