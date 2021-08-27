'use strict';
/**
 * Created by Mr-Xun on 2021-08-24
 **/
const {
	Router
} = require('uni-cloud-router');
const router = new Router(require('./config.js'))
exports.main = async (event, context) => {
	//返回数据给客户端
	return router.serve(event, context)
};
