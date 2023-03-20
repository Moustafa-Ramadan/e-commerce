
const { allowesTo, protectedRoutes } = require('../user/user.auth');
const { addcart, deletecart, updatequantity, applyCoupon, getUserCart } = require('./cart.service');

const router=require('express').Router()
router.route("/").post(protectedRoutes,allowesTo('user'),addcart).
delete(protectedRoutes,allowesTo('user'),deletecart).
put(protectedRoutes,allowesTo('user'),updatequantity).
get(protectedRoutes,allowesTo('user'),getUserCart)
router.post("/applyCoupon",protectedRoutes,allowesTo('user'),applyCoupon)



module.exports=router