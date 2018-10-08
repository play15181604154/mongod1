/* 用户DAO数据访问 */
const {User} = require("./model.js");

const UserDao = {
	save(userinfo) { // 保存用户信息
		console.log(userinfo);
		return new User(userinfo).save();
	},
	findByPage(page) {
		const pageSize = 5; // 每页显示记录数
		return User.find().limit(pageSize).skip((page - 1) * pageSize);
	},
	findAll(){
		return User.find();
	},
	findByName(name) {
		return User.find({"username" : name});
	},
	reWrite({num, name, role, phone, address, call}) {
		return User.update({"regcode":num}, {$set:{"username":name,"sex":role,"sr":phone,"phone":address,"address":call}});
	},
	delByName(num) {
		return User.remove({"regcode" : num});
	},
	find(condition) { // 查找用户信息
		return User.find(condition);
	}
};

module.exports = UserDao;