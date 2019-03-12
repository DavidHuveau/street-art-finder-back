const express = require('express');
const ArtworkController = require('../controllers/artwork.controller');

const router = express.Router();

router
  .route('/')
  .get(ArtworkController.getAll)
  .post(ArtworkController.create)
router
  .route('/:id')
  .get(ArtworkController.getById)
  .put(ArtworkController.update)
  .delete(ArtworkController.delete)
router.route('/search')
  .get(ArtworkController.search)

module.exports = router;