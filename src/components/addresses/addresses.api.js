
const { allowesTo, protectedRoutes } = require('../user/user.auth');
const { addToaddresses, getAlladdressess, removeToaddresses } = require('./addresses.service');

const router=require('express').Router()
router.route("/").patch(protectedRoutes,allowesTo('user'),addToaddresses).
get(protectedRoutes,allowesTo('user'),getAlladdressess).
delete(protectedRoutes,allowesTo('user'),removeToaddresses)

module.exports=router