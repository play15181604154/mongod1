/* 用户业务逻辑处理 */
const UserDao = require("../dao/user_dao.js");
const bcrypt = require("bcrypt");

const UserService = {
	// 注册
	register(req, res, next) {
		// 获取用户注册的信息：POST请求中的数据
		const {regcode, username, password, sex, sr, phone, address} = req.body;
		// const {username, password, email} = req.query;
		// const username = req.body.username, password = req.body.password;
		// console.log({username, password, email});
		// 密码加密
		const hash = bcrypt.hashSync(password, 10);
		console.log(password);
		console.log(hash);
		// 保存到数据库中
		UserDao.save({regcode, username, password: hash, sex, sr, phone, address})
					.then((data)=>{ // 保存成功
						console.log(data);
						// 将用户信息保存到 session 中
						req.session.loginUser = data;
						res.json({res_code:1, res_error: "", res_body: {data: {regcode, username, sex, sr, phone, address}}});
					})
					.catch((err)=>{
						console.log("failed")
						res.json({res_code: 0, res_error: err, res_body: {}});
					});
		// {username, password} <==> {username: username, password: password}
		// {xx : function() {}} <==> {xx(){}}
	},
	// 登录
	login(req, res, next) {
		// 获取post请求中传递的登录用户名与密码
		const {username, password} = req.body;
		// 从数据库中查询出用户名对应的用户信息
		UserDao.find({username})
					  .then((data)=>{
					  	// data 是一个数组，存放了所在查找到的满足条件的数据
					  	if (data.length === 1) {
					  		// 用户信息
					  		const user = data[0];
					  		// 比较从请求中获取到用户的密码与实际保存的密码是否匹配
					  		const b = bcrypt.compareSync(password, user.password);
					  		if (b) { // 登录成功
					  			// 将用户信息保存到 session 中
					  			req.session.loginUser = user;
					  			res.json({res_code:1, res_error:"", res_body:{data:{username: user.username, email: user.email, level: user.level, reg_time: user.reg_time}}});
					  		} else {
					  			res.json({res_code:0, res_error:"", res_body:{}});
					  		}
					  	} else {
					  		res.json({res_code:0, res_error:"", res_body:{}});
					  	}
					  })
					  .catch((err)=>{
					  	res.json({res_code:-1, res_error:err, res_body:{}});
					  });
	},
	// 注销
	logout(req, res, next) {
		req.session.loginUser = null;
		res.json({res_code:1});
	},
	// 查询职位信息
	find(req, res, next) {
		// 获取查询的页码
		const {page} = req.query;
		// 查询
		UserDao.findByPage(page)
							.then((data)=>{
								res.json({res_code:1, res_error:"", res_body:{data}});
							})
							.catch((err)=>{
								res.json({res_code:1, res_error:err, res_body:{}});
							});
	},
	findAll(req,res,next){
		UserDao.findAll()
					.then((data)=>{
						// console.log(data);
						res.json({res_code:1,res_err:"",res_body:{data}});
					})
					.catch((err)=>{
						console.log(err);
						res.json({res_code:0,res_err:err,res_body:{}});
					})
	},
	findOne(req, res, next) {
		// 获取查询的名字
		const {name} = req.query;
		// 查询
		//console.log(name);
		UserDao.findByName(name)
							.then((data)=>{
								console.log(data);
								res.json({res_code:1, res_error:"", res_body:{data}});
							})
							.catch((err)=>{
								res.json({res_code:1, res_error:err, res_body:{}});
							});
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
		UserDao.reWrite({num, name, role, phone, address, call})
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
		UserDao.delByName(num)
							.then((data)=>{
								res.json({res_code:1, res_error:"", res_body:{data}});
							})
							.catch((err)=>{
								res.json({res_code:1, res_error:err, res_body:{}});
							});
	},
};

module.exports = UserService;