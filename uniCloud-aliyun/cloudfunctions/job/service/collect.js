/**
 * Created by Mr-Xun on 2021-09-17
 * 收藏相关
 **/
const {
	Service
} = require('uni-cloud-router')

module.exports = class CollectService extends Service {
	//收藏
	async add(data) {
		let response = {
			code: 0,
			data: null,
			msg: '收藏成功'
		}
		try {
			let user = this.ctx.auth;
			let insertData = {
				uid: user.uid, //用户uid
				type: data.type, //类型  1 职位  2 招聘着
				post_id: data.post_id, //职位id
				post_name: data.post_name, //职位名称
				create_time: new Date().getTime(), //收藏时间
			}
			await this.db.collection('job-recruit-collect').add(insertData)
		} catch (e) {
			//TODO handle the exception
			//TODO handle the exception
			response.code = -1;
			response.msg = '系统错误：' + e;
		}
		return response
	}
	//取消收藏
	cancle() {
		let response = {
			code: 0,
			data: null,
			msg: '取消收藏'
		}
		return response
	}
	//收藏列表
	async list() {
		let response = {
			code: 0,
			data: null,
			msg: '获取成功'
		}
		try {
			let user = this.ctx.auth;
			const dbCmd = this.db.command;
			const $ = this.db.command.aggregate
			let dbRes = await this.db.collection('job-recruit-collect').aggregate().match({
					uid: user.uid
				}).lookup({
					from: 'job-recruit',
					localField: 'post_id',
					foreignField: '_id',
					as: 'postList'
				}).replaceRoot({
					newRoot: $.mergeObjects([$.arrayElemAt(['$postList', 0]), '$$ROOT'])
				}).project({
					postList: 0
				})
				.end()
			if (dbRes.data && dbRes.data.length) {
				response.data = dbRes.data
			}
		} catch (e) {
			//TODO handle the exception
			//TODO handle the exception
			response.code = -1;
			response.msg = '系统错误：' + e;
		}
		return response
	}
}
