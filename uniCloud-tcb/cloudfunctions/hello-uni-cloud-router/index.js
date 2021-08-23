'use strict';
const Router = require("uni-cloud-router").Router;
const router = new Router(require("./config.js"))
console.log(router, 'router router ')
exports.main = async (event, context) => {
	return router.serve(event, context)
};
