<template>
	<view class="publish-post-page">
		<scroll-view scroll-y="true" class="from-view">
			<view class="form-container">
				<u-form class="form-wrap" :model="form" ref="uForm" label-width="140">
					<u-form-item label="所属公司">
						<u-input v-model="form.company" placeholder="请输入公司" />
					</u-form-item>
					<u-form-item label="岗位类型">
						<u-input v-model="form.post_type" type="select" placeholder="请选择岗位类型"
							@click="postPopup.visiable = true" />
					</u-form-item>
					<u-form-item label="岗位名称">
						<u-input v-model="form.post_name" placeholder="请输入岗位名称" />
					</u-form-item>
					<u-form-item label="工资薪酬">
						<u-input v-model="form.salary_show" type="select" placeholder="请录入工资薪酬"
							@click="salarySheet.visiable = true" />
					</u-form-item>
					<u-form-item label="招聘人数">
						<u-input v-model="form.recruit_count" />
					</u-form-item>
					<u-form-item label="公司福利">
						<u-input v-model="form.welfare_tags" />
					</u-form-item>
					<u-form-item label="经验要求">
						<u-input v-model="form.demand_experience" />
					</u-form-item>
					<u-form-item label="学历要求">
						<u-input v-model="form.demand_education" type="select" placeholder="请选择性别要求"
							@click="educationSheet.visiable = true" />
					</u-form-item>
					<u-form-item label="性别要求">
						<u-input v-model="form.demand_gender" type="select" placeholder="请选择性别要求"
							@click="genderSheet.visiable = true" />
					</u-form-item>
					<u-form-item label="年龄要求">
						<u-input v-model="form.demand_age" />
					</u-form-item>
					<u-form-item label="工作地点">
						<u-input v-model="form.work_address" />
					</u-form-item>
					<u-form-item label="岗位职责">
						<u-input v-model="form.post_content" />
					</u-form-item>
				</u-form>

			</view>
		</scroll-view>
		<view class="bottom-btn flex align-center justify-center">
			<button class="opt-btn cu-btn round" :disabled='btnLoading' @click="toSubmit">
				<text v-if="btnLoading" class="cuIcon-loading2 cuIconfont-spin"></text> 提交发布</button>
		</view>
		<!--选择岗位类型——popup面板-->
		<u-popup mode="right" v-model="postPopup.visiable" border-radius="20" width='92%'>
			<view class="popup-page">
				<view class="u-menu-wrap">
					<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view"
						:scroll-top="postPopup.scrollTop">
						<view v-for="(item,index) in postPopup.treeList" :key="index" class="u-tab-item"
							:class="[postPopup.current==index ? 'u-tab-item-active' : '']" :data-current="index"
							@tap.stop="swichMenu(index)">
							<text class="u-line-1">{{item.title}}</text>
						</view>
					</scroll-view>
					<block v-for="(item,index) in postPopup.treeList" :key="index">
						<scroll-view scroll-y class="right-box" v-if="postPopup.current==index">
							<view class="page-view">
								<view class="class-item">
									<view class="item-title">
										<text>{{item.title}}</text>
									</view>
									<view class="item-container">
										<button v-for="(post, index1) in item.children" :key="index1"
											@click="confirmPost(post)"
											class="post-item-name cu-btn item-menu-name line padding-sm"
											:class="{'post-item-name-active':form.post_type_id ===post.id}">{{post.title}}</button>
									</view>
								</view>
							</view>
						</scroll-view>
					</block>
				</view>
			</view>
		</u-popup>
		<!--性别选择 操作菜单-->
		<u-action-sheet v-model="genderSheet.visiable" :list="genderSheet.list" @click="confirmGender"
			border-radius='20' safe-area-inset-bottom></u-action-sheet>
		<!--学历选择 操作菜单-->
		<u-action-sheet v-model="educationSheet.visiable" :list="educationSheet.list" @click="confirmEducation"
			border-radius='20' safe-area-inset-bottom></u-action-sheet>
		<!--薪酬选择 操作菜单-->
		<u-action-sheet v-model="salarySheet.visiable" :list="salarySheet.list" @click="handleSalarySheet"
			border-radius='20' safe-area-inset-bottom></u-action-sheet>
		<!--薪酬范围弹窗-->
		<u-modal class="salary-modal" ref='salaryModal' v-model="salarySheet.modal" title='工资范围' show-cancel-button
			async-close @confirm="confirmSalaryRange" confirm-color="#79C58A">
			<view class="salary-content padding-sm flex align-center justify-center text-black">
				<u-input class="salary-range-ipt " v-model="form.salary_range_min" type="number" trim focus  
					input-align="center" placeholder="最低工资" />
				<text class="margin-lr-sm ">—</text>
				<u-input class="salary-range-ipt " v-model="form.salary_range_max" type="number" trim input-align="center"
					placeholder="最高工资" />
			</view>
		</u-modal>
	</view>
