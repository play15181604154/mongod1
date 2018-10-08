const {Prover} = require("./model.js");

const ProverDao = {
	save(proverInfo) {
		proverInfo.time = new Date();
		return new Prover(proverInfo).save();
	},
	findByPage(page) {
		const pageSize = 5; // 每页显示记录数
		return Prover.find().limit(pageSize).skip((page - 1) * pageSize);
	},
	findAll(){
		return Prover.find();
	},
	findByName(name) {
		return Prover.find({"name" : name,});
	},
	reWrite({num, name, role, phone, address, call}) {
		return Prover.update({"num":num}, {$set:{"name":name,"role":role,"phone":phone,"address":address,"call":call}});
	},
	delByName(num) {
		return Prover.remove({"num" : num});
	},
	findByCount(page) {
		return Prover.find().count();
	}
};

module.exports = ProverDao;

// token