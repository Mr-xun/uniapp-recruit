<template>
	<view class="user-school-page">
		<u-search placeholder="请输入院校" v-model="keyword" @change="changeIpt"></u-search>
		<view class="school-list">
			<view class="school-item" v-for="(item,index) in schoolList" :key='index'>
				<text class="item-name">{{item.name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				schoolList: []
			}
		},
		methods: {
			changeIpt() {
				console.log(this.keyword)
				if(!this.keyword){
					this.schoolList = []
					return
				}
				this.$cloudRequest.job.call('basic/school/graduateList', {
					name: this.keyword
				}).then(res => {
					console.log(res, 11)
					let {
						code,
						msg,
						data
					} = res
					if (code == 200) {
						this.schoolList = data;
					} 
				})
			}
		}
	}
</script>

<style>
	.user-school-page {
		background: #fff;
	}
</style>
