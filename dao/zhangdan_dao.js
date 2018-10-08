
const {Zhangdan} = require("./model.js");

const ZhangdanDao={
	find(obj){
		pageCount=Number(obj.pageCount);
		// console.log(1);
		return Zhangdan.find().limit(pageCount).skip((obj.page-1)*pageCount);
	},
	save(zhangdaninfo){
		zhangdaninfo.create_time=new Date();
		return new Zhangdan(zhangdaninfo).save();
	},
	findAll(){
		return Zhangdan.find();
	},
	query(obj){
		return Zhangdan.find(obj);
	},
	update(obj){
		console.log(obj.no);
		return Zhangdan.findOneAndUpdate({"no":obj.no},{$set:obj});
	},
	delete(obj){
		console.log(obj);
		return Zhangdan.remove(obj);
	}
}
module.exports=ZhangdanDao;