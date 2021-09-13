<template>
	<view class="publish-post-page">
		<scroll-view scroll-y="true" class="from-view">
			<view class="form-container">
				<u-form class="form-wrap" :model="form" ref="uForm" label-width="140" :error-type="['border-bottom','toast']">
					<u-form-item label="所属公司" prop="company" required border-bottom>
						<u-input v-model="form.company" input-align="right" placeholder="请输入公司" />
					</u-form-item>
					<u-form-item label="职位类型" prop="post_type" required border-bottom>
						<u-input v-model="form.post_type" type="select" input-align="right" placeholder="请选择职位类型"
							@click="postPopup.visiable = true" />
					</u-form-item>
					<u-form-item label="岗位名称" prop="post_name" required border-bottom>
						<u-input v-model="form.post_name" input-align="right" placeholder="请输入岗位名称" />
					</u-form-item>
					<u-form-item label="薪酬待遇" prop="salary_show" required border-bottom>
						<u-input v-model="form.salary_show" type="select" input-align="right" placeholder="请录入薪酬待遇"
							@click="salarySheet.visiable = true" />
					</u-form-item>
					<u-form-item label="招聘人数" prop="recruit_count" required border-bottom>
						<u-input v-model="form.recruit_count" type="number" input-align="right" placeholder="请输入招聘人数" />
					</u-form-item>
					<u-form-item label="公司福利" border-bottom>
						<u-input v-model="form.welfare_tags" input-align="right" />
					</u-form-item>
					<u-form-item label="经验要求" prop="demand_experience" required border-bottom>
						<u-input v-model="form.demand_experience" type="select" input-align="right"
							@click="workExperienceSheet.visiable = true" />
					</u-form-item>
					<u-form-item label="学历要求" border-bottom>
						<u-input v-model="form.demand_education" type="select" input-align="right" placeholder="请选择性别要求"
							@click="educationSheet.visiable = true" />
					</u-form-item>
					<u-form-item label="性别要求" border-bottom>
						<u-input v-model="form.demand_gender" type="select" input-align="right" placeholder="请选择性别要求"
							@click="genderSheet.visiable = true" />
					</u-form-item>
					<u-form-item label="年龄要求" border-bottom>
						<u-input v-model="form.demand_age" type="select" input-align="right" placeholder="请选择年龄要求"
							@click="ageSheet.visiable = true" />
					</u-form-item>
					<u-form-item label="工作地点" prop="work_address" required border-bottom>
						<u-input v-model="form.work_address" input-align="right" />
					</u-form-item>
					<u-form-item label="岗位职责" prop="post_content" required border-bottom label-position="top">
						<u-input v-model="form.post_content" type="textarea" input-align="right" height="100"
							maxlength='500' />
					</u-form-item>
				</u-form>

			</view>
		</scroll-view>
		<view class="bottom-btn flex align-center justify-center">
			<button class="opt-btn cu-btn round" :disabled='btnLoading' @click="toSubmit">
				<text v-if="btnLoading" class="cuIcon-loading2 cuIconfont-spin"></text> 提交发布</button>
		</view>
		<!--选择职位类型——popup面板-->
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
		<!--年龄选择 操作菜单-->
		<u-action-sheet v-model="ageSheet.visiable" :list="ageSheet.list" @click="handleAgeSheet" idx border-radius='20'
			safe-area-inset-bottom></u-action-sheet>
		<!--年龄限制 选择器-->
		<u-picker mode="multiSelector" v-model="ageSheet.selectPicker" :range="ageSheet.selectColumns"
			:default-selector='ageSheet.defaultSelector' range-key='label' @confirm="confirmCustomAge"
			@columnchange='changeCustomAge' confirm-color='#79C58A' safe-area-inset-bottom>
		</u-picker>
		<!--工作经验选择 操作菜单-->
		<u-action-sheet v-model="workExperienceSheet.visiable" :list="workExperienceSheet.list"
			@click="confirmWorkExperience" border-radius='20' safe-area-inset-bottom></u-action-sheet>
		<!--薪酬选择 操作菜单-->
		<u-action-sheet v-model="salarySheet.visiable" :list="salarySheet.list" @click="handleSalarySheet"
			border-radius='20' safe-area-inset-bottom></u-action-sheet>
		<!--薪酬范围 自定义弹窗-->
		<u-modal class="salary-modal" ref='salaryModal' v-model="salarySheet.modal" title='工资范围' show-cancel-button
			async-close @confirm="confirmSalaryRange" confirm-color="#79C58A" negative-top='80rpx'>
			<view class="salary-content padding-sm flex align-center justify-center text-black">
				<u-input class="salary-range-ipt " v-model="form.salary_range_min" type="number" trim focus
					input-align="center" placeholder="最低工资" />
				<text class="margin-lr-sm ">—</text>
				<u-input class="salary-range-ipt " v-model="form.salary_range_max" type="number" trim
					input-align="center" placeholder="最高工资" />
			</view>
		</u-modal>
	</view>
