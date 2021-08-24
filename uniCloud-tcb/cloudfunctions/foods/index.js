'use strict';
const {
	Router
} = require('uni-cloud-router').Router;
const router = new Router(require('./config.js'))
exports.main = async (event, context) => {

	//返回数据给客户端
	return router.serve(event, context)
};
