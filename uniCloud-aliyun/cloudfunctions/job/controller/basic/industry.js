/**
 * Created by Mr-Xun on 2021-09-23
 * 行业分类
 **/
const {
	Controller
} = require('uni-cloud-router')
module.exports = class IndustryController extends Controller {
	//同步行业分类
	asyncData() {
		const {
			ctx,
			service
		} = this;
		return service.basic.industry.asyncData(ctx.data)
	}
	//获取行业分类tree结构
	tree(){
		const {
			service
		} = this;
		return service.basic.industry.tree()
	}
}
