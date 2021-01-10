
const pagination = async (limit, page,orderby,order, endpoint, totalData) => {
  const totalPage = Math.ceil(totalData / limit)
  const setPagination = {
    totalData: totalData,
    totalPage,
    currentPage: page,
    perPage: limit,
    prevPage: page > 1 ? `${process.env.BASE_URL}api/${endpoint}?page=${parseInt(page) - 1}&limit=${limit}&orderby=${orderby}&order=${order}` : null,
    nextPage: page < totalPage ? `${process.env.BASE_URL}api/${endpoint}?page=${parseInt(page) + 1}&limit=${limit}&orderby=${orderby}&order=${order}` : null,
  }
  return setPagination
}

module.exports= pagination