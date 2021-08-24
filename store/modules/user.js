/**
 * Created by Mr-xun on 2021-08-23
 * 用户信息及token权限
 **/
const state = {
	userInfo: uni.getStorageSync('userInfo') || {},
	accessToken: uni.getStorageSync('uni_id_token') || null,
	tokenExpireTime: uni.getStorageSync('tokenExpired') || null
}
const getters = {
	userInfo: (state) => state.userInfo
}
const mutations = {
	setAccessToken(state, token) {
		state.accessToken = token;
		uni.setStorageSync('uni_id_token',token)
	},
	setTokenExpireTime(state, val) {
		state.tokenExpireTime = val;
		uni.setStorageSync('uni_id_token_expired', val)
	},
	setUserInfo(state, info) {
		state.userInfo = info;
		uni.setStorageSync('userInfo', info);
	},
}
export default {
	namespaced: true,
	state,
	getters,
	mutations
}
