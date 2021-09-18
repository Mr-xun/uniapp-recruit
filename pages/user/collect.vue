<template>
	<view class="user-collect-page">
		<view>
			<u-tabs-swiper ref="uTabs" :list="tabList" :current="currentTab" active-color="#79C58A" @change="tabsChange"
				:is-scroll="false" swiperWidth="750"></u-tabs-swiper>
		</view>
		<swiper class="swiper-conainer" :current="currentSwiper" @transition="transition"
			@animationfinish="animationfinish">
			<swiper-item class="swiper-item" v-for="nums in 2" :key="nums">
				<scroll-view scroll-y style="height: 100%;width: 100%;" refresher-enabled="true"
					:refresher-triggered="triggered" @refresherpulling="onPull" @refresherrefresh="onRefresh"
					@refresherrestore="onRestore" @refresherabort="onAbort">
					<template v-if="!isEmpty[currentSwiper]">
						<view class="post-item-box" v-for="(item,index ) in collectList[currentSwiper]" :key='index'
							@click="toDetail(item)">
							<view class="post-title flex align-center justify-between ">
								<text class="post-name">{{item.post_name}}</text>
								<text class="post-salary">
									{{item.salary}}
									<text class="post-salary-unit"
										v-if="item.salary_type ==1">&nbsp;{{item.salary_unit}}</text>
								</text>
							</view>
							<view class="post-company">{{item.company_name}}</view>
							<view class="demand-label-content  f20 color-6">
								<text class="text-center"
									v-if="item.demand_experience">{{item.demand_experience}}</text>
								<text class="text-center" v-if="item.demand_gender"><text class="label-line"></text>
									{{item.demand_gender}}</text>
								<text class="text-center" v-if="item.demand_age"><text
										class="label-line"></text>{{item.demand_age}}</text>
								<text class="text-center" v-if="item.demand_education"><text
										class="label-line"></text>{{item.demand_education}}</text>
							</view>
							<view class="welfare-label-content f22 color-6" v-if="item.welfare_tags">
								<text class="label-tag text-center" v-for="(tag,idx) in item.welfare_tags.split(',')"
									:key="idx" v-if="idx < 5">
									{{tag}}
								</text>
								<text class="label-tag text-center"
									v-if="item.welfare_tags.split(',').length >5">...</text>
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

					</template>
					<u-empty v-else :text="emityTxt" mode="data" color='#79C58A' icon-color='#79C58A'></u-empty>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabList: [{
					name: '职位'
				}, {
					name: '应聘者'
				}],
				tabs: [1, 2],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				currentTab: 0, // tabs组件的current值，表示当前活动的tab选项
				currentSwiper: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				collectList: [],
				isEmpty: [false, false], //数据是否为空
				triggered: false, //下拉刷新是否被触发
			}
		},
		computed: {
			emityTxt() {
				return this.currentSwiper == 0 ? '收藏为空' : '收藏为空'
			}
		},
		onShow() {
			uni.showLoading({
				title: '加载中'
			});
			this.getData()
		},
		methods: {
			// tabs通知swiper切换
			tabsChange(index) {
				this.currentSwiper = index;

			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.currentSwiper = current;
				this.currentTab = current;
				this.getData()
			},
			// 自定义下拉刷新控件被下拉
			onPull(event) {
				this.triggered = true; // 需要重置
			},
			// 自定义下拉刷新被触发
			onRefresh() {
				if (this.loading) return
				this.getData()
			},
			// 自定义下拉刷新被复位
			onRestore() {
				this.triggered = false; // 需要重置
			},
			// 自定义下拉刷新被中止
			onAbort() {
				this.triggered = false;
			},
			//去详情页
			toDetail(item) {
				uni.navigateTo({
					url: "/pages/job/post/detail?_id=" + item.post_id,

				})
			},
			getData() {
				this.loading = true
				this.$cloudRequest.job.call('collect/list').then(res => {
					let {
						code,
						msg,
						data
					} = res
					console.log(res, data, 'list')
					if (code == 200) {
						data = this.currentSwiper == 0 ? data : []
						this.$set(this.collectList, this.currentSwiper, data)
						this.$set(this.isEmpty, this.currentSwiper, data.length ? false : true)
						console.log(this.collectList, 9)
					} else {
						this.isEmpty[this.currentSwiper] = true;
						uni.showToast({
							title: msg,
							icon: 'none',
							duration: 2000
						});
					}
					this.triggered = false;
					this.loading = false
					uni.hideLoading()
				}).catch(err => {
					this.isEmpty[this.currentSwiper] = true;
					this.loading = false
					this.triggered = false;
					uni.hideLoading()
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.user-collect-page {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}

	.swiper-conainer {
		flex: 1;
		padding-bottom: 20rpx;

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

	.swiper-item {
		height: 100%;
	}
</style>
