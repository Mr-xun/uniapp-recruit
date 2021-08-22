const appId = "wxcbb55b334edc667f"
const appSecret = "ca7ca05d49c9f315224f9aeb622b0bf2"
const jwt = require('jsonwebtoken')
const setToken = (openid) => {
	return jwt.sign(
		{openid},
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
