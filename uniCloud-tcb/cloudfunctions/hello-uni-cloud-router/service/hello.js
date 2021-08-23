const {
	Service
} = require("uni-cloud-router")
module.exports = class HelloService extends Service {
	sayHello() {
		return {
			code:200,
			data: 'this is a uni-cloud-router test',
			msg:'测试成功'
		}
	}
}
