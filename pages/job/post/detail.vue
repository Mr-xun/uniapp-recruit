<template>
	<view class="post-detail-page">
		<scroll-view scroll-y="true" class="detail-view">
			<view class="swiper-container" v-if="detailInfo.company_images">
				<u-swiper :list="detailInfo.company_images" name='url' height="300" indicator-pos="bottomRight"
					:effect3d="true" @click="previewImage"></u-swiper>
			</view>
			<view class="info-container">
				<view class="post-title flex align-center justify-between ">
					<text class="post-name">{{detailInfo.post_name}}</text>
					<text class="post-salary">
						{{detailInfo.salary}}
						<text class="post-salary-unit"
							v-if="detailInfo.salary_type ==1">&nbsp;{{detailInfo.salary_unit}}</text>
					</text>
				</view>
				<view class="post-company color-6 f26">{{detailInfo.company_name}}</view>
				<view class="demand-label-content  f24 color-9">
					<text class="text-center"
						v-if="detailInfo.demand_experience">{{detailInfo.demand_experience}}</text>
					<text class="text-center" v-if="detailInfo.demand_gender">
						<text class="label-line"></text>
						{{detailInfo.demand_gender}}
					</text>
					<text class="text-center" v-if="detailInfo.demand_age">
						<text class="label-line"></text>
						{{detailInfo.demand_age}}
					</text>
					<text class="text-center" v-if="detailInfo.demand_education">
						<text class="label-line"></text>
						{{detailInfo.demand_education}}
					</text>
					<text class="text-center" v-if="detailInfo.recruit_count">
						<text class="label-line"></text>
						招{{detailInfo.recruit_count}}人
					</text>
				</view>

			</view>
			<view class="module-contaner welfare-container " v-if="detailInfo.welfare_tags">
				<u-section title="公司福利" line-color='#79C58A' font-size="30" :right="false" :arrow="false"></u-section>
				<view class="module-content welfare-label-content f24 color-6">
					<text class="label-tag text-center" v-for="(tag,idx) in detailInfo.welfare_tags.split(',')"
						:key="idx">
						{{tag}}
					</text>
				</view>
			</view>
			<view class="module-contaner post-des-container">
				<u-section title="职位描述" line-color='#79C58A' font-size="30" :right="false" :arrow="false"></u-section>
				<view class="module-content des-content f26 color-6">
					{{detailInfo.post_content}}
				</view>
			</view>
			<view class="module-contaner address-container">
				<u-section title="工作地点" :sub-title='detailInfo.work_address' line-color='#79C58A' font-size="30">
				</u-section>
				<view class="module-content address-content">
					<map style="width: 100%; height: 100%;" latitude="39.909" longitude="116.39742">
					</map>
				</view>
			</view>
			<view class="module-contaner contact-container">
				<u-section title="联系人" line-color='#79C58A' font-size="30" :right="false"></u-section>
				<view class="module-content contact-content f26 color-6">
					<view class="contact-item flex align-center">
						<view class="contact-item-label ">
							<u-icon class="contact-item-icon" name="account" color='#89D499'></u-icon>联系人：
						</view>
						<text class="contact-item-val color-6">{{detailInfo.contact_name}}</text>
					</view>
					<view class="contact-item flex align-center">
						<view class="contact-item-label ">
							<u-icon class="contact-item-icon" name="phone" color='#89D499'></u-icon>电话：
						</view>
						<text class="contact-item-val color-6">{{detailInfo.contact_number}}</text>
					</view>
					<view class="contact-item flex align-center">
						<view class="contact-item-label ">
							<u-icon class="contact-item-icon" name="weixin-circle-fill" color='#89D499'></u-icon>微信：
						</view>
						<text class="contact-item-val color-6">{{detailInfo.contact_wechat}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="bottom-view flex align-center justify-between">
			<view class="lt-wrap flex color-6 f26">
				<!-- <view class="opt-box flex flex-direction align-center " @click="toShare">
					<u-icon class="opt-box-icon" name="share" size="28"></u-icon>
					<text class="opt-box-txt">分享</text>
				</view> -->
				<view class="opt-box flex flex-direction align-center" @click="handleCollect">
					<u-icon class="opt-box-icon" name="star" size="28"></u-icon>
					<text class="opt-box-txt">收藏</text>
				</view>
				<view class="opt-box flex flex-direction align-center" @click="copyWechat">
					<u-icon class="opt-box-icon" name="weixin-circle-fill" size="28"></u-icon>
					<text class="opt-box-txt">微信</text>
				</view>
			</view>
			<button class="opt-btn cu-btn round" @click="toCall"> 电话联系</button>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detailInfo: {}
			}
		},
		mounted() {},
		onLoad(options) {
			uni.showLoading({
				title: '加载中'
			});
			this.getDetail(options._id)
		},
		methods: {
			getDetail(_id) {
				this.$cloudRequest.job.call('recruit/detail', {
					_id
				}).then(res => {
					let {
						code,
						data,
						msg
					} = res
					console.log(res)
					if (code == 200) {
						this.detailInfo = data;
					} else {
						uni.showToast({
							title: msg,
							icon: 'none',
							duration: 2000
						});
					}
					uni.hideLoading()
				}).catch(err => {
					console.log(err)
					uni.hideLoading()
				})
			},
			//预览图片
			previewImage(index) {
				let imgUrls = this.detailInfo.company_images.map(item => item.url)
				uni.previewImage({
					current: index,
					urls: imgUrls
				})
			},
			//去分享
			toShare() {
				uni.showToast({
					title: '开发中',
					icon: 'none',
					duration: 2000
				});
			},
			//收藏
			handleCollect() {
				uni.showToast({
					title: '开发中',
					icon: 'none',
					duration: 2000
				});
			},
			//复制微信
			copyWechat() {

				if (!this.detailInfo.contact_wechat) {
					this.$refs.uToast.show({
						title: '该招聘信息未留微信号',
						type: 'error',
					})
					return
				}
				uni.setClipboardData({
					data: this.detailInfo.contact_wechat,
					success:()=> {
						uni.hideToast()
						this.$refs.uToast.show({
							title: '微信号复制成功，可前往添加哦',
							type: 'success',
							position:'bottom'
						})
					},
					fail:()=> {
						uni.hideToast()
						this.$refs.uToast.show({
							title: '复制失败',
							type: 'error',
						})
					}
				});
			},
			//电话联系
			toCall() {
				if (!this.detailInfo.contact_wechat) {
					this.$refs.uToast.show({
						title: '该招聘信息未留电话号',
						type: 'error',
					})
					return
				}
				uni.makePhoneCall({
					phoneNumber: this.detailInfo.contact_number
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.post-detail-page {
		height: 100vh;
		display: flex;
		flex-direction: column;

		.detail-view {
			flex: 1;
			box-sizing: border-box;
			overflow: auto;
			.swiper-container {
				margin-top: 0rpx;
			}

			.info-container {
				margin: 12rpx;
				background: #fff;
				border-radius: 14rpx;
				padding: 16rpx;
				box-sizing: border-box;
				box-shadow: 0 0 10rpx #ebeeef;

				.post-name {
					color: #333;
					font-size: 34rpx;
					font-weight: bold;
				}

				.post-salary {
					font-size: 32rpx;
					color: #e63500;
				}

				.post-salary-unit {
					margin-left: 8rpx;
				}

				.post-company {
					margin-top: 12rpx;
					margin-bottom: 12rpx;
				}

				.demand-label-content {
					.label-line {
						display: inline-block;
						margin: 0 8rpx;
						height: 16rpx;
						width: 1rpx;
						background: #999;
					}
				}

			}

			.module-contaner {
				background: #fff;
				padding: 20rpx;
				margin-bottom: 16rpx;
				.module-content {
					margin-top: 6rpx;
					padding: 16rpx 16rpx 0;
				}
			}

			.welfare-container {
				.welfare-label-content {
					.label-tag {
						display: inline-block;
						padding: 4rpx 8rpx;
						background: #F7F7F7;
						margin-top: 12rpx;
						margin-right: 10rpx;
						border-radius: 6rpx;
					}
				}
			}

			.address-container {
				.address-content {
					box-sizing: border-box;
					width: 100%;
					height: 300rpx;
					border-radius: 10rpx;
					overflow: hidden;
				}
			}

			.contact-container {
				.contact-item {
					margin-bottom: 8rpx;
				}

				.contact-item-label {
					margin-right: 4rpx;
					text-align: right;
				}

				.contact-item-icon {
					margin-right: 6rpx;
				}
			}
		}

		.bottom-view {
			background: #ffffff;
			padding: 20rpx 20rpx 40rpx;

			.lt-wrap {
				.opt-box {
					width: 100rpx;

				}

				.opt-box-txt {
					margin-top: 10rpx;
				}
			}

			.opt-btn {
				font-size: 28rpx;
				width: 360rpx;
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

	}
</style>
