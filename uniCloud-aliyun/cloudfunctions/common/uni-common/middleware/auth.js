const uniID = require("uni-id");
const utils = require("../utils")
module.exports = (options) => {
	// 返回中间件函数
	return async function auth(ctx, next) {
		// 校验 token
		const auth = await uniID.checkToken(ctx.event.uniIdToken);
		if (!auth.uid) {
			//用户未登录 抛出信息
			throw {
				code: auth.code,
				message: auth.message
			};
		}
		if (auth.code) {
			// 校验失败，抛出错误信息
			throw {
				code: auth.code,
				message: auth.message
			};
		}
		ctx.auth = auth; // 设置当前请求的 auth 对象
		await next(); // 执行后续中间件
	};
};
