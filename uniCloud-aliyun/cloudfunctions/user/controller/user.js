const {
	Controller
} = require('uni-cloud-router')
const {
	utils
} = require('uni-common')
module.exports = class UserController extends Controller {
	//登录
	loginOrRegister() {
		const {
			ctx,
			service
		} = this;
		return service.user.loginOrRegister(ctx.data)
	}
	//更新用户信息
	updateInfo() {
		const {
			ctx,
			service
		} = this;
		return service.user.updateInfo(ctx.data)
	}
	//获取用户信息
	getInfo() {
		const {
			ctx,
			service
		} = this;
		return service.user.getInfo(ctx.data)
	}
}
