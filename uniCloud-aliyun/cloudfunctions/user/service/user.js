const {
	Service
} = require("uni-cloud-router")
const uniID = require('uni-id')
const {
	utils
} = require('uni-common')
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
	async updateInfo(userInfo) {
		let response = {
			code: 200,
			msg: '更新成功',
			data: null
		}
		let user = this.ctx.auth;
		let uid = user.uid;
		let updateData = {} //更新数据
		if (userInfo.realname) updateData.realname = userInfo.realname; //真实姓名
		if (userInfo.id_card) updateData.id_card = userInfo.id_card; //身份证
		if (userInfo.nickName) updateData.nickname = userInfo.nickName; //微信同步用户名
		if (userInfo.nickname) updateData.nickname = userInfo.nickname; //用户名
		if (userInfo.mobile) updateData.mobile = userInfo.mobile; //手机号
		if (userInfo.weixin) updateData.weixin = userInfo.weixin; //微信号
		if (userInfo.qq) updateData.qq = userInfo.qq; //qq号
		if (userInfo.email) updateData.email = userInfo.email; //邮箱
		if (userInfo.gender) updateData.gender = userInfo.gender; //性别
		if (userInfo.birthday) {
			updateData.birthday = userInfo.birthday; //生日
			updateData.age = utils.jsGetAge(userInfo.birthday) //年龄
		}
		if (userInfo.avatar) updateData.avatar = userInfo.avatar; //头像
		if (userInfo.avatarUrl) updateData.avatar = userInfo.avatarUrl; //微信同步头像
		if (userInfo.country) updateData.country = userInfo.country; //国家
		if (userInfo.province) updateData.province = userInfo.province; //省份
		if (userInfo.city) updateData.city = userInfo.city; //城市
		if (userInfo.district) updateData.district = userInfo.district; //市区
		if (userInfo.address) updateData.address = userInfo.address; //详细地址
		if (userInfo.geo_location && JSON.stringify(userInfo.geo_location) !='{}'){
			userInfo.geo_location = new this.db.Geo.Point(userInfo.geo_location.longitude, userInfo.geo_location.latitude)
		}
		if (userInfo.edu_school) updateData.edu_school = userInfo.edu_school; //学校
		if (userInfo.edu_qualification) updateData.edu_qualification = userInfo.edu_qualification; //学历
		if (userInfo.edu_entrance_time) updateData.edu_entrance_time = userInfo.edu_entrance_time; //入学时间
		if (userInfo.edu_graduated_time) updateData.edu_graduated_time = userInfo.edu_graduated_time; //毕业时间
		if (userInfo.work_years) updateData.work_years = userInfo.work_years; //工作年限
		if (userInfo.work_start_time) updateData.work_start_time = userInfo.work_start_time; //工作开始时间
		if (userInfo.work_skill) updateData.work_skill = userInfo.work_skill; //工作开始时间
		if (userInfo.job_identity) updateData.job_identity = userInfo.job_identity; //求职身份 1 上班族 2 学生

		await this.db.collection('uni-id-users').doc(uid).update(updateData)
		let resData = await uniID.getUserInfo({
			uid
		})
		response.data = resData.userInfo
		this.uidlog(response, 'updateInfo')
		return response
	}
	//获取用户信息
	async getInfo() {
		let response = {
			code: 200,
			msg: '获取成功',
			data: {}
		}
		let user = this.ctx.auth;
		let resData = await uniID.getUserInfo({
			uid: user.uid
		})
		if (resData.code == 0) {
			response.data = resData.userInfo
		} else {
			response.code = resData.code;
		}
		response.msg = resData.msg;
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
