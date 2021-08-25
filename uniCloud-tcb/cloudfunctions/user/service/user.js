const {
	Service
} = require("uni-cloud-router")
const uniID = require('uni-id')
module.exports = class UserService extends Service {
	//登录或注册
	async loginOrRegister(data) {
		let response = {
			code: 200,
			msg: '登录成功',
			data: data
		}
		const res = await uniID.loginByWeixin({
			code: data.code
		})
		response.code = res.code;
		response.msg = res.message;
		response.data = res
		this.uidlog(res, res.type)
		return response
	}
	//更新用户信息
	async updateByWeixin(userInfo) {
		let response = {
			code: 200,
			msg: '更新用户信息成功',
			data: null
		}
		let user = await uniID.checkToken(this.ctx.event.uniIdToken)
		let uid = user.uid;
		let updateData = {
			nickname: userInfo.nickName,
			gender: userInfo.gender,
			avatar: userInfo.avatarUrl,
			country: userInfo.country,
			province: userInfo.province,
			city: userInfo.city,
		}
		this.db.collection('uni-id-users').doc(uid).update(updateData)
		response.data = updateData
		this.uidlog(response, 'updateByWeixin')
		return response
	}
	// 日志记录
	async uidlog(res, type = 'login') {
		let user = await uniID.checkToken(this.ctx.event.uniIdToken)
		let uid = user.uid;
		let data = {
			deviceId: this.ctx.data.deviceId || this.ctx.context.DEVICEID,
			ip: this.ctx.data.ip || this.ctx.context.CLIENTIP,
			type,
			uid,
			ua: this.ctx.context.CLIENTUA,
			create_date: Date.now(),
			event: this.ctx.event
		};

		Object.assign(data, res.code === 0 || res.code == 200 ? {
			state: 1
		} : {
			state: 0
		});
		return this.db.collection('uni-id-log').add(data);
	}
}
