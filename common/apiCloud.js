let token;
function call (option) {
	return new Promise((resolve,reject)=>{
		uni.showLoading({
		    title: '加载中'
		});
		if(!option.data) option.data = {}
		if(token) option.data.token = token;
		uniCloud.callFunction({
			name:option.name,
			data:option.data,
			success:(res)=> {
				if(res.result.token) token = res.result.token;
				if(option.success) option.success(res)
				resolve(res)
			},
			fail:(err)=>{
				if(option.fail) option.fail(err)
				reject(err)
			},
			complete: () => {
				uni.hideLoading();
				if(option.complete) option.complete()
			}
		})
	})
}
module.exports = {
	call:call
}