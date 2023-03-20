const { Emailverify } = require('../../utlits/EmailVerification');
const { signup, signin, allowesTo, protectedRoutes, userChangePassword, sendActivationCode, ResetPassword } = require('./user.auth');
const { createuser, getusers, getuser, updateuser, deleteuser, changepassword } = require('./user.service');

const router=require('express').Router()
// router.post("/",imgupload("image"),createbrand)

router.route("/").post(protectedRoutes,allowesTo('admin'),createuser).get(getusers);
router.route("/:id").get(getuser).put(protectedRoutes,allowesTo('admin','user'),updateuser).delete(protectedRoutes,allowesTo('admin','user'),deleteuser)

router.post("/signup",signup)
router.post("/signin",signin)
router.patch("/changepassword/:id",changepassword)
router.patch("/userChangePassword/:id",protectedRoutes,allowesTo('admin','user'),userChangePassword)
router.get("/Emailverify/:token",Emailverify)
router.post("/sendActivationCode",sendActivationCode)
router.patch("/ResetPassword",ResetPassword)
// .patch(updateimageuser)

module.exports=router