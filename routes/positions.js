var express = require('express');
var PositionService = require("../services/position_service.js");
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
router.post("/publish", upload.single("logo"),  PositionService.publish);

// 查找
router.get("/find", PositionService.find);

// 修改

// 删除

module.exports = router;
