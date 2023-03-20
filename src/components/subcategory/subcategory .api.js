const { protectedRoutes, allowesTo } = require('../user/user.auth');
const { createSubCategory, getSubCategories, getSubCategory, updateSubCategory, deleteSubCategory, SubCategories } = require('./subcategory .service');

const router=require('express').Router({mergeParams:true})

router.route("/").post(protectedRoutes,allowesTo('admin'),createSubCategory).get(getSubCategories);
router.route("/:id").get(getSubCategory).put(protectedRoutes,allowesTo('admin'),updateSubCategory).delete(protectedRoutes,allowesTo('admin'),deleteSubCategory)
// router.get("/",SubCategories)

module.exports=router