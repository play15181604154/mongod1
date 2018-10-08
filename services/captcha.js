// 验证码相关业务处理
const svgCaptcha = require("svg-captcha");

const Captcha = {
	// 生成验证码
	genCaptcha(req, res, next) {
		// 创建验证码对象
		var captcha = svgCaptcha.create({
			size : 4,
			noise : 1,
			color : true
		}); // 创建 svgCaptcha 对象实例
		// var captcha = svgCaptcha.createMathExpr();
	    req.session.captcha = captcha.text; // 在 session 中缓存生成的验证码文本字符串
	    // console.log(req.session);
	    // res.type('svg');
	    // res.status(200).send(captcha.data); // svg 图像资源
	    res.json({res_code:1, res_error:"", res_body: {data: captcha.data}});
	},
	// 校验验证码
	verifyCaptcha(req, res, next) {
		// 从请求中获取前端传递的验证码
		const {captcha} = req.query;
		// 和 session 中保存的比较
		if (captcha.toUpperCase() === req.session.captcha.toUpperCase()) { // 通过
			res.json({res_code:1, res_error:"", res_body: {valid: true}});
		} else {
			res.json({res_code:1, res_error:"", res_body: {valid: false}});
		}
	}
};

module.exports = Captcha;