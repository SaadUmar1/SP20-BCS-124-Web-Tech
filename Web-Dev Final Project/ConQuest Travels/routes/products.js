var express = require('express');
var router = express.Router();
var Product = require("../models/productmodel");
var checkSessionAuth = require("../middlewares/checkSessionAuth");
var auth = require("../middlewares/auth");
var admin = require("../middlewares/admin");
var multer = require('multer')


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname)
  }

})
var upload = multer({ storage: storage })


/* GET home page. */
router.get('/', async function(req, res, next) {
  let products = await Product.find();
  console.log(req.session.user);
  res.render('products/list',{title:"Products for Sale",products});
});


router.get('/add', async function(req, res, next) {
  res.render('products/add');
});


router.post('/add',upload.single('img'), async function (req, res, next) {
  let product = new Product({
    img:req.file.filename,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    region: req.body.region,
  });
  await product.save();
  res.redirect("/products");
});


router.get('/delete/:id', async function (req, res, next) {
  let product = await Product.findByIdAndDelete(req.params.id);
  res.redirect("/products");
});


router.get('/edit/:id', async function (req, res, next) {
  let product = await Product.findById(req.params.id);
  res.render("products/edit", { product });
});

router.post('/edit/:id', async function (req, res, next) {
  let product = await Product.findById(req.params.id);
  product.name = req.body.name;
  product.price = req.body.price;
  product.description = req.body.description;
  product.region = req.body.region;
  await product.save();
  res.redirect("/products");
});

router.get('/cart/:id', async function (req, res, next) {
  let product = await Product.findById(req.params.id);
  console.log("Added to bookmarks");
  let cart = [];
  if (req.cookies.Cart) cart = req.cookies.Cart;
  cart.push(product);
  //console.log(cart)
  res.cookie("Cart", cart);
  res.redirect("/products");
});

router.get('/cart/remove/:id', async function (req, res, next) {
  let cart = [];
  if (req.cookies.Cart) cart = req.cookies.Cart;
  cart.splice(
    cart.findIndex((c) => c._id == req.params.id),
    1
  );
  res.cookie("Cart", cart);
  res.redirect("/cart");
});


module.exports = router;
