import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import cuCustom from './colorui/components/cu-custom.vue'
Vue.use(uView);
Vue.component('cu-custom', cuCustom)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
