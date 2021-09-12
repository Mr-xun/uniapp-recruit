/**
 * Created by Mr-Xun on 2021-09-06
 * 工作职位分类
 **/
const {
	Controller
} = require('uni-cloud-router')
module.exports = class PostController extends Controller {
	//同步职位分类
	asyncData() {
		const {
			ctx,
			service
		} = this;
		return service.basic.post.asyncData(ctx.data)
	}
	//获取职业分类tree结构
	tree(){
		const {
			service
		} = this;
		return service.basic.post.tree()
	}
}
