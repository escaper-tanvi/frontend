const express = require('express')
const router = express.Router()
const data = require('../logger.json')

const Product = require('../models/product')
const { writeInFile, readInFile } = require('../utils/logger')
const { scrapLink } = require('../utils/scrapper')

//middlewares
const {authCheck} = require('../middlewares/auth')
//controllers
const {userCart, getUserCart, emptyCart, saveAddress,
    applyCouponToUserCart, createOrder, createCashOrder, orders,
    addToWishlist, wishlist, removeFromWishlist} = require('../controllers/user')

    const { CreateGroup, getGroup, joinGroup } = require('../controllers/groupController')


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
router.post('/user/wishlist/successcrypto', (req, res) => {
    const {url} = req.body;
    const gettingSomething = async(url) => {
        try {
            const data = await scrapLink(url)
            console.log(data)
            return data
        } catch (error) {
            console.log(error.message)
        }
    }
    gettingSomething(url)
    // console.log(html)
    res.json({msg: 'good'})
})

router.post("/product/:productId/Group",authCheck, CreateGroup)
router.get("/product/:productId/Group",authCheck, getGroup)
router.put("/product/:productId/JoinGroup",authCheck, joinGroup)


module.exports = router;