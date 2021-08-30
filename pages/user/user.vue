<template>
	<view class="user-page ">
		<view class="user-card text-center" :style="[{paddingTop:CustomBar + 'px'}]">
			<view class="user-avator">
				<u-avatar :src="userInfo.avatar" mode="circle" size="160" :show-sex="userInfo.gender"
					:sex-icon="userInfo.gender ==1?'man':'woman'"></u-avatar>
			</view>
			<view class="user-nickname">
				<view v-if="isLogin">
					<text v-if="userInfo.nickname">{{userInfo.nickname}}</text>
					<text v-else @click="updateUserInfo">同步您的微信信息</text>
				</view>
				<view v-else>
					<button class="cu-btn round line-green  shadow" @click="loginOrRegister">立即登录</button>
				</view>
			</view>
			<view class="user-mobile" v-if="false">
				<text v-if="userInfo.mobile" class="user-mobile">{{userInfo.mobile || ''}}</text>
				<text v-else>绑定您的手机号</text>
				<text class="cuIcon-write"></text>
			</view>
		</view>
		<view class="content-container">
			<view class="content-item flex align-center">
				<image class="item-icon" src="../../static/user/icon-info.png" mode=""></image>
				<view class="item-con flex flex-sub justify-between">
					<text>个人信息</text>
					<u-icon name="arrow-right" color='#bfbfbf'></u-icon>
				</view>
			</view>
			<view class="content-item flex align-center">
				<image class="item-icon" src="../../static/user/icon-publish.png" mode=""></image>
				<view class="item-con flex flex-sub justify-between" @click="toPage('/pages/user/publish')">
					<text>我的发布</text>
					<u-icon name="arrow-right" color='#bfbfbf'></u-icon>
				</view>
			</view>
			<view class="content-item flex align-center">
				<image class="item-icon" src="../../static/user/icon-collect.png" mode=""></image>
				<view class="item-con flex flex-sub justify-between">
					<text>我的收藏</text>
					<u-icon name="arrow-right" color='#bfbfbf'></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		mapActions,
		mapMutations,
		mapGetters
	} from 'vuex'
	import apiCloud from "../../common/apiCloud.js"
	export default {

		data() {
			return {
				uploadImageUrl: '', //上传的文件
				uploadVideoUrl: '', //上传的视频
				id: 0, // 使用 marker点击事件 需要填写id
				title: 'map',
				latitude: 39.909,
				longitude: 116.39742,
				CustomBar: this.CustomBar,
				covers: [{
					latitude: 39.909,
					longitude: 116.39742,
					iconPath: '../../static/tabbar/about_cur.png'
				}, {
					latitude: 39.90,
					longitude: 116.39,
					iconPath: '../../static/tabbar/basics_cur.png'
				}]
			}
		},
		computed: {
			...mapGetters('user', ['userInfo', 'isLogin'])
		},
		onLoad() {},
		methods: {
			...mapMutations('user', ['setAccessToken', 'setTokenExpireTime', 'setUserInfo']),
			...mapActions('user', ['loginOrRegister', 'updateUserInfo']),
			toPage(path) {
				console.log(path,1)
				uni.navigateTo({
					url: path
				})
			},
			getUserInfo() {
				let _this = this;
				uni.login({
					provider: "weixin",
					success(res) {
						apiCloud.call({
							name: 'login',
							data: {
								code: res.code
							},
							success(res) {
								_this.userInfo = res.result;
								console.log('登录完成', res, _this.userInfo)
							}
						})
					}
				})
			}, //添加商户
			async addMerchant() {
				let params = {
					merchantName: '商家名称',
					merchantType: 1,
					merchantIntro: '商家介绍',
					geo_location: {
						latitude: '',
						longitude: '',
					}
				}
				uni.showLoading({
					title: '加载中'
				});
				uni.getLocation({
					type: 'gcj02',
					success: (locationRes) => {
						params.geo_location.latitude = locationRes.latitude;
						params.geo_location.longitude = locationRes.longitude;
						uni.request({
							header: {
								"Content-Type": "application/text"
							},
							url: `https://restapi.amap.com/v3/geocode/regeo?output=JSON&location=${locationRes.longitude},${locationRes.latitude}&key=d27c8c33e47aea8fa848fb2d2b1d365c`,
							success(res) {
								let {
									statusCode,
									data
								} = res
								if (statusCode === 200) {
									if (data.status == 1) {
										let citysMap = ['北京市', '上海市', '天津市', '重庆市'];

										let addressComponent = data.regeocode.addressComponent
										let formatted_address = data.regeocode.formatted_address
										params.country = addressComponent.country
										params.province = addressComponent.province
										params.city = addressComponent.city
										params.district = addressComponent.district
										params.address = formatted_address
										if (citysMap.indexOf(params.province) > -1) {
											params.city = params.province;
										}
									}
								} else {
									console.log("获取信息失败，请重试！")
								}

							},
							complete: () => {
								console.log(params, 22)
								this.$cloudRequest.food.call('merchant/add', params).then(
									res => {
										let {
											code,
											msg,
										} = res;
										console.log(res, 'merchantAdd')
										if (code == 200) {
											uni.showToast({
												icon: 'success',
												title: msg
											})

										} else {
											uni.showToast({
												title: msg
											})
										}
										uni.hideLoading()
									}).catch(err => {
									uni.hideLoading()
									uni.showModal({
										title: '提示',
										content: '系统错误:' + JSON.stringify(err),
										success: function(res) {
											if (res.confirm) {
												console.log('用户点击确定');
											} else if (res.cancel) {
												console.log('用户点击取消');
											}
										}
									});
								})
							}
						});
					},
				})

			},
			//新增菜系
			addCuisine() {
				this.$cloudRequest.food.call('cuisine/add').then(res => {
					console.log(res)
				})
			},
			clickMarker(e) {
				console.log(e)
			},
			getLocation() {
				uni.getLocation({
					type: 'wgs84',
					geocode: true,
					success: function(res) {
						console.log(res, 88)
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
						const latitude = res.latitude;
						const longitude = res.longitude;
						uni.request({
							header: {
								"Content-Type": "application/text"
							},
							//注意:这里的key值需要高德地图的 web服务生成的key  只有web服务才有逆地理编码
							url: 'https://restapi.amap.com/v3/geocode/regeo?output=JSON&location=' +
								longitude + ',' + latitude +
								'&key=d27c8c33e47aea8fa848fb2d2b1d365c&radius=1000',
							success(re) {
								console.log(re.data)
							}
						});
					}
				});
			},
			chooseLocation() {
				uni.chooseLocation({
					type: 'wgs84',
					geocode: true,
					success: function(res) {
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
					}
				});
			},
			openLocation() {
				uni.getLocation({
					type: 'gcj02', //返回可以用于uni.openLocation的经纬度
					success: function(res) {
						const latitude = res.latitude;
						const longitude = res.longitude;
						uni.openLocation({
							name: '国航世纪大厦',
							address: '亮马桥国行世纪大厦',
							latitude: latitude,
							longitude: longitude,
							success: function() {
								console.log('success');
							}
						});
					}
				});
			},
			//上传图片
			uploadImg() {
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
									console.log(fileName, 333)
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
						title: '文件上传中...'
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
					this.uploadImageUrl = res.fileID
					uni.showModal({
						content: '图片上传成功，fileId为：' + res.fileID,
						showCancel: false
					})
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
			uploadVideo() {
				new Promise((resolve, reject) => {
					uni.chooseVideo({
						count: 1,
						success: (res) => {
							console.log(res, 123)
							let path = res.tempFilePath;
							uni.getVideoInfo({
								src: path,
								success: (info) => {
									console.log(info, 78)
									let t = this.$u.timeFormat(new Date().getTime(),
										'yyyymmddhhMMss');
									let rand = (Math.round(Math.random() * 1000000) + '')
										.padStart(6, '0');
									let extName = '';
									switch (info.type) {
										case 'video/mp4':
											extName = 'mp4'
											break;
										default:
											break;
									}
									var fileName = t + '_' + rand + '.' + extName;
									const options = {
										filePath: path,
										cloudPath: fileName
									}
									console.log(fileName, 333)
									resolve(options)
								},
								fail(err) {
									reject(new Error(err.errMsg || '未能获取视频类型'))
								}
							})
						},
						fail: () => {
							reject(new Error('Fail_Cancel'))
						}
					})
				}).then(options => {
					uni.showLoading({
						title: '文件上传中...'
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
					this.uploadVideoUrl = res.fileID
					uni.showModal({
						content: '视频上传成功，fileId为：' + res.fileID,
						showCancel: false
					})
				}).catch((err) => {
					uni.hideLoading()
					console.log(err);
					if (err.message !== 'Fail_Cancel') {
						uni.showModal({
							content: `视频上传失败，错误信息为：${err.message}`,
							showCancel: false
						})
					}
				})

			}

		}
	}
</script>

<style lang="scss" scoped>
	.user-page {
		background: #fff;
		height: 100vh;
	}

	.user-card {
		width: 100vw;
		background-image: url(../../static/user/user-top.png);
		background-size: 100% 100%;
		overflow: hidden;
		padding-bottom: 70rpx;

		.user-avator {
			margin-top: 50rpx;

			/deep/ .u-avatar__img {
				border: 2rpx solid #fff;
				box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.5);
			}
		}

		.user-nickname {
			margin-top: 22rpx;
			font-size: 32rpx;
			color: #fff;
			font-weight: bold;
		}
	}

	.content-container {
		background: #fff;
		margin: 24rpx;
		border-radius: 20rpx;
		color: #666;
		padding: 0 20rpx;
		border: 0.5rpx solid #ebeeef;
		box-shadow: 0 0 10rpx #ebeeef;

		.content-item {
			height: 88rpx;
			line-height: 88rpx;

			.item-icon {
				width: 48rpx;
				height: 48rpx;
				margin-right: 16rpx;
			}

			.item-con {
				border-bottom: 0.5rpx solid #ebeeef;
			}

			&:nth-last-of-type(1) .item-con {
				border-bottom: none;
			}
		}

	}
</style>