</template>
<script>
	import * as ENUM from '@/common/js/enum.js'
	import classifyData from '@/common/classify.data.js';
	export default {
		data() {
			return {
				form: {
					company: '',
					post_type: '',
					post_name: '',
					salary_show:'',
					salary_type:'',
					salary_range_min:'',
					salary_range_max:'',
					recruit_count:'',
					welfare_tags:'',
					demand_experience:'',
					demand_education:'',
					demand_gender:'',
					demand_age:'',
					demand_age_min: '',
					demand_age_max: '',
					work_address: '',
					post_content:''
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
					list: ENUM.SET_GENDER_DEMAND()
				},
				educationSheet: { //学历要求 操作菜单
					visiable: false,
					list: ENUM.SET_EDUCATION_DEMAND()
				},
				workExperienceSheet: { //工作经验要求 操作菜单
					visiable: false,
					list: ENUM.SET_WORK_EXPERIENCE_DEMAND()
				},
				salarySheet: { //薪酬待遇 操作菜单
					visiable: false,
					modal: false, //工资自定义弹窗
					list: [{
						text: '自定义',
						value: 1
					}, {
						text: '面谈',
						value: 2
					}, ],
				},
				ageSheet: {
					visiable: false,
					selectPicker: false, //年龄限制选择器
					list: [{
						text: '自定义',
						value: 1
					}, {
						text: '年龄不限',
						value: 2
					}, ],
					selectColumns: [
						[],
						[{
							label: '至'
						}],
						[]
					],
					defaultSelector: [0, 0, 0]
				},
				btnLoading: false,
				formRules: {

					company: [{
						required: true,
						message: '请输入公司名称',
						trigger: ['blur', 'change']
					}],
					post_type: [{
						required: true,
						message: '请选择职位类型',
						trigger: ['blur', 'change']
					}],
					post_name: [{
						required: true,
						message: '请输入岗位名称',
						trigger: ['blur', 'change']
					}],
					salary_show: [{
						required: true,
						message: '请录入薪酬待遇',
						trigger: ['blur', 'change']
					}],
					recruit_count: [{
						required: true,
						message: '请输入招聘人数',
						trigger: ['blur', 'change']
					}],
					demand_experience: [{
						required: true,
						message: '请选择经验要求',
						trigger: ['blur', 'change']
					}],
					work_address: [{
						required: true,
						message: '请选择工作地点',
						trigger: ['blur', 'change']
					}],
					post_content: [{
						required: true,
						message: '请输入岗位职责',
						trigger: ['blur', 'change']
					}],
				}
			};
		},
		created() {
			for (let i = 18; i <= 70; i += 2) {
				this.ageSheet.selectColumns[0].push({
					value: i,
					label: i + '岁'
				})
			}
			for (let i = 20; i <= 70; i += 2) {
				this.ageSheet.selectColumns[2].push({
					value: i,
					label: i + '岁'
				})
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.formRules);
			this.getPostTree()
		},
		methods: {
			getPostTree() {
				this.$cloudRequest.job.call('basic/post/tree').then(res => {
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
			//确定职位类型
			confirmPost(item) {
				this.form.post_type = item.title;
				this.form.post_type_id = item.id;
				this.form.post_name = item.title
				this.postPopup.visiable = false;
				this.$refs.uForm.resetFields();
			},
			//确定性别要求
			confirmGender(idx) {
				this.form.demand_gender = this.genderSheet.list[idx].text;
			},
			//确定学历要求
			confirmEducation(idx) {
				this.form.demand_education = this.educationSheet.list[idx].text;
			},
			//确定工作经验要求
			confirmWorkExperience(idx) {
				this.form.demand_experience = this.workExperienceSheet.list[idx].text;
			},
			//点击选择年龄限制 操作
			handleAgeSheet(idx) {
				if (idx == 1) {
					this.form.demand_age = '年龄不限'
					this.form.demand_age_min = "";
					this.form.demand_age_max = "";
				} else {
					this.ageSheet.selectPicker = true
				}
			},
			//确定自定义年龄
			confirmCustomAge(obj) {
				let min_age = this.ageSheet.selectColumns[0][obj[0]].value;
				let max_age = this.ageSheet.selectColumns[2][obj[2]].value;
				this.form.demand_age = min_age + '至' + max_age + '岁'
				this.form.demand_age_min = min_age;
				this.form.demand_age_max = max_age;
			},
			changeCustomAge(e) {
				let column = e.column,
					index = e.index;
				this.ageSheet.defaultSelector[column] = index;
				if (column == 0) {
					let column1_label = this.ageSheet.selectColumns[0][e.index].label;
					let column1_value = this.ageSheet.selectColumns[0][e.index].value;
					this.ageSheet.defaultSelector.splice(2, 1, 0)
					this.ageSheet.selectColumns[2] = []
					if (column1_label == '不限') {
						this.ageSheet.selectColumns[2].push({
							value: '-1',
							label: '不限'
						})
					} else {
						for (let i = column1_value + 2; i <= 70; i += 2) {
							this.ageSheet.selectColumns[2].push({
								value: i,
								label: i + '岁'
							})
						}
					}
				}
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
				this.$refs.uForm.validate(valid => {
					if (valid) {
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
						})
					} else {
						console.log('验证失败');
					}
				});


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
