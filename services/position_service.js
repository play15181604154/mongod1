const PositionDao = require("../dao/position_dao.js");

const PositionService = {
	// 发布职位信息
	publish(req, res, next) {
		// 获取请求中传递的职位数据
		const {name, company, address, salary} = req.body;
		let logo = "/imgs/upload/" + req.file.filename; // 获取上传文件LOGO路径
		// const {name, company, address, salary} = req.query;
		// 保存到数据库中
		PositionDao.save({name, company, address, salary, logo})
							.then((data)=>{
								res.json({res_code: 1, res_error: "", res_body: {data}});
							})
							.catch((err)=>{
								res.json({res_code: 0, res_error: err, res_body: {}});
							});
	},
	// 查询职位信息
	find(req, res, next) {
		// 获取查询的页码
		const {page} = req.query;
		// 查询
		PositionDao.findByPage(page)
							.then((data)=>{
								res.json({res_code:1, res_error:"", res_body:{data}});
							})
							.catch((err)=>{
								res.json({res_code:1, res_error:err, res_body:{}});
							});
	}
}

module.exports = PositionService;