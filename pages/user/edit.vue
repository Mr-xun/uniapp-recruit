<template>
	<view class="user-info-page">
		<scroll-view scroll-y="true" class="info-wrap">
			<view class="info-split">
				基本信息
			</view>
			<view class="info-item flex align-center justify-between">
				<text class="item-type">用户头像</text>
				<image class="item-img" :src="userInfo.avatar" mode=""></image>
			</view>
			<view class="info-item flex align-center justify-between">
				<text class="item-type">真实姓名</text>
				<text class="item-val">{{userInfo.realname}}</text>
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
				<text class="item-type">生日</text>
				<text class="item-val">{{userInfo.age}}</text>
			</view>
			<view class="info-item flex align-center justify-between">
				<text class="item-type">年龄</text>
				<text class="item-val">{{userInfo.age}}</text>
			</view>
			<view class="info-split">
				联系方式
			</view>
			<view class="info-item flex align-center justify-between">
				<text class="item-type">手机号</text>
				<text class="item-val">{{userInfo.mobile}}</text>
			</view>
			<view class="info-item flex align-center justify-between">
				<text class="item-type">微信号</text>
				<text class="item-val">{{userInfo.weixin}}</text>
			</view>
			<view class="info-item flex align-center justify-between">
				<text class="item-type">邮箱</text>
				<text class="item-val">{{userInfo.email}}</text>
			</view>
			<view class="info-item flex align-center justify-between">
				<text class="item-type">家庭住址</text>
				<text class="item-val">{{userInfo.address}}</text>
			</view>
			<view class="info-split">
				职业技能
			</view>
			<view class="info-item flex align-center justify-between">
				<text class="item-type">工作年限</text>
				<text class="item-val">{{userInfo.work_years}}</text>
			</view>
			<view class="info-item flex align-center justify-between">
				<text class="item-type">技术/技能</text>
				<text class="item-val">{{userInfo.work_skill}}</text>
			</view>
			<view class="info-split">
				教育经历
			</view>
			<view class="info-item flex align-center justify-between">
				<text class="item-type">毕业院校</text>
				<text class="item-val">{{userInfo.edu_school}}</text>
			</view>
			<view class="info-item flex align-center justify-between">
				<text class="item-type">学历</text>
				<text class="item-val">{{userInfo.edu_qualification}}</text>
			</view>
			<view class="info-item flex align-center justify-between">
				<text class="item-type">毕业时间</text>
				<text class="item-val">{{userInfo.edu_graduated_time}}</text>
			</view>
		</scroll-view>
		<view class="bottom-btn flex align-center justify-center">
			<button class="opt-btn cu-btn round" :disabled='btnLoading' @click="toSave">
				<text v-if="btnLoading" class="cuIcon-loading2 cuIconfont-spin"></text> 保存信息</button>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				btnLoading: false
			}
		},
		computed: {
			...mapGetters('user', ['userInfo', 'isLogin'])
		},
		methods: {
			...mapMutations('user', ['setUserInfo']),
			//保存信息
			toSave() {
				let userInfo = {
					realname: '荀潇 ' + this.$u.timeFormat(new Date(), 'mm-dd hh:MM:ss'),
					mobile:'17810104418',
					address: '北京市丰台区蒲安西里2号楼' + this.$u.timeFormat(new Date(), 'mm-dd hh:MM:ss'),
				}
				if (this.btnLoading) return
				this.btnLoading = true
				this.$cloudRequest.user.call('user/updateInfo', userInfo).then(res => {
					let {
						code,
						msg,
						data
					} = res;
					if (code == 200) {
						this.setUserInfo(data)
						uni.navigateBack({
							delta: 1
						});
						uni.showToast({
							title: msg
						})
					} else {
						uni.showToast({
							title: msg,
							icon: 'none',
							duration: 2000
						})
					}
					this.btnLoading = false
				}).catch(err => {
					uni.showModal({
						title: '提示',
						content: '系统错误:' + JSON.stringify(err)
					});
					this.btnLoading = false
				})

			},
		}
	}
</script>

<style lang="scss" scoped>
	.info-wrap {
		height: calc(100vh - 128rpx);
	}

	.info-split {
		padding: 0 20rpx;
		margin: 24rpx;
		color: #999;
		font-weight: 26rpx;
	}

	.info-item {
		background: #ffffff;
		border-radius: 10rpx;
		margin: 2rpx 24rpx;
		height: 88rpx;
		padding: 0 20rpx;
		font-size: 28rpx;

		&:nth-last-of-type(1) {
			margin-bottom: 24rpx;
		}
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

	.bottom-btn {
		height: 128rpx;
		background: #ffffff;

		.opt-btn {
			width: 690rpx;
			height: 88rpx;
			line-height: 88rpx;
			border-radius: 10rpx;
			color: #fff;
			font-weight: 500;
			border: none;
			box-sizing: border-box;
			background: #79C58A;
		}
	}
</style>
