
const { allowesTo, protectedRoutes } = require('../user/user.auth');
const { addReview, getReviews, updateReview, getReview, deletereview } = require('./reviews.service');

const router=require('express').Router()
// router.post("/",imgupload("image"),createbrand)

router.route("/").post(protectedRoutes,allowesTo('user'),addReview).get(getReviews);
router.route("/:id").get(getReview).put(protectedRoutes,allowesTo('user'),updateReview).delete(protectedRoutes,allowesTo('admin','user'),deletereview)

module.exports=router