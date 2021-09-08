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
module.exports = class SchoolController extends Controller {
	//同步院校
	asyncAllSchool() {
		const {
			ctx,
			service
		} = this;
		return service.basic.school.asyncAllSchool(ctx.data)
	}
	//同步高校院校
	asyncUniversitySchool() {
		const {
			ctx,
			service
		} = this;
		return service.basic.school.asyncUniversitySchool(ctx.data)
	}
	//同步同步中小学幼儿园院校
	asyncPrimarySchool() {
		const {
			ctx,
			service
		} = this;
		return service.basic.school.asyncPrimarySchool(ctx.data)
	}
	//抓取高考网大学数据
	grapGaoKaoSchool(){
		const {
			service
		} = this;
		return service.basic.school.grapGaoKaoSchool()
	}
	//处理院校信息
	dealData() {
		const {
			service
		} = this;
		return service.basic.school.dealData()
	}
	//获取当前中小学数量
	middleSchoolCount() {
		const {
			service
		} = this;
		return service.basic.school.middleSchoolCount()
	}
	//获取毕业院校列表
	graduateList(){
		const {
			ctx,
			service
		} = this;
		return service.basic.school.graduateList(ctx.data)
	}
}
