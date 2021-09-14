<template>
	<view class="home-company-index-page">
		<view class="margin-bottom-sm">
			<u-button type="success" ripple @click="toPublishRecruit()">发布信息</u-button>
		</view>
		<view class="post-container">
			<view class="post-item-box" v-for="(item,index ) in postData" :key='index'>
				<view class="post-title flex align-center justify-between ">
					<text class="post-name">{{item.post_name}}</text>
					<text class="post-salary">
						{{item.salary}}
						<text class="post-salary-unit" v-if="item.salary_type ==1">&nbsp;{{item.salary_unit}}</text>
					</text>
				</view>
				<view class="post-company">{{item.company_name}}</view>
				<view class="post-label-content">
					<text class="label-tag text-center ">{{item.demand_education}}</text>
					<text class="label-tag text-center">{{item.demand_gender}}</text>
					<text class="label-tag text-center">{{item.demand_age}}</text>
					<text class="label-tag text-center">{{item.demand_experience}}</text>
					<template v-if="item.welfare_tags">
						<text class="label-tag text-center"
							v-for="(tag,idx) in item.welfare_tags.split(',')">{{tag}}</text>
					</template>
				</view>
				<view class="publish-user flex align-center justify-between">
					<view class="user-box flex align-center ">
						<image class="user-avatar" :src="item.publish_uid_avatar" mode=""></image>
						<text class="user-name">{{item.contact_name}}</text>
					</view>
					<view class="user-contact">
						{{item.contact_number}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				postData: [], //职位列表
			}
		},
		mounted() {
			uni.showLoading({
				title: '加载中'
			});
			this.getData()
		},
		methods: {
			toPublishRecruit() {
				uni.navigateTo({
					url: '/pages/publish/post',
				})
			},
			getData() {
				this.$cloudRequest.job.call('recruit/allList').then(res => {
					let {
						code,
						msg,
						data
					} = res
					if (code == 200) {
						this.postData = data || []
					} else {
						uni.showToast({
							title: msg,
							icon: 'none',
							duration: 2000
						});
					}
					uni.hideLoading()
				}).catch(err => {
					uni.hideLoading()
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.home-company-index-page {
		.post-container {
			.post-item-box {
				margin: 26rpx;
				background: #fff;
				border-radius: 20rpx;
				padding: 16rpx;
				box-sizing: border-box;
				box-shadow: 0 0 10rpx #ebeeef;

				.post-name {
					color: #333;
					font-size: 28rpx;
					font-weight: bold;
				}

				.post-salary {
					font-size: 26rpx;
					color: #e63500;
				}
				.post-salary-unit{
					margin-left: 8rpx;
				}
				.post-company {
					font-size: 26rpx;
					margin-top: 10rpx;
					margin-bottom: 4rpx;
					color: #666;
				}

				.post-label-content {
					.label-tag {
						display: inline-block;
						font-size: 23rpx;
						color: #666;
						padding: 3rpx 8rpx;
						background: #F7F7F7;
						margin-top: 10rpx;
						margin-right: 8rpx;
						border-radius: 3rpx;
					}
				}

				.publish-user {
					margin-top: 16rpx;
					padding-top: 10rpx;
					border-top: 0.5rpx solid #ebeeef;

					.user-avatar {
						width: 32rpx;
						height: 32rpx;
						border-radius: 16rpx;
						margin-right: 8rpx;
					}

					.user-name {
						color: #666;
						font-size: 26rpx;
					}

					.user-contact {
						color: #666;
						font-size: 26rpx;
					}
				}
			}
		}
	}
</style>
