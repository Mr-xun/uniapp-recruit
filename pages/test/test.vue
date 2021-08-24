<template>
	<view class="my-page">
		<view>用户：{{userInfo.nickName || ''}}</view>
		<image class="user-avatar" :src="userInfo.avatarUrl" mode=""></image>
		<u-button type="success" @click="getUserInfo()">获取默认信息</u-button>
		<u-button type="success" @click="updateUserInfo()">同步微信信息</u-button>
		<u-button type="success" @click="loginOrRegister()">注册或登录</u-button>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'
	import apiCloud from "../../common/apiCloud.js"
	export default {
		data() {
			return {
				userInfo: {}
			}
		},
		onLoad() {
			this.getUserInfo()
		},
		methods: {
			...mapMutations('user',['setAccessToken','setTokenExpireTime','setUserInfo']),
			getUserInfo() {
				let _this = this;
				uni.login({
					provider: "weixin",
					success(res) {
						apiCloud.call({
							name: 'login',
							data: {
								code: res.code
							},
							success(res) {
								_this.userInfo = res.result;
								console.log('登录完成', res, _this.userInfo)
							}
						})
					}
				})
			},
			updateUserInfo() {
				let _this = this;
				uni.getUserProfile({
					desc: '我想要你的基本信息',
					success: (res) => {
						let userInfo = res.userInfo;
						console.log(userInfo, 'userInfo')
						apiCloud.call({
							name: 'unpdateUser',
							data: {
								userInfo
							},
							success: (res) => {
								_this.userInfo = Object.assign(_this.userInfo, userInfo)
								console.log(res, '返回值')
							}
						})
					}
				})
			},
			//登录或注册
			loginOrRegister() {
				uni.login({
					provider: "weixin",
					success: (res) => {
						this.$cloudRequest.user.call('user/loginOrRegister', {
							code: res.code
						}).then(res => {
							let {
								code,
								msg,
								data
							} = res;
							if (code == 200) {
								this.setAccessToken(data.token)
								this.setTokenExpireTime(data.tokenExpired)
								this.setUserInfo(data.userInfo)
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user-avatar {
		width: 200rpx;
		height: 200rpx;
		border-radius: 100rpx;
		margin: auto;
	}
</style>
