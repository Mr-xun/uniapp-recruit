<!--新增/编辑公司-->
<template>
	<view class="company-edit-page">
		<scroll-view scroll-y="true" class="info-wrap">
			<view class="info-split">
				基本信息
			</view>
			<view class="info-item flex align-center justify-between" @click="uploadLogo">
				<text class="item-type">公司/门店LOGO</text>
				<view class="flex align-center">
					<image v-if="infoForm.logo" class="item-img" :src="infoForm.logo" mode=""></image>
					<text v-else class="item-val flex flex-sub" :class="{'item-no-val': !infoForm.logo}">请上传LOGO</text>
					<u-icon name="arrow-right" color='#bfbfbf' size="22"></u-icon>
				</view>
			</view>
			<view class="info-item flex align-center justify-between">
				<text class="item-type">公司/门店名称</text>
				<u-input class="item-val flex flex-sub" v-model="infoForm.realname" type="text" input-align='right'
					:clearable="false" placeholder="请输入公司/门店名称" placeholder-style='color:#999;' />
			</view>
			<view class="info-item flex align-center justify-between">
				<text class="item-type">所在行业</text>
				<picker @change="industryChange" :value="industryPicker.index" :range="industryPicker.range">
					<text class="item-val flex flex-sub" :class="{'item-no-val': !(industryPicker.index>=0)}">
						<template
							v-if="industryPicker.index>=0">{{industryPicker.range[industryPicker.index]}}</template>
						<template v-else>请选择所在行业</template>
					</text>
					<u-icon name="arrow-right" color='#bfbfbf' size="22"></u-icon>
				</picker>
			</view>
			<view class="info-item flex align-center justify-between">
				<text class="item-type">人员规模</text>
				<picker @change="industryChange" :value="companySizePicker.index" :range="companySizePicker.range"
					range-key="text">
					<text class="item-val flex flex-sub" :class="{'item-no-val': !(companySizePicker.index>=0)}">
						<template
							v-if="companySizePicker.index>=0">{{companySizePicker.range[companySizePicker.index]}}</template>
						<template v-else>请选择人员规模</template>
					</text>
					<u-icon name="arrow-right" color='#bfbfbf' size="22"></u-icon>
				</picker>
			</view>
			<view class="info-item flex align-center justify-between">
				<text class="item-type">公司/门店性质</text>
				<picker @change="industryChange" :value="companyNaturePicker.index" :range="companyNaturePicker.range"
					range-key="text">
					<text class="item-val flex flex-sub" :class="{'item-no-val': !(companyNaturePicker.index>=0)}">
						<template
							v-if="companyNaturePicker.index>=0">{{companyNaturePicker.range[companyNaturePicker.index]}}</template>
						<template v-else>请选择公司/门店性质</template>
					</text>
					<u-icon name="arrow-right" color='#bfbfbf' size="22"></u-icon>
				</picker>
			</view>
			<view class="info-item flex align-center justify-between">
				<text class="item-type">公司/门店福利</text>
				<u-input class="item-val flex flex-sub" v-model="infoForm.realname" type="text" input-align='right'
					placeholder="请输入公司/门店福利" placeholder-style='color:#999;' />
			</view>
			<view class="info-item flex align-center justify-between">
				<text class="item-type">公司/门店介绍</text>
				<u-input class="item-val flex flex-sub" v-model="infoForm.realname" type="text" input-align='right'
					placeholder="请输入公司/门店介绍" placeholder-style='color:#999;' />
			</view>
			<view class="info-item flex align-center justify-between">
				<text class="item-type">公司/门店环境</text>
				<u-input class="item-val flex flex-sub" v-model="infoForm.realname" type="text" input-align='right'
					placeholder="请输入公司/门店环境" placeholder-style='color:#999;' />
			</view>
			<view class="info-item flex align-center justify-between">
				<text class="item-type">公司/门店地址</text>
				<u-input class="item-val flex flex-sub" v-model="infoForm.realname" type="text" input-align='right'
					placeholder="请输入公司/门店地址" placeholder-style='color:#999;' />
			</view>
			<view class="info-split">
				招聘联系人
			</view>
			<view class="info-item flex align-center justify-between">
				<text class="item-type">联系人</text>
				<u-input class="item-val flex flex-sub" v-model="infoForm.realname" type="text" input-align='right'
					placeholder="请输入联系人" placeholder-style='color:#999;' />
			</view>
			<view class="info-item flex align-center justify-between">
				<text class="item-type">联系电话</text>
				<u-input class="item-val flex flex-sub" v-model="infoForm.realname" type="number" input-align='right'
					placeholder="请输入联系电话" placeholder-style='color:#999;' />
			</view>
			<view class="info-item flex align-center justify-between">
				<text class="item-type">电子邮件</text>
				<u-input class="item-val flex flex-sub" v-model="infoForm.realname" type="text" input-align='right'
					placeholder="请输入电子邮件" placeholder-style='color:#999;' />
			</view>
			<view class="info-item flex align-center justify-between">
				<text class="item-type">微信号</text>
				<u-input class="item-val flex flex-sub" v-model="infoForm.realname" type="text" input-align='right'
					placeholder="请输入微信号" placeholder-style='color:#999;' />
			</view>
		</scroll-view>
		<view class="bottom-btn flex align-center justify-center">
			<button class="opt-btn cu-btn round" :disabled='btnLoading' @click="toSave">
				<text v-if="btnLoading" class="cuIcon-loading2 cuIconfont-spin"></text> 保存信息</button>
		</view>
	</view>
