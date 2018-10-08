var express = require('express');
var ProverService = require("../services/prover_service.js");
var path = require("path");
var multer = require("multer"); // 引入multer，文件上传
var router = express.Router();

// 配置磁盘存储
var storage = multer.diskStorage({
  // 存储在服务器上的目标文件夹
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/imgs/upload"));
  },
  // 命名规则
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + file.originalname.slice(file.originalname.lastIndexOf(".")))
  }
})
// multer 实例
var upload = multer({ storage: storage })

// 发布
//router.post("/publish", ProverService.publish);
router.get("/publish", ProverService.publish)
// 查找
router.get("/find", ProverService.find);
router.get("/findOne", ProverService.findOne);
router.post("/findAll", ProverService.findAll);
// 修改
router.get("/reWrite", ProverService.reWrite);
// 删除
router.get("/del", ProverService.del);

module.exports = router;
