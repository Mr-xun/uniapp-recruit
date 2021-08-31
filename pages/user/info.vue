<template>
	<view class="user-info-page">
		<view class="info-wrap">
			<view class="info-item flex align-center justify-between">
				<text class="item-type">用户头像</text>
				<image class="item-img" :src="userInfo.avatar" mode=""></image>
			</view>
			<view class="info-item flex align-center justify-between">
				<text class="item-type">用户名</text>
				<text class="item-val">{{userInfo.nickname}}</text>
			</view>
			<view class="info-item flex align-center justify-between">
				<text class="item-type">性别</text>
				<text class="item-val">{{userInfo.gender | flGender}}</text>
			</view>
			<view class="info-item flex align-center justify-between">
				<text class="item-type">国家</text>
				<text class="item-val">{{userInfo.country}}</text>
			</view>
			<view class="info-item flex align-center justify-between">
				<text class="item-type">省份</text>
				<text class="item-val">{{userInfo.province}}</text>
			</view>
			<view class="info-item flex align-center justify-between">
				<text class="item-type">城市/区</text>
				<text class="item-val">{{userInfo.city}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	export default {
		computed: {
			...mapGetters('user', ['userInfo', 'isLogin'])
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	.info-item {
		background: #ffffff;
		border-radius: 10rpx;
		margin: 24rpx;
		height: 88rpx;
		padding: 0 20rpx;
		font-size: 28rpx;
	}

	.item-type {
		color: #333333;
	}

	.item-val {
		color: #666666;
	}

	.item-img {
		width: 64rpx;
		height: 64rpx;
		border-radius: 32rpx;
	}
</style>
