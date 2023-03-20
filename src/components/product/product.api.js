const express = require('express');
const {  imagesMixsUpload } = require('../../utlits/uploadimg');
const { protectedRoutes, allowesTo } = require('../user/user.auth');
    const { getproducts, createproduct, getproduct, updateproduct, deleteproduct } = require('./product.service');

const app = express()
const router=require('express').Router()

let fields=[{name:"imageCover", maxCount:1},{name:"images", maxCount:3},]
// router.use("/:categoryId/subcategories",subcategoriesApi)
router.route("/").post(protectedRoutes,allowesTo('admin'),imagesMixsUpload(fields,"product"),createproduct).get(getproducts);
router.route("/:id").get(getproduct).put(protectedRoutes,allowesTo('admin'),imagesMixsUpload(fields,"product"),updateproduct).delete(protectedRoutes,allowesTo('admin'),deleteproduct)


module.exports=router