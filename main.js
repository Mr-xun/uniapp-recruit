import Vue from 'vue'
import App from './App'
import store from './store';
import cloudRequest from "./common/cloudRequest"
import uView from "uview-ui";
import cuCustom from './colorui/components/cu-custom.vue'
Vue.use(uView);
Vue.component('cu-custom', cuCustom)

Vue.config.productionTip = false
Vue.prototype.$cloudRequest = cloudRequest;
App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
