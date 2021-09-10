<template>
	<view class="publish-post-page">
		<scroll-view scroll-y="true" class="from-wrap">
			<u-form :model="form" ref="uForm" label-width="120">
				<u-form-item label="所属公司">
					<u-input v-model="form.company" />
				</u-form-item>
				<u-form-item label="岗位类型">
					<u-input v-model="form.type" />
				</u-form-item>
				<u-form-item label="岗位名称">
					<u-input v-model="form.title" />
				</u-form-item>
				<u-form-item label="待遇薪酬">
					<u-input v-model="form.salary_fix" />
				</u-form-item>
				<u-form-item label="招聘人数">
					<u-input v-model="form.recruit_count" />
				</u-form-item>
				<u-form-item label="公司福利">
					<u-input v-model="form.welfare_tags" />
				</u-form-item>
				<u-form-item label="经验要求">
					<u-input v-model="form.apply_experience" />
				</u-form-item>
				<u-form-item label="学历要求">
					<u-input v-model="form.apply_education" />
				</u-form-item>
				<u-form-item label="性别要求">
					<u-input v-model="form.apply_gender" />
				</u-form-item>
				<u-form-item label="年龄要求">
					<u-input v-model="form.apply_age" />
				</u-form-item>
				<u-form-item label="工作地点">
					<u-input v-model="form.work_address" />
				</u-form-item>
				<u-form-item label="岗位职责">
					<u-input v-model="form.content" />
				</u-form-item>
			</u-form>
		</scroll-view>
		<view class="bottom-btn flex align-center justify-center">
			<button class="opt-btn cu-btn round" :disabled='btnLoading' @click="toSubmit">
				<text v-if="btnLoading" class="cuIcon-loading2 cuIconfont-spin"></text> 提交发布</button>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				form: {
					name: '',
					intro: '',
					sex: ''
				},
				btnLoading: false,
				checkboxList: [{
						name: '苹果',
						checked: false,
						disabled: false
					},
					{
						name: '雪梨',
						checked: false,
						disabled: false
					},
					{
						name: '柠檬',
						checked: false,
						disabled: false
					}
				],
				radioList: [{
						name: '鲜甜',
						disabled: false
					},
					{
						name: '麻辣',
						disabled: false
					}
				],
				radio: '',
				switchVal: false
			};
		},
		methods: {
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
	.from-wrap {
		height: calc(100vh - 128rpx);
	}
</style>
