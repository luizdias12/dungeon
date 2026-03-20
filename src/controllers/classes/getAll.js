const classesService = require('../../services/classesService');
const asyncHandler = require('../../middlewares/asyncHandler');
const { classesDTO } = require('../../dtos/classesDTO');
const PaginationDTO = require('../../dtos/paginationDTO');

module.exports = asyncHandler(async (req, res) => {
  const pagination = new PaginationDTO(req.query);

  const { data, meta } = await classesService.getAll(pagination);

  res.json({
    success: true,
    data: classesDTO(data),
    meta
  });
});