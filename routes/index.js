var express = require('express');
var router = express.Router();

/* GET home page. */
// router.use('/books',require('./books'));
// router.use('/authors',require('./authors'));
router.use('/movies',require('./movies'));
router.use('/users',require('./users'));
router.use('/auth',require('./auth'));
router.use('/category',require('./category'));
router.use('/xuatChieu',require('./xuatChieu'));
router.use('/bill',require('./bill'));
module.exports = router;
