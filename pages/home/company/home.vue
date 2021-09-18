<template>
	<view class="home-company-index-page">
		<scroll-view scroll-y="true" class="post-container" refresher-enabled="true"
			:refresher-triggered="loadpull.triggered" @refresherpulling="onPull" @refresherrefresh="onRefresh"
			@refresherrestore="onRestore" @refresherabort="onAbort" @scrolltolower='scrolltolower'>
			<view class="post-item-box" v-for="(item,index ) in postData" :key='index' @click="toDetail(item)">
				<view class="post-title flex align-center justify-between ">
					<text class="post-name">{{item.post_name}}</text>
					<text class="post-salary">
						{{item.salary}}
						<text class="post-salary-unit" v-if="item.salary_type ==1">&nbsp;{{item.salary_unit}}</text>
					</text>
				</view>
				<view class="post-company">{{item.company_name}}</view>
				<view class="demand-label-content  f20 color-6">
					<text class="text-center" v-if="item.demand_experience">{{item.demand_experience}}</text>
					<text class="text-center" v-if="item.demand_gender"><text class="label-line"></text>
						{{item.demand_gender}}</text>
					<text class="text-center" v-if="item.demand_age"><text
							class="label-line"></text>{{item.demand_age}}</text>
					<text class="text-center" v-if="item.demand_education"><text
							class="label-line"></text>{{item.demand_education}}</text>
				</view>
				<view class="welfare-label-content f22 color-6" v-if="item.welfare_tags">
					<text class="label-tag text-center" v-for="(tag,idx) in item.welfare_tags.split(',')" :key="idx"
						v-if="idx < 5">
						{{tag}}
					</text>
					<text class="label-tag text-center" v-if="item.welfare_tags.split(',').length >5">...</text>
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
			<u-loadmore :status="loadmore.status" :icon-type="loadmore.iconType" :load-text="loadmore.text"
				@loadmore="handleLoadMore()" margin-bottom="20" />
		</scroll-view>
		<view class="publish-menu flex-all-center" @click="toPublishRecruit()">
			<u-icon name="plus" size="54" color="#fff"></u-icon>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataLoading: false,
				loadpull: { //下拉刷新
					loading: false,
					triggered: false, //下拉刷新是否被触发
				},
				loadmore: { //上拉加载
					status: 'loading',
					iconType: 'flower',
					text: {
						loadmore: '加载更多',
						loading: '努力加载中',
						nomore: '没有更多了'
					}
				},
				pageNum: 1,
				postData: [], //职位列表
			}
		},
		mounted() {
			uni.showLoading({
				title: '加载中'
			});
			this.getData()
		},
		onReachBottom() {
			this.onRefresh()
		},
		methods: {
			toPublishRecruit() {
				uni.navigateTo({
					url: '/pages/job/post/publish',
				})
			},
			// 自定义下拉刷新控件被下拉
			onPull(event) {
				this.loadpull.triggered = true; // 需要重置
			},
			// 自定义下拉刷新被触发
			onRefresh() {
				if (this.dataLoading) return
				this.pageNum = 1
				this.getData()
			},
			// 自定义下拉刷新被复位
			onRestore() {
				this.loadpull.triggered = false; // 需要重置
			},
			// 自定义下拉刷新被中止
			onAbort() {
				this.loadpull.triggered = false;
			},
			//滚动至底部触发
			scrolltolower() {
				if (this.loadmore.status == 'loadmore') {
					this.handleLoadMore()
				}
			},
			//点击触发加载更多
			handleLoadMore() {
				this.pageNum++
				this.loadmore.status = 'loading'
				this.getData()
			},
			//去详情页
			toDetail(item) {
				uni.navigateTo({
					url: "/pages/job/post/detail?_id=" + item._id,

				})
			},
			//获取数据
			getData() {
				let params = {
					pageSize: 15,
					pageNum: this.pageNum,
				}
				this.dataLoading = true;
				this.$cloudRequest.job.call('recruit/list', params).then(res => {
					let {
						code,
						msg,
						data
					} = res
					if (code == 200) {
						if (this.pageNum == 1) {
							this.postData = data.list || []
						} else {
							this.postData = this.postData.concat(data.list)
						}
						this.loadmore.status = this.postData.length >= data.tatal ? 'nomore' : 'loadmore'
					} else {
						uni.showToast({
							title: msg,
							icon: 'none',
							duration: 2000
						});
						this.loadmore.status = 'nomore'
					}
					this.dataLoading = false;
					this.loadpull.triggered = false;
					uni.hideLoading()
				}).catch(err => {
					this.dataLoading = false;
					this.loadpull.triggered = false;
					this.loadmore.status = 'nomore'
					uni.hideLoading()
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.home-company-index-page {
		display: flex;
		flex-direction: column;
		height: 100vh;

		.post-container {
			flex: 1;
			overflow: auto;

			.post-item-box {
				margin: 24rpx;
				background: #fff;
				border-radius: 12rpx;
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

				.post-salary-unit {
					margin-left: 8rpx;
				}

				.post-company {
					font-size: 26rpx;
					margin-top: 10rpx;
					margin-bottom: 4rpx;
					color: #333;
				}

				.demand-label-content {
					.label-line {
						display: inline-block;
						margin: 0 8rpx;
						height: 16rpx;
						width: 1rpx;
						background: #666;
					}
				}

				.welfare-label-content {
					.label-tag {
						display: inline-block;
						padding: 3rpx 8rpx;
						background: #F7F7F7;
						margin-top: 10rpx;
						margin-right: 8rpx;
						border-radius: 3rpx;
						line-height: 28rpx;
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

		.publish-menu {
			position: fixed;
			bottom: 20rpx;
			right: 20rpx;
			width: 80rpx;
			height: 80rpx;
			border-radius: 30rpx;
			opacity: 0.85;
			background: linear-gradient(180deg, #79C58A 0%, #D3ECD9 100%);
		}
	}
</style>
