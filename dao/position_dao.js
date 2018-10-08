const {Position} = require("./model.js");

const PositionDao = {
	save(positionInfo) {
		positionInfo.publish_time = new Date();
		return new Position(positionInfo).save();
	},
	findByPage(page) {
		const pageSize = 10; // 每页显示记录数
		return Position.find().limit(pageSize).skip((page - 1) * pageSize);
	}

	// Position.find().count()
};

module.exports = PositionDao;

// token