var express = require('express');
var ZhangdanService = require("../services/zhangdan_service.js");
var router = express.Router();

// 注销
router.post("/find", ZhangdanService.find);
router.post("/add", ZhangdanService.add);
router.post("/findAll", ZhangdanService.findAll);
router.post("/query", ZhangdanService.query);
router.post("/update", ZhangdanService.update);
router.post("/delete", ZhangdanService.delete);
module.exports = router;
