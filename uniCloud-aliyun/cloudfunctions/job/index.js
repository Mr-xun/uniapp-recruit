'use strict';
/**
 * Created by Mr-Xun on 2021-08-30
 **/
const {
	Router
} = require('uni-cloud-router')
const router = new Router(require('./config.js'))
exports.main = async (event, context) => {
	//event为客户端上传的参数
	return router.serve(event,context)
};
