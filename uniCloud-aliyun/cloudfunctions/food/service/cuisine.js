const {
	Service
} = require('uni-cloud-router')
const uniID = require('uni-id')
module.exports = class MenuService extends Service {
	//新增菜品
	async add(data) {
		let response = {
			code: 200,
			msg: '新增菜品成功',
			data: null
		}
		let user = this.ctx.auth;
		console.log(user,888)
		let insertData = {
			merchant_id: '6127590c54df7700012bf43b', //所属商户id	
			merchant_name: '商家名称', //所属商户名称
			cuisine_name: "干煸腐竹", //菜品名称
			cuisine_intro: '使用干煸方法将腐竹烹干，很香', //菜品介绍
			cuisine_avatar: user.userInfo.avatar, //菜品头图
			cuisine_imgs: [user.userInfo.avatar,user.userInfo.avatar,user.userInfo.avatar], //菜品介绍图
			status:1,//上下架状态  1 上架 2 下架
			price: 16, //价格
			category: ['鲁菜','香辣'], //菜品类别
			like_count: 0, //喜欢人数
			collect_count: 0, //收藏人数
			eat_count: 0, //品尝人数
			comment_count: 0, //评论数
			create_uid: user.uid, //创建用户
			create_time: new Date().getTime(), //创建时间
			last_modify_uid: user.uid, //更新用户
			last_modify_time: new Date().getTime() //更新时间
		}
		insertData = Object.assign(insertData, data)
		try {
			let dbRes = await this.db.collection('food-cuisine').add(insertData)
			console.log(dbRes,8)
		} catch (e) {
			//TODO handle the exception
			response.msg = e.message
		}
		return response
	}
}
