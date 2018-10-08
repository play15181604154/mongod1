const ZhangdanDao = require("../dao/zhangdan_dao.js");

const ZhangdanService={
	find(req,res,next){
		const {page,pageCount}=req.body;
		console.log(typeof(page));
		console.log(typeof(pageCount));
		ZhangdanDao.find({page,pageCount})
					.then((data)=>{
						console.log(data);
						res.json({res_code:1,res_err:"",res_body:{data}});
					})
					.catch((err)=>{
						console.log(err);
						res.json({code:err});
					})
	},
	add(req,res,next){
		const {no,name,danwei,count,salary,gongyingshang,fukuan}=req.body;
		console.log(name);
		ZhangdanDao.save({no,name,danwei,count,salary,gongyingshang,fukuan})
					.then((data)=>{
						// console.log(1);
						// console.log(data);
						res.json({res_code:1,res_err:"",res_body:{data}});
					})
					.catch((err)=>{
						res.json({code:err});
					})
	},
	findAll(req,res,next){
		ZhangdanDao.findAll()
					.then((data)=>{
						// console.log(data);
						res.json({res_code:1,res_err:"",res_body:{data}});
					})
					.catch((err)=>{
						console.log(err);
						res.json({res_code:0,res_err:err,res_body:{}});
					})
	},
	query(req,res,next){
		const {name,gongyingshang,fukuan}=req.body;
		console.log(name);
		ZhangdanDao.query({name,gongyingshang,fukuan})
					.then((data)=>{
						console.log(data);
						res.json({res_code:1,res_err:"",res_body:{data}});
					})
					.catch((err)=>{
						console.log(err);
						res.json({res_code:0,res_err:err,res_body:{}});
					})
	},
	update(req,res,next){
		const {no,name,danwei,count,salary,gongyingshang,fukuan}=req.body;
		console.log(no);
		ZhangdanDao.update({no,name,danwei,count,salary,gongyingshang,fukuan})
		          	.then((data)=>{
		          		console.log(data);
		          		res.json({res_code:1,res_err:"",res_body:{data}});
		          	})
		          	.catch((err)=>{
		          		console.log(err);
		          		res.json({res_code:0,res_err:err,res_body:{}});
		          	})
	},
	delete(req,res,next){
		const {no}=req.body;
		ZhangdanDao.delete({no})
					.then((data)=>{
						console.log(data);
						res.json({res_code:1,res_err:"",res_body:{data}})
					})
					.catch((err)=>{
						console.log(err);
						res.json({res_code:0,res_err:err,res_body:{}})
					})
	}
}
module.exports=ZhangdanService;