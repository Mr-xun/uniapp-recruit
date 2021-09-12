/**
 * Created by Mr-Xun on 2021-09-06
 * 工作职位分类
 **/
const {
	Service
} = require('uni-cloud-router')
// const postClassificationData = require("../../assets/post-classification.json")
module.exports = class PostService extends Service {
	//同步职位分类
	async asyncData(data) {
		let response = {
			code: 200,
			data: null,
			msg: '同步职位成功',
		}
		let user = this.ctx.auth;
		const dbCmd = this.db.command;
		let startTime = new Date().getTime();
		await this.db.collection('job-basic-post-category-all').add(postClassificationData
			.post_classification_all)
		await this.db.collection('job-basic-post-category-tree').add(postClassificationData
			.post_classification_tree)
		let endTime = new Date().getTime();
		let allUseTimes = (endTime - startTime) / 1000
		response.msg += '总用时' + allUseTimes + 's'
		return response
	}
	//获取职业分类tree结构
	async tree() {
		let response = {
			code: 200,
			data: null,
			msg: '查询成功'
		}
		try {
			let dbRes = await this.db.collection('job-basic-post-category-tree').where({}).get()
			response.data = dbRes.data;
		} catch (e) {
			//TODO handle the exception
			response.code = -1;
			response.msg = '系统错误：' + e;
		}
		return response;
	}
}