</template>

<script>
	import * as ENUM from '@/common/js/enum.js'
	export default {
		data() {
			return {
				type: '',
				id: '',
				btnLoading: false,
				infoForm: {},
				industryPicker: { //行业分类
					range: [],
					index: -1
				},
				companySizePicker: { //公司规模
					range: ENUM.ENUM_COMPANY_SIZE,
					index: -1
				},
				companyNaturePicker: { //公司性质
					range: ENUM.ENUM_COMPANY_NATURE,
					index: -1
				}
			}
		},
		onLoad(options) {
			this.type = options.type;
			this.id = options.id || null;
		},
		onReady() {
			this.getIndustryTree()
		},
		methods: {
			//上传logo
			uploadLogo() {
				new Promise((resolve, reject) => {
					uni.chooseImage({
						count: 1,
						success: (res) => {
							let path = res.tempFilePaths[0];
							uni.getImageInfo({
								src: path,
								success: (info) => {
									let t = this.$u.timeFormat(new Date().getTime(),
										'yyyymmddhhMMss');
									let rand = (Math.round(Math.random() * 1000000) + '')
										.padStart(6, '0');
									let extName = info.type;
									var fileName = t + '_' + rand + '.' + extName;
									const options = {
										filePath: path,
										cloudPath: fileName
									}
									resolve(options)
								},
								fail(err) {
									reject(new Error(err.errMsg || '未能获取图片类型'))
								}
							})
						},
						fail: () => {
							reject(new Error('Fail_Cancel'))
						}
					})
				}).then(options => {
					uni.showLoading({
						title: '图片上传中...'
					})
					return uniCloud.uploadFile({
						...options,
						onUploadProgress(e) {
							console.log(e, 'process')
						}
					})
				}).then(res => {
					uni.hideLoading()
					this.infoForm.logo = res.fileID
				}).catch((err) => {
					uni.hideLoading()
					console.log(err);
					if (err.message !== 'Fail_Cancel') {
						uni.showModal({
							content: `图片上传失败，错误信息为：${err.message}`,
							showCancel: false
						})
					}
				})
			},
			industryChange(e) {
				this.industryPicker.index = e.detail.value
			},
			//获取行业分类
			getIndustryTree() {
				this.$cloudRequest.job.call('basic/industry/tree').then(res => {
					let {
						code,
						msg,
						data
					} = res
					if (code == 200) {
						this.industryPicker.range = data.map(item => item.label)
					}
				})
			},
			toSave() {},
		}
	}
</script>

<style lang="scss" scoped>
	picker {
		flex: 1;
		overflow: hidden;
		position: relative;
		text-align: right;
	}

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
		width: 120rpx;
		color: #333333;
		white-space: nowrap;
	}

	.item-val {
		color: #303133;
		text-align: right;
		display: inline-block;
		margin-left: 20rpx;

		&::placeholder {
			color: #999;
		}
	}

	.no-edit {
		color: #dbdbdb;
	}

	.item-no-val {
		text-align: right;
		color: #999;
	}

	.item-img {
		width: 64rpx;
		height: 64rpx;
		border-radius: 32rpx;
	}

	.item-arrow {
		width: 10rpx;
		height: 16rpx;
		margin-left: 10rpx;
		// background: url("./images/arrow-icon.png");
		background-size: 100% 100%;
	}

	.popup-content {
		padding: 20rpx;

		.school-item {
			font-size: 30rpx;
			padding: 0 20rpx;

			.item-name {
				padding: 8px 0;
				border-bottom: 1rpx dashed #ebeeef;
			}
		}
	}

	.bottom-btn {
		background: #ffffff;
		padding: 20rpx 20rpx 40rpx;

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
