var express = require('express');
var UserService = require("../services/user_service.js");
var router = express.Router();

// 登录
router.post("/login", UserService.login);

// 注册
router.post("/register", UserService.register);

// 注销
router.get("/logout", UserService.logout);

// 查找
router.get("/find", UserService.find);
router.get("/findOne", UserService.findOne);
router.post("/findAll", UserService.findAll);
// 修改
router.get("/reWrite", UserService.reWrite);
// 删除
router.get("/del", UserService.del);

module.exports = router;
