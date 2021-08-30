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
	list() {
		const {
			ctx,
			service
		} = this;
		return service.recruit.list(ctx.data)
	}
}
