var express = require('express');
var router = express.Router();
var xuatChieuModel = require('../schemas/xuatChieu')
var moviesModel = require('../schemas/movies')
var ResHelper = require('../helper/ResponseHelper');

//Get all xuất chiếu of the Movie
router.get('/:id', async function (req, res, next) {
  const array = await xuatChieuModel.find({movieID: req.params.id}).exec();
  const xuatChieus = array.filter((e) => !e.isDeleted);
  ResHelper.RenderRes(res, true, xuatChieus)
});
router.get('/detail/:id', async function (req, res, next) {
  const xuatChieu = await xuatChieuModel.findOne({_id: req.params.id}).exec();
  // const xuatChieus = array.filter((e) => !e.isDeleted);
  ResHelper.RenderRes(res, true, xuatChieu)
});
//Get all xuất chiếu
router.get('/', async function (req, res, next) {
  const array = await xuatChieuModel.find().exec();
  const xuatChieus = array.filter((e) => !e.isDeleted);
  ResHelper.RenderRes(res, true, xuatChieus)
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
    if(moviesModel.findById(req.params.movieId)){
      var xuatChieu = new xuatChieuModel(req.body);
      await xuatChieu.save();
      ResHelper.RenderRes(res, true, xuatChieu)
    } else {
      console.log("first")
      ResHelper.RenderRes(res, false, "Khong ton tai phim")
    }
  } catch (error) {
    console.log(error)
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


router.delete('/:id', async function (req, res, next) {
  try {
    let xuatchieu = await xuatChieuModel.findByIdAndUpdate
      (req.params.id, {
        isDeleted: true
      }, {
        new: true
      }).exec()
    ResHelper.RenderRes(res, true, xuatchieu);
  } catch (error) {
    ResHelper.RenderRes(res, false, error)
  }
});

module.exports = router;
