'use strict';
const {
	appId,
	appSecret,
	setToken
} = require("wx-common")
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	let {
		code
	} = event
	let res = await uniCloud.httpclient.request(
		`https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`, {
			dataType: 'json'
		}
	)
	const {
		openid
	} = res.data;
	let userData = {
		openid: openid,
		nickName: '微信用户',
		avatarUrl: ""
	}
	const token = setToken(openid)
	const db = uniCloud.database()
	const dbCmd = db.command;
	let dbRes = await db.collection('users').where({
		openid: dbCmd.eq(openid)
	}).get()
	if (dbRes.data.length) {
		userData = dbRes.data[0]
	} else {
		await db.collection('users').add(userData)
	}
	userData['token'] = token
	//返回数据给客户端
	return userData
};
