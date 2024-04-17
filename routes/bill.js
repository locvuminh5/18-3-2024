var express = require('express');
var router = express.Router();
var billModel = require('../schemas/bill')
var xuatChieuModel = require('../schemas/xuatChieu')
var movieModel = require('../schemas/movies')
var ResHelper = require('../helper/ResponseHelper');
const { query } = require('express');

router.get('/', async function (req, res, next) {
  // console.log(req.query);
  let exclude = ["sort", "page", "limit"];
  // let stringArray = ["author", "name"];
  // let numberArray = ["year"]
  let queries = {};
  // for (const [key, value] of Object.entries(req.query)) {
  //   if (!exclude.includes(key)) {
  //     if (stringArray.includes(key)) {
  //       queries[key] = new RegExp(value.replace(',', "|"), 'i');
  //     }
  //     if (numberArray.includes(key)) {
  //       console.log();
  //       var rex = new RegExp('lte"|gte"|lt"|gt"', 'i');
  //       var string = JSON.stringify(req.query[key]);
  //       let index = string.search(rex);
  //       if (index > -1) {
  //         var newvalue = string.slice(0, index) + '$' + string.slice(index);
  //         queries[key] = JSON.parse(newvalue);
  //       }else{
  //         queries[key]= value
  //       }

  //     }

  //   }
  // }
  // let limit = req.query.limit ? req.query.limit : 5;
  // let page = req.query.page ? req.query.page : 1;
  // let sortQuery = {};
  // if (req.query.sort) {
  //   if (req.query.sort.startsWith('-')) {
  //     let field = req.query.sort.substring(1, req.query.sort.length);
  //     sortQuery[field] = -1;
  //   } else {
  //     sortQuery[req.query.sort] = 1;
  //   }
  // }
  let array = await billModel.find().populate('userId').populate({
    path: 'xuatChieuId',
    populate: {
      path: 'movieID',
    }
  });
  let bills = array.filter((e) => !e.isDeleted);
  // .lean()
  // .limit(limit)
  // .skip((page - 1) * limit)
  // .sort(sortQuery)
  // .exec();
  ResHelper.RenderRes(res, true, bills)
});

//Get bills of a user
router.get('/:id', async function (req, res, next) {
  try {
    let bills = await billModel.find({userId: req.params.id}).populate({
      path: 'xuatChieuId',
      populate: {
        path: 'movieID',
      }
    }).exec();
    ResHelper.RenderRes(res, true, bills)
  } catch (error) {
    ResHelper.RenderRes(res, false, error)
  }
});

//Thêm 1 vé
router.post('/', async function (req, res, next) {
  try {
    // console.log(req.body.length);
    const xuatChieu = await xuatChieuModel.findById(req.body.xuatChieuId).exec();
    // let xuatChieu = await xuatChieuModel.findByIdAndUpdate
    //   (req.params.xuatChieuId, { $set: { seat: req.params.seat } }, {
    //     new: true
    //   }).exec()

    if (xuatChieu) {
      xuatChieu.seat -= req.body.seat;
      await xuatChieu.save();
      // console.log(xuatChieu)
      const bill = new billModel(req.body);
      await bill.save();

      ResHelper.RenderRes(res, true, bill)
    } else {
      ResHelper.RenderRes(res, false, "khong co xuat chieu");
    }
  } catch (error) {
    ResHelper.RenderRes(res, false, error)
    console.log(error)
  }
});


router.put('/:id', async function (req, res, next) {
  try {
    let movie = await moviesModel.findByIdAndUpdate
      (req.params.id, req.body, {
        new: true
      }).exec()
    ResHelper.RenderRes(res, true, movie);
  } catch (error) {
    ResHelper.RenderRes(res, false, error)
  }
});


router.delete('/:id', async function (req, res, next) {
  try {
    let movie = await moviesModel.findByIdAndUpdate
      (req.params.id, {
        isDeleted: true
      }, {
        new: true
      }).exec()
    ResHelper.RenderRes(res, true, movie);
  } catch (error) {
    ResHelper.RenderRes(res, false, error)
  }
});

module.exports = router;
