var express = require('express');
var Captcha = require("../services/captcha.js");
var router = express.Router();

// 生成验证码
router.get("/api/captcha", Captcha.genCaptcha);
// 校验验证码
router.get("/api/verify_captcha", Captcha.verifyCaptcha);

module.exports = router;
