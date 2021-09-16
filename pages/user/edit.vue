<template>
	<view class="user-info-page">
		<scroll-view scroll-y="true" class="info-wrap">
			<view class="info-split">
				基本信息
			</view>
			<view class="info-item flex align-center justify-between" @click="uploadAvatar">
				<text class="item-type">用户头像</text>
				<view class="flex align-center">
					<image v-if="editInfo.avatar" class="item-img" :src="editInfo.avatar" mode=""></image>
					<text v-else class="item-val flex flex-sub" :class="{'item-no-val': !editInfo.gender}">请上传头像</text>
					<u-icon name="arrow-right" color='#bfbfbf' size="22"></u-icon>
				</view>
			</view>
			<view class="info-item flex align-center justify-between">
				<text class="item-type">真实姓名</text>
				<u-input class="item-val flex flex-sub" v-model="editInfo.realname" type="text" input-align='right'
					placeholder="请输入真实姓名" placeholder-style='color:#999;' />
			</view>
		<!-- 	<view class="info-item flex align-center justify-between">
				<text class="item-type">身份证</text>
				<u-input class="item-val flex flex-sub" v-model="editInfo.id_card" type="idcard" input-align='right'
					placeholder="请输入身份证" placeholder-style='color:#999;' @input="changeCardID" />
			</view> -->
			<view class="info-item flex align-center justify-between">
				<text class="item-type">用户名</text>
				<u-input class="item-val flex flex-sub" v-model="editInfo.nickname" type="text" input-align='right'
					placeholder="请输入用户名" placeholder-style='color:#999;' />
			</view>
			<view class="info-item flex align-center justify-between" @click="showSelector('genderPicker')">
				<text class="item-type">性别</text>
				<text class="item-val flex flex-sub" :class="{'item-no-val': !editInfo.gender}">
					<template v-if="editInfo.gender">{{editInfo.gender | flGenderInfo}}</template>
					<template v-else>请选择性别</template>
				</text>
				<u-icon name="arrow-right" color='#bfbfbf' size="22"></u-icon>
			</view>
			<view class="info-item flex align-center justify-between" @click="showDatePicker('birthdayPicker')">
				<text class="item-type">生日</text>
				<text class="item-val flex flex-sub" :class="{'item-no-val': !editInfo.birthday}">
					<template v-if="editInfo.birthday">{{editInfo.birthday | date('yyyy-mm-dd')}}</template>
					<template v-else>请选择生日</template>
				</text>
				<u-icon name="arrow-right" color='#bfbfbf' size="22"></u-icon>
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
			<view class="info-item flex align-center justify-between" @click="isSettingLocationAuthorize">
				<text class="item-type">家庭住址</text>
				<text class="item-val flex flex-sub text-cut" :class="{'item-no-val': !editInfo.address}">
					<template v-if="editInfo.address">{{editInfo.address}}</template>
					<template v-else>请选择家庭住址</template>
				</text>
				<u-icon name="arrow-right" color='#bfbfbf' size="22"></u-icon>
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
			<view class="info-item flex align-center justify-between" @click="showSchoolPopup">
				<text class="item-type">毕业院校</text>
				<text class="item-val flex flex-sub text-cut" :class="{'item-no-val': !editInfo.edu_school}">
					<template v-if="editInfo.edu_school">{{editInfo.edu_school}}</template>
					<template v-else>请选择毕业院校</template>
				</text>
				<u-icon name="arrow-right" color='#bfbfbf' size="22"></u-icon>
			</view>
			<view class="info-item flex align-center justify-between" @click="showSelector('eduQualificationPicker')">
				<text class="item-type">学历</text>
				<text class="item-val flex flex-sub text-cut" :class="{'item-no-val': !editInfo.edu_qualification}">
					<template v-if="editInfo.edu_qualification">{{editInfo.edu_qualification | flEducationInfo}}</template>
					<template v-else>请选择学历</template>
				</text>
				<u-icon name="arrow-right" color='#bfbfbf' size="22"></u-icon>
			</view>
			<!-- <view class="info-item flex align-center justify-between" @click="showDatePicker('eduGraduatedTimePicker')">
				<text class="item-type">毕业时间</text>
				<text class="item-val flex flex-sub" :class="{'item-no-val': !editInfo.edu_graduated_time}">
					<template
						v-if="editInfo.edu_graduated_time">{{editInfo.edu_graduated_time | date('yyyy年mm月')}}</template>
					<template v-else>请选择毕业时间</template>
				</text>
				<u-icon name="arrow-right" color='#bfbfbf' size="22"></u-icon>
			</view> -->
		</scroll-view>
		<view class="bottom-btn flex align-center justify-center">
			<button class="opt-btn cu-btn round" :disabled='btnLoading' @click="toSave">
				<text v-if="btnLoading" class="cuIcon-loading2 cuIconfont-spin"></text> 保存信息</button>
		</view>
		<!--信息下拉选择器-->
		<u-select :title='infoSelector.title' v-model="infoSelector.visiable" :default-value="infoSelector.defalut"
			mode="single-column" :list="infoSelector.columns" label-name='text' @confirm="confirmSelector($event,infoSelector.key)"
			confirm-color='#79C58A'>
		</u-select>
		<!--日期选择器-->
		<u-picker v-model="datePicker.visiable" mode="time" :default-time='datePicker.value'
			:start-year='datePicker.minDate' :end-year='datePicker.maxDate' :params="datePicker.params"
			@confirm="confirmDatePicker($event,datePicker.key)" confirm-color='#79C58A'></u-picker>
		<!--popup面板选择器-->
		<u-popup mode="right" v-model="schoolPopup.visiable" border-radius="20">
			<view class="popup-content">
				<u-search placeholder="请输入院校" v-model="schoolPopup.value" @change="searchSchool" @custom="confirmSchool"
					shape="square" :clearabled='false' search-icon='edit-pen' bg-color='#f8f9fa' action-text='确定'
					:action-style="{color:'#79C58A'}">
				</u-search>
				<scroll-view scroll-y="true" style="height: calc(100vh - 100rpx);">
					<view class="school-list">
						<view class="school-item" v-for="(item,index) in schoolPopup.schoolList" :key='index'
							@click="handleSchool(item)">
							<view class="item-name text-cut" v-html="addColorSchool(item.name)"></view>
						</view>
					</view>
				</scroll-view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	import * as ENUM from '@/common/js/enum.js'
	import {
		cardIdSex,
		cardIdBirthday
	} from '@/common/js/utils.js'
	const genderPicker = {
		key: "gender",
		title: "选择性别",
		columns: ENUM.SET_GENDER_INFO()
	};
	const eduQualificationPicker = {
		key: 'edu_qualification',
		title: '请选择学历',
		columns: ENUM.SET_EDUCATION_INFO()
	}
	const birthdayPicker = {
		key: "birthday",
		title: "选择时间",
		params: {
			year: true,
			month: true,
			day: true,
		}
	};
	const eduGraduatedTimePicker = {
		key: "edu_graduated_time",
		title: "选择时间",
		params: {
			year: true,
			month: true,
		}
	};
	export default {
		data() {
			return {
				genderPicker,
				eduQualificationPicker,
				birthdayPicker,
				eduGraduatedTimePicker,
				btnLoading: false,
				editInfo: {},
				infoSelector: {
					//信息选择器弹窗
					defalut: '', //默认值
					visiable: false,
					title: "",
					key: "",
					columns: []
				},
				datePicker: {
					//日期选择器
					visiable: false,
					value: "",
					key: '',
					params: {},
					minDate: "1930",
					maxDate: new Date().getFullYear()
				},
				schoolPopup: {
					//选择学校弹出层
					visiable: false,
					value: '',
					schoolList: []
				},
			}
		},
		computed: {
			...mapGetters('user', ['userInfo', 'isLogin'])
		},
		mounted() {
			this.$nextTick(() => {
				Object.keys(this.userInfo).forEach(key => {
					this.$set(this.editInfo, key, this.userInfo[key])
				})
			})
		},
		methods: {
			...mapMutations('user', ['setUserInfo']),
			//打开选择学校弹窗
			showSchoolPopup() {
				this.schoolPopup.value = this.editInfo.edu_school;
				this.schoolPopup.visiable = true;
				this.searchSchool()
			},
			//查询学校
			searchSchool() {
				if (!this.schoolPopup.value) {
					this.schoolPopup.schoolList = []
					return
				}
				this.$cloudRequest.job.call('basic/school/graduateList', {
					name: this.schoolPopup.value
				}).then(res => {
					let {
						code,
						msg,
						data
					} = res
					if (code == 200) {
						this.schoolPopup.schoolList = data;
					}
				})
			},
			//确定学校
			confirmSchool(val) {
				this.editInfo.edu_school = val;
				this.schoolPopup.visiable = false;
			},
			//点击学校
			handleSchool(item) {
				this.schoolPopup.value = item.name;
			},
			//给学校加颜色
			addColorSchool(name) {
				let p_str = this.schoolPopup.value
				let outp_str = name.replace(new RegExp(p_str, 'g'),
					`<span style="color: #79C58A;font-size:bold;">${p_str}</span>`)
				return outp_str
			},
			//展示下拉选择器
			showSelector(picker) {
				this.infoSelector.default = [this.editInfo[this[picker].key]];
				this.infoSelector.title = this[picker].title;
				this.infoSelector.columns = this[picker].columns;
				this.infoSelector.key = this[picker].key;
				this.infoSelector.visiable = true
			},
			//确定选择
			confirmSelector(data, key) {
				this.$set(this.editInfo, key, data[0].value)
			},
			//显示生日选择器
			showDatePicker(picker) {
				this.datePicker.visiable = true;
				this.datePicker.key = this[picker].key;
				this.datePicker.params = this[picker].params;
				this.datePicker.value = this.$u.timeFormat(this.editInfo[this[picker].key], 'yyyy-mm-dd')
			},
			//确认出生日期
			confirmDatePicker(time, key) {
				let timeArr = []
				Object.keys(time).forEach(key => {
					timeArr.push(time[key])
				})
				let timeStr = timeArr.join('-')
				this.$set(this.editInfo, key, new Date(timeStr).getTime())
			},
			//更改证件号   身份证填充性别及生日
			changeCardID() {
				let idCard = this.editInfo.id_card;
				if (this.$u.test.idCard(idCard) === true) {
					this.$set(
						this.editInfo,
						"gender",
						cardIdSex(idCard) == "男" ? 1 : 2
					);
					this.$set(
						this.editInfo,
						"birthday",
						new Date(cardIdBirthday(idCard)).getTime()
					);
				}
			},
			//上传头像
			uploadAvatar() {
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
			//判断是否设置过授权定位信息
			isSettingLocationAuthorize(a = 'scope.userLocation') {
				uni.getSetting({
					success: (res) => {
						if (!res.authSetting[a]) {
							this.getAuthorizeInfo()
						} else {
							this.chooseLocation()
						}
					}
				})
			},
			//获取授权信息
			getAuthorizeInfo(a = 'scope.userLocation') {
				uni.authorize({
					scope: a,
					success: () => { //1.1 允许授权
						this.chooseLocation();
					},
					fail: () => { //1.2 拒绝授权
						uni.showModal({
							title: '已拒绝授权，无法获取当前位置信息',
							content: '是否重新打开授权设置？',
							success: (res) => {
								if (res.confirm) {
									uni.openSetting({
										success: (res) => {
											if (res.authSetting[
													'scope.userLocation']) {
												this.chooseLocation()
											}
										}
									})
								} else if (res.cancel) {
									uni.showToast({
										title: '您拒绝了授权，无法获取当前位置信息',
										icon: 'none',
										duration: 2000
									})
								}
							}
						});
					}
				})
			},
			//获取用户当前定位
			getUserLocation() {
				uni.getLocation({
					type: 'gcj02',
					success: (locationRes) => {
						this.sureAddress(locationRes)
					},
					fail: () => {
						uni.showToast({
							title: '获取当前位置信息失败',
							icon: 'none',
							duration: 2000
						})
					}
				})
			},
			//确定家庭住址
			sureAddress(location) {
				uni.chooseLocation({
					latitude: location.latitude,
					longitude: location.longitude,
					success: (choooseRes) => {
						if (choooseRes.address && choooseRes.name) {
							this.editInfo.address = choooseRes.address + choooseRes.name;
						}
						this.editInfo.geo_location = {
							latitude: choooseRes.latitude,
							longitude: choooseRes.longitude,
						}
						uni.request({
							header: {
								"Content-Type": "application/text"
							},
							url: `https://restapi.amap.com/v3/geocode/regeo?output=JSON&location=${choooseRes.longitude},${choooseRes.latitude}&key=d27c8c33e47aea8fa848fb2d2b1d365c`,
							success: (res) => {
								let {
									statusCode,
									data
								} = res
								if (statusCode === 200) {
									if (data.status == 1) {
										let citysMap = ['北京市', '上海市', '天津市',
											'重庆市'
										];
										let addressComponent = data.regeocode
											.addressComponent
										this.editInfo.country =
											addressComponent.country
										this.editInfo.province =
											addressComponent.province
										this.editInfo.city = addressComponent
											.city
										this.editInfo.district =
											addressComponent.district
										if (citysMap.indexOf(this.editInfo
												.province) > -1) {
											this.editInfo.city = this.editInfo
												.province;
										}
									}
								} else {
									uni.showToast({
										title: '解析位置信息失败，请重试！',
										icon: 'none',
										duration: 2000
									})
								}
							},
						});
					},
				});
			},
			//选择位置
			chooseLocation() {
				//判断是否上传过定位
				if (this.$u.test.isEmpty(this.editInfo.geo_location)) {
					this.getUserLocation()
				} else {
					this.sureAddress(this.editInfo.geo_location)
				}
			},
			//选择学校
			toChooseSchool() {
				uni.navigateTo({
					url: '/pages/user/school'
				})
			},
			//保存信息
			toSave() {
				if (this.editInfo.id_card && !this.$u.test.idCard(this.editInfo.id_card)) {
					uni.showToast({
						title: '请输入正确的身份证号',
						icon: 'none',
						duration: 2000
					})
					return
				}
				if (this.editInfo.mobile && !this.$u.test.mobile(this.editInfo.mobile)) {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none',
						duration: 2000
					})
					return
				}
				if (this.editInfo.email && !this.$u.test.email(this.editInfo.email)) {
					uni.showToast({
						title: '请输入正确的邮箱',
						icon: 'none',
						duration: 2000
					})
					return
				}
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
