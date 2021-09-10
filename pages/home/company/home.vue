<template>
	<view class="home-company-index-page">
		<view class="margin-bottom-sm">
			<u-button type="success" ripple @click="toPublishRecruit()">发布信息</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			toPublishRecruit() {
				uni.navigateTo({
					url: '/pages/publish/post',
				});
			}
		}
	}
</script>

<style>
</style>
