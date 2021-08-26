const {
	Controller
} = require("uni-cloud-router")
module.exports = class HelloController extends Controller {
	sayHello() {
		return this.service.hello.sayHello()
	}
}
