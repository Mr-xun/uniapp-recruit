<template>
	<view class="user-publish-page">
		<view>
			<u-tabs-swiper ref="uTabs" :list="tabList" :current="currentTab" active-color="#79C58A" @change="tabsChange"
				:is-scroll="false" swiperWidth="750"></u-tabs-swiper>
		</view>
		<swiper class="swiper-box" :current="currentSwiper" @transition="transition" @animationfinish="animationfinish">
			<swiper-item class="swiper-item" v-for="nums in 2" :key="nums">
				<scroll-view scroll-y style="height: 100%;width: 100%;" refresher-enabled="true"
					:refresher-triggered="triggered" @refresherpulling="onPull" @refresherrefresh="onRefresh"
					@refresherrestore="onRestore" @refresherabort="onAbort">
					<template v-if="!isEmpty[currentSwiper]">
						<u-card v-for="(o,idx) in data[currentSwiper]" :key='idx' :title="o.post_name"
							:sub-title="o.publish_time | date('yyyy/mm/dd hh:MM:ss')" :thumb="o.publish_uid_avatar">
							<view class="" slot="body">
								<view class="u-body-item u-flex  u-col-between u-p-t-0">
									<view class="u-body-item-title ">{{o.post_content}}</view>
								</view>
							</view>
						</u-card>
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
					name: '我的招聘'
				}, {
					name: '我的求职'
				}],
				tabs: [1, 2],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				currentTab: 0, // tabs组件的current值，表示当前活动的tab选项
				currentSwiper: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				data: [],
				isEmpty: [false, false], //数据是否为空
				triggered: false, //下拉刷新是否被触发
			}
		},
		computed: {
			emityTxt() {
				return this.currentSwiper == 0 ? '未发布招聘信息' : '未发布求职信息'
			}
		},
		mounted() {
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
			getData() {
				this.loading = true
				this.$cloudRequest.job.call('recruit/myList').then(res => {
					let {
						code,
						msg,
						data
					} = res
					if (code == 200) {
						data = this.currentSwiper == 0 ? data : []
						this.$set(this.data, this.currentSwiper, data)
						this.$set(this.isEmpty, this.currentSwiper, data.length ? false : true)
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
