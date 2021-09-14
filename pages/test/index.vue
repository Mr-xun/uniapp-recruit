<template>
	<view class="my-page text-center">
		<view class="text-container">
			<view>用户：{{userInfo.nickname || userInfo.nickName || ''}}</view>
			<u-avatar v-if="userInfo.avatar" :src="userInfo.avatar" mode="square" size="200" show-sex
				:sex-icon="userInfo.gender ==1?'man':'woman'"></u-avatar>
			<view class="margin-bottom-sm">
				<!-- <u-button type="success" ripple  @click="getUserInfo()">获取默认信息</u-button> -->
			</view>
			<view class="margin-bottom-sm">
				<u-button type="success" ripple @click="loginOrRegister()">注册或登录</u-button>
			</view>
			<view class="margin-bottom-sm">
				<u-button type="success" ripple @click="updateUserInfo()">同步微信信息</u-button>
			</view>
			<view class="margin-bottom-sm">
				<u-button type="success" ripple open-type="getPhoneNumber" @getphonenumber="getphonenumber()">获取手机号
				</u-button>
			</view>
			<view class="margin-bottom-sm">
				<u-button type="success" ripple @click="addMerchant()">同步位置并添加模拟商户</u-button>
			</view>
			<view class="margin-bottom-sm">
				<u-button type="success" ripple @click="addCuisine()">添加模拟菜系</u-button>
			</view>
			<view class="margin-bottom-sm">
				<u-button type="success" ripple @click="publishRecruit()">发布信息</u-button>
			</view>
			<view class="margin-bottom-sm">
				<u-button type="success" ripple @click="asyncAllSchool()">同步院校</u-button>
			</view>
			<view class="margin-bottom-sm">
				<u-button type="success" ripple @click="asyncUniversitySchool()">同步高校院校</u-button>
			</view>
			<view class="margin-bottom-sm">
				<u-button type="success" ripple @click="asyncPrimarySchool()">同步中小学幼儿园院校</u-button>
			</view>
			<view class="margin-bottom-sm">
				<u-button type="success" ripple @click="grapGaoKaoSchool()">抓取高效数据</u-button>
			</view>
			<view class="margin-bottom-sm">
				<u-button type="success" ripple @click="dealSchool()">处理院校信息</u-button>
			</view>
			<view class="margin-bottom-sm">
				<u-button type="success" ripple @click="getMiddleSchool()">获取当前中小学数量</u-button>
			</view>
			<view class="margin-bottom-sm">
				<u-button type="success" ripple @click="getGraduateList()">获取毕业院校列表</u-button>
			</view>
			<!-- 	<view class="margin-bottom-sm">
					<u-button type="success" ripple @click="asyncPost()">同步职位</u-button>
				</view> -->
			<view class="margin-bottom-sm">
				<u-button type="success" ripple @click="getLocation()">获取当前位置</u-button>
			</view>
			<view class="margin-bottom-sm">
				<u-button type="success" ripple @click="chooseLocation()">选择位置</u-button>
			</view>
			<view class="margin-bottom-sm">
				<u-button type="success" ripple @click="openLocation()">查看位置</u-button>
			</view>
			<view class="margin-bottom-sm">
				<u-button type="success" ripple @click="uploadImg()">上传图片</u-button>
			</view>
			<view class="margin-bottom-sm">
				<u-button type="success" ripple @click="uploadVideo()">上传视频</u-button>
			</view>
			<view class="margin-bottom-sm">
				<u-button type="success" ripple @click="userLogout()">退出登录</u-button>
			</view>

			<view class="margin-bottom-sm" v-if="uploadImageUrl">
				<u-image width="100%" height="300rpx" :src="uploadImageUrl" mode="widthFix"></u-image>
			</view>
			<view class="margin-bottom-sm" v-if="uploadVideoUrl">
				<video id="myVideo" :src="uploadVideoUrl"></video>
			</view>
			<!-- <map style="width: 100%; height: 300px;" :latitude="latitude" :longitude="longitude" :markers="covers"
					@markertap='clickMarker'>
				</map> -->
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapActions,
		mapGetters
	} from 'vuex'
	import apiCloud from "../../common/js/apiCloud.js"
	export default {
		computed:{
			...mapState('setting', ['tabbar'])
		},
		data() {
			return {
				userInfo: {},
				uploadImageUrl: '', //上传的文件
				uploadVideoUrl: '', //上传的视频
				id: 0, // 使用 marker点击事件 需要填写id
				title: 'map',
				latitude: 39.909,
				longitude: 116.39742,
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
		onLoad() {},
		methods: {
			...mapMutations('user', ['setAccessToken', 'setTokenExpireTime', 'setUserInfo', 'logout']),
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
			},
			//登录或注册
			loginOrRegister() {
				uni.showLoading({
					title: '加载中'
				});
				uni.login({
					provider: "weixin",
					success: (res) => {
						this.$cloudRequest.user.call('user/loginOrRegister', {
							code: res.code
						}).then(res => {
							let {
								code,
								msg,
								data
							} = res;
							if (code == 200) {
								this.userInfo = data.userInfo
								this.setAccessToken(data.token)
								this.setTokenExpireTime(data.tokenExpired)
								this.setUserInfo(data.userInfo)
								uni.showToast({
									icon: 'success',
									title: '登录成功'
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
				})
			},

			//更新微信信息
			updateUserInfo() {
				uni.showLoading({
					title: '加载中'
				});
				uni.getUserProfile({
					desc: '我想要你的基本信息',
					lang: "zh_CN",
					success: (res) => {
						let userInfo = res.userInfo;
						this.$cloudRequest.user.call('user/updateInfo', userInfo).then(res => {
							let {
								code,
								msg,
								data
							} = res;
							if (code == 200) {
								this.userInfo = data
								uni.showToast({
									icon: 'success',
									title: '更新信息成功'
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
				})
			},
			//获取手机号
			getphonenumber(e) {
				console.log(e, 111)
			},
			//添加商户
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
				uni.showLoading({
					title: '加载中'
				});
				this.$cloudRequest.food.call('cuisine/add').then(res => {
					console.log(res)
					let {
						code,
						msg
					} = res
					if (code == 200) {
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
				}).catch(err => {
					uni.hideLoading()
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
			//上传视频
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
			},
			//发布信息
			publishRecruit() {
				uni.showLoading({
					title: '加载中'
				});
				this.$cloudRequest.job.call('recruit/publish').then(res => {
					console.log(res, 11)
					let {
						code,
						msg
					} = res
					if (code == 200) {
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
			//同步院校
			asyncAllSchool() {
				uni.showLoading({
					title: '同步中'
				});
				this.$cloudRequest.job.call('basic/school/asyncAllSchool').then(res => {
					console.log(res, 11)
					let {
						code,
						msg
					} = res
					if (code == 200) {
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
			//同步高校院校
			asyncUniversitySchool() {
				uni.showLoading({
					title: '同步中'
				});
				this.$cloudRequest.job.call('basic/school/asyncUniversitySchool').then(res => {
					console.log(res, 11)
					let {
						code,
						msg
					} = res
					if (code == 200) {
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
			//同步中小学院校
			asyncPrimarySchool() {
				uni.showLoading({
					title: '同步中'
				});
				this.$cloudRequest.job.call('basic/school/asyncPrimarySchool').then(res => {
					let {
						code,
						msg
					} = res
					if (code == 200) {
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
			//抓取高效数据
			grapGaoKaoSchool() {
				uni.showLoading({
					title: '同步中'
				});
				this.$cloudRequest.job.call('basic/school/grapGaoKaoSchool').then(res => {
					let {
						code,
						msg
					} = res
					if (code == 200) {
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
			//处理院校信息
			dealSchool() {
				uni.showLoading({
					title: '同步中'
				});
				this.$cloudRequest.job.call('basic/school/dealData').then(res => {
					console.log(res, 11)
					let {
						code,
						msg
					} = res
					if (code == 200) {
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
			//获取当前中小学数量
			getMiddleSchool() {
				uni.showLoading({
					title: '查询中'
				});
				this.$cloudRequest.job.call('basic/school/middleSchoolCount').then(res => {
					console.log(res, 11)
					let {
						code,
						msg
					} = res
					uni.showToast({
						title: msg,
						icon: 'none',
						duration: 2000
					});
					uni.hideLoading()
				})
			},
			//获取毕业院校列表
			getGraduateList() {
				uni.showLoading({
					title: '查询中'
				});
				this.$cloudRequest.job.call('basic/school/graduateList', {
					name: '青岛科技大学'
				}).then(res => {
					console.log(res, 11)
					let {
						code,
						msg
					} = res
					if (code == 200) {
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
			//同步职位
			asyncPost() {
				uni.showLoading({
					title: '同步中'
				});
				this.$cloudRequest.job.call('basic/post/asyncData').then(res => {
					console.log(res, 11)
					let {
						code,
						msg
					} = res
					if (code == 200) {
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

			//退出登录
			userLogout() {
				this.logout()
				uni.showToast({
					title: '退出登录'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.btn-test {
		margin-bottom: 10rpx;
		;
	}
</style>
