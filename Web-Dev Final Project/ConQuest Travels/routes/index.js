var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/cart', function(req, res, next) {
  let cart = req.cookies.Cart;
  if (!cart) cart = [];
  console.log(cart);
  res.render('cart', { cart });
});

module.exports = router;
