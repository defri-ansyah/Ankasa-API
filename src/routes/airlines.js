const express = require('express');
const router = express.Router()
const {uploadMulter} = require('../middlewares/upload');
const 
{
  insertAirLines,
  getAllAirLines,
  search,
  updateAirLines,
  updateLogo,
  deleteAirLines,
  getById
} = require('../controllers/airlines')
router
  .get('/', getAllAirLines)
  .get('/get-by-id/:id', getById)
  .post('/search', search)
  .post('/insert-airlines', uploadMulter.single('logo'), insertAirLines)
  .patch('/update-airlines/:id', updateAirLines)
  .patch('/update-logo/:id', uploadMulter.single('logo'), updateLogo)
  .delete('/delete/:id', deleteAirLines)
module.exports = router