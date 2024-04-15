var express = require('express');
var router = express.Router();
var categoryModel = require('../schemas/category')
var ResHelper = require('../helper/ResponseHelper');

router.get('/', async function (req, res, next) {
  let categories = await categoryModel.find({}).exec();
  ResHelper.RenderRes(res, true, categories)
});

// router.get('/:id', async function (req, res, next) {
//   try {
//     let book = await bookModel.find({ _id: req.params.id }).exec();
//     ResHelper.RenderRes(res, true, book)
//   } catch (error) {
//     ResHelper.RenderRes(res, false, error)
//   }
// });

router.post('/', async function (req, res, next) {
  try {
    var newCategory = new categoryModel({
      name: req.body.name
    })
    await newCategory.save();
    ResHelper.RenderRes(res, true, newCategory)
  } catch (error) {
    ResHelper.RenderRes(res, false, error)
  }
});
// router.put('/:id', async function (req, res, next) {
//   try {
//     let book = await bookModel.findByIdAndUpdate
//       (req.params.id, req.body, {
//         new: true
//       }).exec()
//     ResHelper.RenderRes(res, true, book);
//   } catch (error) {
//     ResHelper.RenderRes(res, false, error)
//   }
// });


// router.delete('/:id', async function (req, res, next) {
//   try {
//     let book = await bookModel.findByIdAndUpdate
//       (req.params.id, {
//         isDeleted: true
//       }, {
//         new: true
//       }).exec()
//     ResHelper.RenderRes(res, true, book);
//   } catch (error) {
//     ResHelper.RenderRes(res, false, error)
//   }
// });

module.exports = router;
