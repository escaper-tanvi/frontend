const express = require('express')
const router = express.Router()
const data = require('../logger.json')

const Product = require('../models/product')
const { writeInFile, readInFile } = require('../utils/logger')

//middlewares
const {authCheck} = require('../middlewares/auth')
//controllers
const {userCart, getUserCart, emptyCart, saveAddress,
    applyCouponToUserCart, createOrder, createCashOrder, orders,
    addToWishlist, wishlist, removeFromWishlist} = require('../controllers/user')


router.post('/user/cart', authCheck, userCart);
router.get('/user/cart', authCheck, getUserCart);
router.delete('/user/cart', authCheck, emptyCart);
router.post('/user/address', authCheck, saveAddress);
router.post('/user/order', authCheck, createOrder) //stripe
router.post('/user/cash-order', authCheck, createCashOrder) //COD
router.get('/user/orders', authCheck, orders)

//coupon
router.post('/user/cart/coupon', authCheck, applyCouponToUserCart)

//wishlist
router.post('/user/wishlist',authCheck, addToWishlist)
router.get('/user/wishlist', authCheck, wishlist)
router.put('/user/wishlist/:productId', authCheck, removeFromWishlist)
const dataofproduct = ''

router.post('/user/wishlist/createpaymentrequest', async(req, res) => {
    const {price} = req.body;
    writeInFile(price)
    res.json({msg: 'success'})
})
router.get('/user/wishlist/createpaymentrequest', async(req, res) => {
    console.log(data)
    res.json({msg: data})
})
module.exports = router;