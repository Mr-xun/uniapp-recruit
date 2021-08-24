<template>
	<view class="my-page text-center">
		<view>用户：{{userInfo.nickname || userInfo.nickName || ''}}</view>
		<u-avatar v-if="userInfo.avatar" :src="userInfo.avatar" mode="square" size="200" show-sex
			:sex-icon="userInfo.gender ==1?'man':'woman'"></u-avatar>
		<u-button type="success" @click="getUserInfo()">获取默认信息</u-button>
		<u-button type="success" @click="loginOrRegister()">注册或登录</u-button>
		<u-button type="success" @click="updateUserInfo()">同步微信信息</u-button>
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
		onLoad() {},
		methods: {
			...mapMutations('user', ['setAccessToken', 'setTokenExpireTime', 'setUserInfo']),
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
			//更新微信信息
			updateUserInfo() {
				uni.showLoading({
					title: '加载中'
				});
				uni.getUserProfile({
					desc: '我想要你的基本信息',
					success: (res) => {
						let userInfo = res.userInfo;
						this.$cloudRequest.user.call('user/updateByWeixin', userInfo).then(res => {
							let {
								code,
								msg,
								data
							} = res;
							if (code == 200) {
								this.userInfo = data
								uni.showToast({
									icon: 'success',
									title: '更新信息成功'
								})

							} else {
								uni.showToast({
									title: msg
								})
							}
							uni.hideLoading()
						})
					}
				})
			},
			//登录或注册
			loginOrRegister() {
				uni.showLoading({
					title: '加载中'
				});
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
								this.userInfo = data.userInfo
								this.setAccessToken(data.token)
								this.setTokenExpireTime(data.tokenExpired)
								this.setUserInfo(data.userInfo)
								uni.showToast({
									icon: 'success',
									title: '登录成功'
								})
							} else {
								uni.showToast({
									title: msg
								})
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
