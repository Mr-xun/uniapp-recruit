<template>
	<view class="company-index-page">
		<view class="btn-wrap flex-all-center" @click="toAdd">
			<image class="btn-icon" src="../../static/user/icon-add.png" mode=""></image>
			<text class="btn-txt">添加公司</text>
		</view>
		<view class="company-wrap">
			<view class="company-item">
				<view class="company-item-title flex-between-center">
					<text class="color-3 f34">公司名字</text>
					<view class="btn-content">
						<view class="opt-btn f24 text-center" @click="toEdit">编辑</view>
					</view>
				</view>
				<view class="company-item-more flex-all-center">
					<u-icon class="opt-box-icon" name="arrow-down" size="36" color="#999"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			toAdd() {
				uni.navigateTo({
					url: "/pages/user/company/edit?type=add",

				})
			},
			toEdit() {
				uni.navigateTo({
					url: "/pages/user/company/edit?type=edit&id=1"
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.company-index-page {
		height: 100vh;
		background: #F3F6F8;

		.btn-wrap {
			height: 100rpx;
			background: #fff;
			border-radius: 10rpx;
			margin: 20rpx;

			.btn-icon {
				width: 44rpx;
				height: 44rpx;
			}

			.btn-txt {
				margin-left: 16rpx;
			}
		}

		.company-wrap {
			.company-item {
				margin: 20rpx;
				background: #FFFFFF;
				border-radius: 10rpx;
				padding: 30rpx;

				.company-item-title {
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					line-height: 48rpx;

					.opt-btn {
						width: 108rpx;
						height: 56rpx;
						border-radius: 28rpx;
						background: #79C58A;
						color: #FFFFFF;
						margin-left: 30rpx;
						line-height: 56rpx;
					}
				}

				.company-item-more {
					margin-top: 40rpx;
				}
			}
		}
	}
</style>
