const {
	Controller
} = require('uni-cloud-router')
module.exports = class UserController extends Controller {
	//登录
	loginOrRegister(){
		const {ctx,service} = this;
		return service.user.loginOrRegister(ctx.data)
	}
	//更新微信用户信息
	updateByWeixin(){
		const {ctx,service} = this;
		return service.user.updateByWeixin(ctx.data)
	}
}
