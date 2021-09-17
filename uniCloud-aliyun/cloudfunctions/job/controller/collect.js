/**
 * Created by Mr-Xun on 2021-09-17
 * 收藏
 **/
const {
	Controller
} = require('uni-cloud-router')
module.exports = class CollectController extends Controller {
	//收藏
	add() {
		const {
			ctx,
			service
		} = this;
		return service.collect.add(ctx.data)
	}
	//取消收藏
	cancle() {
		const {
			ctx,
			service
		} = this;
		return service.collect.cancle(ctx.data)
	}
	//收藏列表
	list() {
		const {
			ctx,
			service
		} = this;
		return service.collect.list(ctx.data)
	}
}
