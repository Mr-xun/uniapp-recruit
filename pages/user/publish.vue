<template>
	<view class="user-publish">
		<u-tabs :list="list" :is-scroll="false" :current="current" active-color="#79C58A" @change="change"></u-tabs>
		<uni-list>
			<uni-list-item v-for="(item,idx) in data" :key="idex" :title="data.title"></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: '我的招聘'
				}, {
					name: '我的求职'
				}],
				current: 0,
				data: [

				]
			}
		},
		mounted() {
			this.getData()
		},
		methods: {
			change(val) {
				this.current = val
			},
			getData() {
				uni.showLoading({
					title: '加载中'
				});
				console.log(222)
				this.$cloudRequest.job.call('recruit/list').then(res => {
					console.log(res, 11)
					let {
						code,
						msg,
						data
					} = res
					if (code == 200) {
						this.data = data
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
		}
	}
</script>

<style>
</style>
