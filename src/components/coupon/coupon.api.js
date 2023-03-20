
const { allowesTo, protectedRoutes } = require('../user/user.auth');
const { getcoupons, getcoupon, addcoupon, updatecoupon, deletecoupon } = require('./coupon.service');

const router=require('express').Router()
// router.post("/",imgupload("image"),createbrand)

router.route("/").post(protectedRoutes,allowesTo('admin'),addcoupon).get(getcoupons);
router.route("/:id").get(getcoupon).put(protectedRoutes,allowesTo('admin'),updatecoupon).delete(protectedRoutes,allowesTo('admin'),deletecoupon)

module.exports=router