</template>
<script>
	import classifyData from '@/common/classify.data.js';
	export default {
		data() {
			return {
				form: {
					company: '',
					post_type: '',
					post_name: '',
					demand_gender: '',
					salary_range_min: '',
					salary_range_max: '',
				},
				postPopup: { //职位popup
					visiable: false,
					treeList: [],
					scrollTop: 0, //tab标题的滚动条位置
					current: 0, // 预设当前项的值
					menuHeight: 0, // 左边菜单的高度
					menuItemHeight: 0, // 左边菜单item的高度
				},
				genderSheet: { //性别要求 操作菜单
					visiable: false,
					list: [{
						text: '男',
						value: 1
					}, {
						text: '女',
						value: 2
					}, {
						text: '不限',
						value: 3
					}]
				},
				educationSheet: { //学历要求 操作菜单
					visiable: false,
					list: [{
							text: '小学及以下',
							value: 1
						},
						{
							text: '初中',
							value: 2
						}, {
							text: '中专',
							value: 3
						}, {
							text: '高中',
							value: 4
						}, {
							text: '大专',
							value: 5
						}, {
							text: '本科',
							value: 6
						}, {
							text: '硕士',
							value: 7
						}, {
							text: '博士',
							value: 8
						}, {
							text: '不限',
							value: 9
						}
					]
				},
				salarySheet: { //工资薪酬 操作菜单
					visiable: false,
					modal: false, //工资自定义弹窗
					list: [{
						text: '自定义',
						value: 1
					}, {
						text: '面谈',
						value: 2
					}, ]
				},
				btnLoading: false,
			};
		},
		onLoad() {

		},
		onReady() {
			this.getPostTree()
		},
		methods: {
			getPostTree() {
				this.$cloudRequest.job.call('basic/post/tree').then(res => {
					console.log(res, 66)
					let {
						code,
						msg,
						data
					} = res
					if (code == 200) {
						this.postPopup.treeList = data;
					}
				})
			},
			// 点击左边的栏目切换
			async swichMenu(index) {
				if (index == this.postPopup.current) return;
				this.postPopup.current = index;
				// 如果为0，意味着尚未初始化
				if (this.postPopup.menuHeight == 0 || this.postPopup.menuItemHeight == 0) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
					await this.getElRect('u-tab-item', 'menuItemHeight');
				}
				// 将菜单菜单活动item垂直居中
				this.postPopup.scrollTop = index * this.postPopup.menuItemHeight + this.postPopup.menuItemHeight / 2 -
					this.postPopup.menuHeight / 2;
			},
			// 获取一个目标元素的高度
			getElRect(elClass, dataVal) {
				new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.' + elClass).fields({
						size: true
					}, res => {
						// 如果节点尚未生成，res值为null，循环调用执行
						if (!res) {
							setTimeout(() => {
								this.getElRect(elClass);
							}, 10);
							return;
						}
						this[dataVal] = res.height;
					}).exec();
				})
			},
			//确定岗位类型
			confirmPost(item) {
				this.form.post_type = item.title;
				this.form.post_type_id = item.id;
				this.form.post_name = item.title
				this.postPopup.visiable = false;
			},
			//确定性别要求
			confirmGender(idx) {
				console.log(idx, 88)
				this.form.demand_gender = this.genderSheet.list[idx].text;
			},
			//确定学历要求
			confirmEducation(idx) {
				this.form.demand_education = this.educationSheet.list[idx].text;
			},
			//点击选择薪资 操作
			handleSalarySheet(idx) {
				this.form.salary_type = this.salarySheet.list[idx].value; //工资类型 1 自定义 2 面谈
				if (this.form.salary_type == 2) {
					this.form.salary_show = '面谈'
					this.form.salary_range_min = ''
					this.form.salary_range_max = ''
				} else {
					this.salarySheet.modal = true
				}
			},
			//确定薪资范围
			confirmSalaryRange() {
				this.$refs.salaryModal.clearLoading();
				if (!this.form.salary_range_min) {
					uni.showToast({
						title: '请录入最低薪资',
						icon: 'none',
						duration: 2000
					})
					return
				}
				if (!this.form.salary_range_min) {
					uni.showToast({
						title: '请录入最高薪资',
						icon: 'none',
						duration: 2000
					})
					return
				}
				if (this.form.salary_range_min > this.form.salary_range_max) {
					uni.showToast({
						title: '最低工资需低于最高工资',
						icon: 'none',
						duration: 2000
					})
					return
				}
				this.form.salary_show = this.form.salary_range_min + ' 至 ' + this.form.salary_range_max
				this.salarySheet.modal = false
			},
			//提交发布
			toSubmit() {
				uni.showLoading({
					title: '加载中'
				});
				this.btnLoading = true;
				console.log(this.form)
				this.$cloudRequest.job.call('recruit/publish', this.form).then(res => {
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
					this.btnLoading = false;
					uni.hideLoading()
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.from-view {
		height: calc(100vh - 128rpx);
		box-sizing: border-box;
	}

	.form-container {
		background: #fff;
		margin: 24rpx;
		padding: 0 20rpx;
		border-radius: 20rpx;
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

	.popup-page {
		height: calc(100vh);
		/* #ifdef H5 */
		height: calc(100vh - var(--window-top));
		/* #endif */
		display: flex;
		flex-direction: column;
	}

	.u-menu-wrap {
		height: calc(100vh);
		flex: 1;
		display: flex;
		overflow: hidden;
	}

	.u-search-inner {
		background-color: rgb(234, 234, 234);
		border-radius: 100rpx;
		display: flex;
		align-items: center;
		padding: 10rpx 16rpx;
	}

	.u-search-text {
		font-size: 26rpx;
		color: $u-tips-color;
		margin-left: 10rpx;
	}

	.u-tab-view {
		width: 260rpx;
		box-sizing: border-box;
		height: 100%;
	}

	.u-tab-item {
		width: 260rpx;
		padding: 0 10rpx;
		height: 80rpx;
		background: #f6f6f6;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color: #444;
		font-weight: 400;
		line-height: 1;
	}

	.u-tab-item-active {
		position: relative;
		font-size: 28rpx;
		color: #000;
		font-weight: 600;
		background: #fff;
	}

	.u-tab-item-active::before {
		content: "";
		position: absolute;
		border-left: 4px solid #79C58A;
		height: 32rpx;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
	}

	.u-tab-view {
		height: 100%;
	}

	.right-box {
		background-color: rgb(250, 250, 250);
	}

	.page-view {
		padding: 16rpx;
	}

	.class-item {
		margin-bottom: 30rpx;
		background-color: #fff;
		padding: 16rpx;
		border-radius: 8rpx;
	}

	.class-item:last-child {
		min-height: 100vh;
	}

	.item-title {
		font-size: 26rpx;
		color: $u-main-color;
		font-weight: bold;
	}


	.item-container {
		display: flex;
		flex-wrap: wrap;
	}

	.post-item-name {
		margin-right: 15rpx;
		margin-top: 20rpx;
		font-weight: normal;
		font-size: 24rpx;
		color: $u-main-color;
	}

	.post-item-name-active {
		color: #79C58A;
	}

	.salary-modal {
		.salary-range-ipt {
			width: 180rpx;
		}
	}
</style>
