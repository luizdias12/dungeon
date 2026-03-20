function buildPaginationMeta(total, pagination) {
  const lastPage = pagination.limit > 0
    ? Math.ceil(total / pagination.limit)
    : 0;

  return {
    total,
    page: pagination.page,
    limit: pagination.limit,
    lastPage,
    hasNextPage: pagination.page < lastPage,
    hasPrevPage: pagination.page > 1
  };
}

module.exports = {
  buildPaginationMeta
};