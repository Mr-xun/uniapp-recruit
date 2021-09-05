/**
 * Created by Mr-Xun on 2021-09-05
 * 所有院校
 * 幼儿园、小学、中学、职业学校、大学
 * 名称、省、市、区、详细地址、经纬度、类型
 * 已收集到的数据为405073
 **/
const {
	Controller
} = require('uni-cloud-router')
module.exports = class RecruitController extends Controller {
	//新增院校
	add() {
		const {
			ctx,
			service
		} = this;
		return service.school.add(ctx.data)
	}
}
