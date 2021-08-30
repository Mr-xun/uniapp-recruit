<template>
	<view class="user-publish-page">
		<view>
			<u-tabs-swiper ref="uTabs" :list="list" :current="current" active-color="#79C58A" @change="tabsChange"
				:is-scroll="false" swiperWidth="750"></u-tabs-swiper>
		</view>
		<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<swiper-item class="swiper-item" v-for="(item, index) in tabs" :key="index">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
					<u-card v-for="(o,idx) in data" :title="o.title" :sub-title="o.publish_time | date('yyyy/mm/dd hh:MM:ss')"
						:thumb="o.publish_uid_avatar">
						<view class="" slot="body">
							<view class="u-body-item u-flex  u-col-between u-p-t-0">
								<view class="u-body-item-title ">{{o.content}}</view>
							</view>
						</view>
					</u-card>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: '我的招聘'
				}, {
					name: '我的求职'
				}],
				thumb: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
				tabs: [1, 2],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				data: [

				]
			}
		},
		mounted() {
			this.getData()
		},
		methods: {
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
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
				this.swiperCurrent = current;
				this.current = current;
			},
			// scroll-view到底部加载更多
			onreachBottom() {

			},
			getData() {
				uni.showLoading({
					title: '加载中'
				});
				console.log(222)
				this.$cloudRequest.job.call('recruit/list').then(res => {
					console.log(res, 11)
					let {
						code,
						msg,
						data
					} = res
					if (code == 200) {
						this.data = data
						uni.showToast({
							title: msg
						});
					} else {
						uni.showToast({
							title: msg,
							icon: 'none',
							duration: 2000
						});
					}
					uni.hideLoading()
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.user-publish-page {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}

	.swiper-box {
		flex: 1;
		padding-bottom: 20rpx;
	}

	.swiper-item {
		height: 100%;
	}
</style>
