const {authMiddleWare} = require('uni-common')
module.exports = {
	debug: true, //调试模式时，返回stack错误堆栈 
	baseDir: __dirname, //应用根目录
	middleware: [
		[
			//数组格式，第一个元素为中间件，第二个元素为中间件生效规则配置
			authMiddleWare({
				tokenSecret: 'mr-xun-secret'
			}), // 注册中间件
			{
				enable: true,
				ignore: /\/login$/
			}, // 配置当前中间件生效规则，该规则表示以`/login`结尾的路由不会执行 auth 中间件校验 token
		],
	] //中间件
}
