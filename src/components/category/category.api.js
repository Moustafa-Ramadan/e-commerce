const { createCategory, getCategories, getCategory, updateCategory, deleteCategory, updateimageCategory } = require('./category.service')
let subcategoriesApi=require("../subcategory/subcategory .api")
const express = require('express')
const { imgupload } = require('../../utlits/uploadimg');
const { protectedRoutes, allowesTo } = require('../user/user.auth');

const app = express()
const router=require('express').Router()

router.use("/:categoryId/subcategories",subcategoriesApi)
router.route("/").post(protectedRoutes,allowesTo('admin'),imgupload("image","category"), createCategory).get(getCategories);
router.route("/:id").get(getCategory).put(protectedRoutes,allowesTo('admin'),updateCategory).delete(protectedRoutes,allowesTo('admin'),deleteCategory).patch(protectedRoutes,allowesTo('admin'),imgupload("image","category"),updateimageCategory)


module.exports=router