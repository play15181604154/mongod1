const ProverDao = require("../dao/prover_dao.js");

const ProverService = {
	// 发布职位信息
	publish(req, res, next) {
		// 获取请求中传递的职位数据
		const {num, name, role, phone, address, call, time} = req.query;
		// 保存到数据库中
		ProverDao.save({num, name, role, phone, address, call, time})
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
		ProverDao.findByPage(page)
							.then((data)=>{
								res.json({res_code:1, res_error:"", res_body:{data}});
							})
							.catch((err)=>{
								res.json({res_code:1, res_error:err, res_body:{}});
							});
	},
	findOne(req, res, next) {
		// 获取查询的名字
		const {name} = req.query;
		// 查询
		ProverDao.findByName(name)
							.then((data)=>{
								res.json({res_code:1, res_error:"", res_body:{data}});
							})
							.catch((err)=>{
								res.json({res_code:1, res_error:err, res_body:{}});
							});
	},
	findAll(req,res,next){
		ProverDao.findAll()
					.then((data)=>{
						// console.log(data);
						res.json({res_code:1,res_err:"",res_body:{data}});
					})
					.catch((err)=>{
						console.log(err);
						res.json({res_code:0,res_err:err,res_body:{}});
					})
	},
	reWrite(req, res, next) {
		//获取要修改的数据
		const {num, name, role, phone, address, call} = req.query;
		//name = $("#XGModal").val();
		// 保存到数据库中
		console.log(1);
		console.log(num);
		console.log(name);
		console.log(req.query);
		ProverDao.reWrite({num, name, role, phone, address, call})
							.then((data)=>{
								//console.log(data);
								res.json({res_code: 1, res_error: "", res_body: {data}});
							})
							.catch((err)=>{
								console.log(1);
								res.json({res_code: 0, res_error: err, res_body: {}});
							});
	},
	del(req, res, next) {
		// 获取查询的名字
		const {num} = req.query;
		// 查询
		console.log(num);
		ProverDao.delByName(num)
							.then((data)=>{
								res.json({res_code:1, res_error:"", res_body:{data}});
							})
							.catch((err)=>{
								res.json({res_code:1, res_error:err, res_body:{}});
							});
	},
}

module.exports = ProverService;