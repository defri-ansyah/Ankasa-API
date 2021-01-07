
const pagination = async (limit, page, endpoint, totalData) => {
  const totalPage = Math.ceil(totalData / limit)
  const setPagination = {
    totalData: totalData,
    totalPage,
    currentPage: page,
    perPage: limit,
    prevPage: page > 1 ? `${process.env.BASE_URL}/api/${endpoint}?page=${parseInt(page) - 1}&limit=${limit}` : null,
    nextPage: page < totalPage ? `${process.env.BASE_URL}/api/${endpoint}?page=${parseInt(page) + 1}&limit=${limit}` : null,
  }
  return setPagination
}

module.exports= pagination