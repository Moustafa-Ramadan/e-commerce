const { imgupload } = require('../../utlits/uploadimg');
const { allowesTo, protectedRoutes } = require('../user/user.auth');
const { createbrand, getbrands, getbrand, deletebrand, updatebrand, updateimageBrand } = require('./brand.service');

const router=require('express').Router()
// router.post("/",imgupload("image"),createbrand)

router.route("/").post(protectedRoutes,allowesTo('admin'),imgupload("image","brand"),createbrand).get(getbrands);
router.route("/:id").get(getbrand).put(protectedRoutes,allowesTo('admin'),updatebrand).delete(protectedRoutes,allowesTo('admin'),deletebrand).patch(protectedRoutes,allowesTo('admin'),imgupload("image","brand"),updateimageBrand)

module.exports=router