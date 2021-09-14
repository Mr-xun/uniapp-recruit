<template>
	<view class="home-page">
		<CompanyHome />
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
		onLoad() {},
		methods:{
		}
	}
</script>
<style>
</style>
