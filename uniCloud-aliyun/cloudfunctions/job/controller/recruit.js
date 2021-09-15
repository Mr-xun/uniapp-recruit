/**
 * Created by Mr-Xun on 2021-08-30
 * 招聘相关
 **/
const {
	Controller
} = require('uni-cloud-router')
module.exports = class RecruitController extends Controller {
	//发布
	publish() {
		const {
			ctx,
			service
		} = this;
		return service.recruit.publish(ctx.data)
	}
	//我的发布列表
	myList() {
		const {
			ctx,
			service
		} = this;
		return service.recruit.myList(ctx.data)
	}
	//全部发布列表
	list() {
		const {
			ctx,
			service
		} = this;
		return service.recruit.list(ctx.data)
	}
}
