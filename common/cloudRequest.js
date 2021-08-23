/**
 * Created by Mr-xun on 2021-08-23
 **/
let cloudRequest = {}
cloudRequest = new Proxy(cloudRequest, {
	get: function(target, key) {
		return new RequestContext(key)
	}
})

function RequestContext(name) {
	this.funcname = name;
	this.response = {
		code: 200, //200 成功 101失败
		data: null,
		msg: ''
	}
}

RequestContext.prototype = {
	funcname: '', //云函数名称
	response: {} //统一响应格式
}
/**
 * @description 调用云函数
 * @param {string} action 云函数路径
 * @param {objcet} data 请求参数  
 **/
RequestContext.prototype.call = function(action, data) {
	return uniCloud.callFunction({
		name: this.funcname,
		data: {
			action,
			data
		}
	}).then(res => {
		if (res.result) {
			this.response.code = res.result.code === 0 ? 200 : res.result.code || null
			this.response.msg = res.result.msg || res.result.message || '';
			this.response.data = res.result.data || res.result || null
			return Promise.resolve(this.response)
		}
		return Promise.reject(res)
	}).catch(err => {
		return Promise.reject(err)
	})
}
export default cloudRequest;
