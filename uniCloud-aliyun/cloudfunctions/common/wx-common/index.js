const appId = "wxcbb55b334edc667f" //微信小程序
const appSecret = "ca7ca05d49c9f315224f9aeb622b0bf2" //微信小程序
const h5AppId = "wx03c6239b11f7bcba" //微信公众号
const h5AppSecret = "50034bb761f1b881e7f4c3b2c0e0c2ab" //微信公众号
const BSAppId = "wxbf369add322a8247" //砭石微信公众号
const BSAppSecret = "4a77ced26c3c9910e1e12b15950cf26e" //砭石微信公众号
const jwt = require('jsonwebtoken')
const setToken = (openid) => {
	return jwt.sign({
			openid
		},
		appSecret, {
			expiresIn: 60 * 60 * 24
		}
	)
}
const verifyToken = (token) => {
	return jwt.verify(token, appSecret)
}
module.exports = {
	appId: appId,
	appSecret: appSecret,
	setToken: setToken,
	verifyToken: verifyToken
}
