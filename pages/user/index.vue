<template>
	<view class="user-page ">
		<view class="user-card text-center" :style="[{paddingTop:CustomBar + 'px'}]">
			<template v-if="isLogin">
				<view class="user-avator">
					<u-avatar :src="userInfo.avatar" mode="circle" size="160" :show-sex="userInfo.gender"
						:sex-icon="userInfo.gender ==1?'man':'woman'"></u-avatar>
				</view>
				<view class="user-nickname">
					<text v-if="userInfo.nickname">{{userInfo.nickname}}</text>
					<text v-else @click="updateUserInfo">点击同步您的微信信息</text>
				</view>
				<view class="user-mobile" v-if="false">
					<text v-if="userInfo.mobile" class="user-mobile">{{userInfo.mobile || ''}}</text>
					<text v-else>绑定您的手机号</text>
					<text class="cuIcon-write"></text>
				</view>
			</template>
			<template v-else>
				<view class="user-avator">
					<u-avatar mode="circle" size="160"></u-avatar>
				</view>
				<button class="login-btn cu-btn round line-green  shadow" @click="loginOrRegister">立即登录</button>
			</template>
		</view>
		<view class="content-container">
			<view class="content-item flex align-center">
				<image class="item-icon" src="../../static/user/icon-info.png" mode=""></image>
				<view class="item-con flex flex-sub justify-between" @click="toPage('/pages/user/info')">
					<text>个人信息</text>
					<u-icon name="arrow-right" color='#bfbfbf'></u-icon>
				</view>
			</view>
			<view class="content-item flex align-center">
				<image class="item-icon" src="../../static/user/icon-publish.png" mode=""></image>
				<view class="item-con flex flex-sub justify-between" @click="toPage('/pages/user/publish')">
					<text>我的发布</text>
					<u-icon name="arrow-right" color='#bfbfbf'></u-icon>
				</view>
			</view>
			<view class="content-item flex align-center">
				<image class="item-icon" src="../../static/user/icon-collect.png" mode=""></image>
				<view class="item-con flex flex-sub justify-between">
					<text>我的收藏</text>
					<u-icon name="arrow-right" color='#bfbfbf'></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				CustomBar: this.CustomBar
			}
		},
		computed: {
			...mapGetters('user', ['userInfo', 'isLogin'])
		},
		onLoad() {},
		methods: {
			...mapActions('user', ['loginOrRegister', 'updateUserInfo']),
			toPage(path) {
				uni.navigateTo({
					url: path
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.user-page {
		background: #fff;
		height: 100vh;
	}

	.user-card {
		width: 100vw;
		background-image: url(../../static/user/user-top.png);
		background-size: 100% 100%;
		overflow: hidden;
		padding-bottom: 70rpx;

		.user-avator {
			margin-top: 50rpx;

			/deep/ .u-avatar__img {
				border: 2rpx solid #fff;
				box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.5);
			}
		}

		.user-nickname {
			margin-top: 22rpx;
			font-size: 32rpx;
			color: #fff;
			font-weight: bold;
		}

		.login-btn {
			margin-top: 22rpx;
			color: #fff;
		}
	}

	.content-container {
		background: #fff;
		margin: 24rpx;
		border-radius: 20rpx;
		color: #666;
		padding: 0 20rpx;
		border: 0.5rpx solid #ebeeef;
		box-shadow: 0 0 10rpx #ebeeef;

		.content-item {
			height: 88rpx;
			line-height: 88rpx;

			.item-icon {
				width: 48rpx;
				height: 48rpx;
				margin-right: 16rpx;
			}

			.item-con {
				border-bottom: 0.5rpx solid #ebeeef;
			}

			&:nth-last-of-type(1) .item-con {
				border-bottom: none;
			}
		}

	}
</style>
