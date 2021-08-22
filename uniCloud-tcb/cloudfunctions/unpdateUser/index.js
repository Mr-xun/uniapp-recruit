'use strict';
const {
	verifyToken
} = require("wx-common")
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const {
		userInfo,
		token
	} = event
	const payLoad = verifyToken(token)
	const openid = payLoad.openid;
	const db = uniCloud.database()
	const dbCmd = db.command;
	const dbRes = await db.collection('users').where({
		openid: dbCmd.eq(openid)
	}).update({
		nickName: userInfo.nickName,
		avatarUrl: userInfo.avatarUrl,
		city: userInfo.city,
		country: userInfo.country,
		gender: userInfo.gender,
		province: userInfo.province,
		language: userInfo.language

	})
	console.log(dbRes, 'update返回值')
	//返回数据给客户端
	return {
		status: 200,
		msg: '更新成功'
	}
};
