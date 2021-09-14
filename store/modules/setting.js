/**
 * Created by Mr-Xun on 2021-09-14
 * 基础设置
 **/
const state = {
	tabbar: [{ //自定义tabbar
			iconPath: "/static/tabbar/basics.png",
			selectedIconPath: "/static/tabbar/basics_select.png",
			text: '首页',
			pagePath: "/pages/home/index"
		},
		{
			iconPath: "/static/tabbar/basics.png",
			selectedIconPath: "/static/tabbar/basics_select.png",
			text: '发布',
			midButton: true,
			pagePath: "/pages/publish/post"
		},
		{
			iconPath: "/static/tabbar/about.png",
			selectedIconPath: "/static/tabbar/about_select.png",
			text: '我的',
			pagePath: "/pages/user/index"
		},
	]
}
const getters = {}
const actions = {}
const mutations = {}
export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
