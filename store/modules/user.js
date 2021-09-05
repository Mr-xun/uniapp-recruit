/**
 * Created by Mr-Xun on 2021-08-23
 * 用户信息及token权限
 **/
import cloudRequest from "../../common/js/cloudRequest"
const state = {
	userInfo: uni.getStorageSync('userInfo') || {}, //用户信息
	accessToken: uni.getStorageSync('uni_id_token') || null, //token
	tokenExpireTime: uni.getStorageSync('uni_id_token_expired') || null //token有效期
}
const getters = {
	userInfo: (state) => state.userInfo,
	accessToken: (state) => state.accessToken,
	tokenExpireTime: (state) => state.tokenExpireTime,
	isLogin: (state) => { //是否登录
		let cur_time = new Date().getTime()
		if (state.accessToken && state.tokenExpireTime > cur_time) {
			return true
		} else {
			uni.clearStorageSync('userInfo')
			return false
		}
	},
}
const mutations = {
	setAccessToken(state, token) {
		state.accessToken = token;
		uni.setStorageSync('uni_id_token', token)
	},
	setTokenExpireTime(state, val) {
		state.tokenExpireTime = val;
		uni.setStorageSync('uni_id_token_expired', val)
	},
	setUserInfo(state, info) {
		state.userInfo = info;
		uni.setStorageSync('userInfo', info);
	},
	logout(state, info) {
		state.userInfo = {};
		state.accessToken = "";
		state.tokenExpireTime = "";
		uni.clearStorageSync()
	},
}
const actions = {
	//登录或注册
	loginOrRegister({
		dispatch,
		commit
	}) {
		return new Promise((resolve, reject) => {
			uni.showLoading({
				title: '加载中'
			});

			uni.login({
				provider: "weixin",
				success: (res) => {
					cloudRequest.user.call('user/loginOrRegister', {
						code: res.code
					}).then(res => {
						let {
							code,
							msg,
							data
						} = res;
						uni.hideLoading()
						if (code == 200) {
							commit('setAccessToken', data.token)
							commit('setTokenExpireTime', data.tokenExpired)
							commit('setUserInfo', data.userInfo)
							if (!data.userInfo || !data.userInfo.nickname) {
								uni.showModal({
									title: '温馨提示',
									content: '亲，授权微信登录后才能正常使用小程序功能',
									success(res) {
										//如果用户点击了确定按钮
										if (res.confirm) {
											dispatch('updateUserInfo')
										} else if (res.cancel) {
											//如果用户点击了取消按钮
											uni.showToast({
												title: '您拒绝了请求',
												icon: 'none',
												duration: 2000
											});
											return;
										}
									}
								});
							} else {
								resolve(res)
								uni.showToast({
									title: msg,
									duration: 2000
								})
							}
						} else {
							uni.showToast({
								title: msg,
								icon: 'none',
								duration: 2000
							})
							resolve(res)
						}
					}).catch(err => {
						uni.hideLoading()
						uni.showModal({
							title: '提示',
							content: '系统错误:' + JSON.stringify(err),
						});
						reject(err)
					})
				}
			})
		})
	},
	//更新微信信息
	updateUserInfo({
		commit
	}) {
		return new Promise((resolve, reject) => {

			uni.getUserProfile({
				desc: '获取你的昵称、头像、地区及性别',
				lang: "zh_CN",
				success: (res) => {
					uni.showLoading({
						title: '加载中'
					});
					let userInfo = res.userInfo;
					cloudRequest.user.call('user/updateInfo', userInfo).then(res => {
						let {
							code,
							msg,
							data
						} = res;
						if (code == 200) {
							commit('setUserInfo', data)
							resolve(res)
							uni.showToast({
								title: msg
							})
						} else {
							uni.showToast({
								title: msg,
								icon: 'none',
								duration: 2000
							})
							resolve(res)
						}
						uni.hideLoading()
					}).catch(err => {
						uni.hideLoading()
						uni.showModal({
							title: '提示',
							content: '系统错误:' + JSON.stringify(err)
						});
						reject(err)
					})
				},
				fail: res => {
					//拒绝授权
					uni.showToast({
						title: '您拒绝了请求',
						icon: 'none',
						duration: 2000
					});
					return;
				}
			})
		})
	},
	//获取用户信息
	getUserInfo({
		commit
	}) {
		cloudRequest.user.call('user/getInfo').then(res => {
			let {
				code,
				msg,
				data
			} = res;
			if (code == 200) {
				commit('setUserInfo', data)
			} else {
				uni.showToast({
					title: msg,
					icon: 'none',
					duration: 2000
				})
			}
		}).catch(err => {
			uni.showModal({
				title: '提示',
				content: '系统错误:' + JSON.stringify(err)
			});
			reject(err)
		})
	},
}
export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
