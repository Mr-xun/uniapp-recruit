const {
	Service
} = require('uni-cloud-router')
const uniID = require("uni-id")
const {
	utils
} = require('uni-common')
module.exports = class MerchantService extends Service {
	//新增商户
	async add(data) {
		let user = this.ctx.auth
		let response = {
			code: 200,
			msg: '新增成功',
			data: data
		}
		//插入数据
		let insertData = {
			merchant_name: '商户名称', //商户名称
			merchant_type: 1, //商户分类（1:商铺 2:路边摊）
			merchant_intro: '商户介绍', //商户介绍
			merchant_tag: ['炸串',
				"烧烤"
			], //商户标签
			merchant_avatar: 'https: //thirdwx.qlogo.cn/mmopen/vi_32/F6mETeF99t4eu02SVJu4ZR04uFFn669P7jPmTaPuAxsiaX0vWY9tYNbEKycze2E15ynSo3kjyL2JGu8gSI3qT6A/132', //商户头图
			merchant_mobile:'',//联系电话
			country: '', //所在国家
			province: '', //所在省份
			city: '', //所在城市
			district: "", //所在市区
			address: '', //详细地址
			geo_location: {}, //地址位置
			status:1,//状态  1 营业 2 停业
			like_count: 0, //喜欢人数
			collect_count: 0, //收藏人数
			visit_count: 0, //访问人数
			comment_count: 0, //评论数
			open_time_start: new Date().getTime(), //开放开始时间
			open_time_end: new Date().getTime() + 1000 * 60 * 60 * 8, //开放结束时间
			create_uid: user.uid, //创建用户
			create_time: new Date().getTime(), //创建时间
			last_modify_uid: user.uid, //更新用户
			last_modify_time: new Date().getTime() //更新时间
		}
		insertData = Object.assign(insertData, data)
		insertData.geo_location = new this.db.Geo.Point(data.geo_location.longitude, data.geo_location.latitude)
		let dbRes = await this.db.collection('food-merchant').add(insertData)
		return response
	}
}
