// 引入 mongoose
const mongoose = require("mongoose");

// 连接 mongodb 数据库
mongoose.connect('mongodb://localhost/proj_1805');

// 创建用户Schema、职位Schema
const userSchema = new mongoose.Schema({
	//regcode,username, password, sex,sr,phone,address
	regcode : Number,
	username : String,
	password : String,
	sex : String,
	sr : String,
	phone : Number,
	address : String
});
const positionSchema = new mongoose.Schema({
	name : String,
	comapny : String,
	logo : String,
	salary : Number,
	address : String,
	publish_time: Date
});
const proverSchema = new mongoose.Schema({
	num : Number,
	name : String,
	role : String,
	phone : Number,
	address : String,
	call : Number,
	time: Date
});
const zhangdanSchema = new mongoose.Schema({
	no : Number,
	name : String,
	danwei : String,
	gongyingshang: String,
	count : Number,
	salary : Number,
	fukuan : String,
	create_time: Date
});

// 根据用户Schema创建用户模型
const User = mongoose.model("user", userSchema);
// 根据职位Schema创建职位模型
const Position = mongoose.model("position", positionSchema);
//
const Prover = mongoose.model("prover", proverSchema);
//
const Zhangdan = mongoose.model("zhangdan", zhangdanSchema);

module.exports = {User, Position, Prover};