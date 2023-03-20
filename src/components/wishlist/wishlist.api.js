
const { allowesTo, protectedRoutes } = require('../user/user.auth');
const { addToWishlist, getAllWishlists, removeToWishlist } = require('./wishlist.service');

const router=require('express').Router()
router.route("/").patch(protectedRoutes,allowesTo('user'),addToWishlist).
get(protectedRoutes,allowesTo('user'),getAllWishlists).
delete(protectedRoutes,allowesTo('user'),removeToWishlist)

module.exports=router