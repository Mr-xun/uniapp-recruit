<template>
	<view class="user-info-page">
		<scroll-view scroll-y="true" class="info-wrap">
			<view class="info-split">
				基本信息
			</view>
			<view class="info-item flex align-center justify-between">
				<text class="item-type">用户头像</text>
				<image class="item-img" :src="editInfo.avatar" mode="" @click="uploadAvatar"></image>
			</view>
			<view class="info-item flex align-center justify-between">
				<text class="item-type">真实姓名</text>
				<u-input class="item-val flex flex-sub" v-model="editInfo.realname" type="text" input-align='right'
					placeholder="请输入真实姓名" placeholder-style='color:#999;' />
			</view>
			<view class="info-item flex align-center justify-between">
				<text class="item-type">身份证</text>
				<u-input class="item-val flex flex-sub" v-model="editInfo.id_card" type="idcard" input-align='right'
					placeholder="请输入身份证" placeholder-style='color:#999;' />
			</view>
			<view class="info-item flex align-center justify-between">
				<text class="item-type">用户名</text>
				<u-input class="item-val flex flex-sub" v-model="editInfo.nickname" type="text" input-align='right'
					placeholder="请输入用户名" placeholder-style='color:#999;' />
			</view>
			<view class="info-item flex align-center justify-between">
				<text class="item-type">性别</text>
				<text class="item-val flex flex-sub" :class="{'item-no-val': !editInfo.gender}"
					@click="showGenderSelect('sexPicker')">
					<template v-if="editInfo.gender">{{editInfo.gender | flGender}}</template>
					<template v-else>请选择性别</template>
				</text>
				<u-icon name="arrow-right" color='#bfbfbf' size="22"></u-icon>
			</view>
			<view class="info-item flex align-center justify-between">
				<text class="item-type">生日</text>
				<text class="item-val flex flex-sub" :class="{'item-no-val': !editInfo.birthday}">
					<template v-if="editInfo.birthday">{{editInfo.birthday | date('yyyy-mm-dd')}}</template>
					<template v-else>请选择生日</template>
				</text>
				<u-icon name="arrow-right" color='#bfbfbf' size="22"></u-icon>
			</view>
			<view class="info-item flex align-center justify-between">
				<text class="item-type">年龄</text>
				<u-input class="item-val flex flex-sub" v-model="editInfo.age" type="number" input-align='right'
					placeholder="请输入年龄" />
			</view>
			<view class="info-split">
				联系方式
			</view>
			<view class="info-item flex align-center justify-between">
				<text class="item-type">手机号</text>
				<u-input class="item-val flex flex-sub" v-model="editInfo.mobile" type="tel" input-align='right'
					placeholder="请输入手机号" />
			</view>
			<view class="info-item flex align-center justify-between">
				<text class="item-type">微信号</text>
				<u-input class="item-val flex flex-sub" v-model="editInfo.weixin" type="text" input-align='right'
					placeholder="请输入微信号" />
			</view>
			<view class="info-item flex align-center justify-between">
				<text class="item-type">邮箱</text>
				<u-input class="item-val flex flex-sub" v-model="editInfo.email" type="emial" input-align='right'
					placeholder="请输入邮箱" />
			</view>
			<view class="info-item flex align-center justify-between">
				<text class="item-type">家庭住址</text>
				<text class="item-val">{{editInfo.address}}</text>
			</view>
			<view class="info-split">
				职业技能
			</view>
			<view class="info-item flex align-center justify-between">
				<text class="item-type">工作年限</text>
				<text class="item-val">{{editInfo.work_years}}</text>
			</view>
			<view class="info-item flex align-center justify-between">
				<text class="item-type">技术/技能</text>
				<text class="item-val">{{editInfo.work_skill}}</text>
			</view>
			<view class="info-split">
				教育经历
			</view>
			<view class="info-item flex align-center justify-between">
				<text class="item-type">毕业院校</text>
				<text class="item-val">{{editInfo.edu_school}}</text>
			</view>
			<view class="info-item flex align-center justify-between">
				<text class="item-type">学历</text>
				<text class="item-val">{{editInfo.edu_qualification}}</text>
			</view>
			<view class="info-item flex align-center justify-between">
				<text class="item-type">毕业时间</text>
				<text class="item-val">{{editInfo.edu_graduated_time}}</text>
			</view>
		</scroll-view>
		<view class="bottom-btn flex align-center justify-center">
			<button class="opt-btn cu-btn round" :disabled='btnLoading' @click="toSave">
				<text v-if="btnLoading" class="cuIcon-loading2 cuIconfont-spin"></text> 保存信息</button>
		</view>
		<u-select title='选择性别' v-model="infoSelector.visiable" :default-value="[editInfo.gender?editInfo.gender-1:0]"
			mode="single-column" :list="infoSelector.columns" @confirm="confirmSelect($event,infoSelector.key)"
			confirm-color='#79C58A'>
		</u-select>

	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	import * as ENUM from '@/common/js/enum.js'
	const sexPicker = {
		key: "gender",
		title: "选择性别",
		columns: ENUM.GENDER
	};
	export default {
		data() {
			return {
				sexPicker,
				btnLoading: false,
				editInfo: {},
				infoSelector: {
					//信息选择器弹窗
					visiable: false,
					title: "",
					key: "",
					columns: []
				},
			}
		},
		computed: {
			...mapGetters('user', ['userInfo', 'isLogin'])
		},
		mounted() {
			Object.keys(this.userInfo).forEach(key => {
				this.$set(this.editInfo, key, this.userInfo[key])
			})
		},
		methods: {
			...mapMutations('user', ['setUserInfo']),
			showGenderSelect(picker) {
				this.infoSelector.visiable = true
				this.infoSelector.title = this[picker].title;
				this.infoSelector.columns = this[picker].columns;
				this.infoSelector.key = this[picker].key;
			},
			confirmSelect(data, key) {
				this.editInfo[key] = data[0].value
			},
			//上传图片
			uploadAvatar() {
				new Promise((resolve, reject) => {
					uni.chooseImage({
						count: 1,
						success: (res) => {
							console.log(res, 123)
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
					console.log(res, 444);
					this.editInfo.avatar = res.fileID
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
			//保存信息
			toSave() {
				let userInfo = {
					birthday: new Date('1996-04-30'),
					realname: '荀潇 ' + this.$u.timeFormat(new Date(), 'mm-dd hh:MM:ss'),
					mobile: '17810104418',
					address: '北京市蒲安西里2号楼 ' + this.$u.timeFormat(new Date(), 'mm-dd hh:MM:ss'),
				}
				this.editInfo = Object.assign(this.editInfo, userInfo)
				if (this.btnLoading) return
				this.btnLoading = true
				this.$cloudRequest.user.call('user/updateInfo', this.editInfo).then(res => {
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
		color: #303133;
		text-align: right;
		display: inline-block;

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
