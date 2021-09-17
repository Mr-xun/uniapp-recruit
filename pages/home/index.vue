<template>
	<view class="home-page">
		<CompanyHome ref='compay-home'/>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import CompanyHome from './company/home.vue'
	export default {
		components: {
			CompanyHome
		},
		data() {
			return {}
		},
		onLoad() {
			console.log('onload')
		},
		onShow() {
			console.log('onShow')
		},
		methods:{
			refreshData(){
				this.$refs['compay-home'].onRefresh()
			}
		}
	}
</script>
<style>
</style>
