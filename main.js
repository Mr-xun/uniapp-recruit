import Vue from 'vue'
import App from './App'
import store from './store';
import cloudRequest from "./common/js/cloudRequest"
import uView from "uview-ui";
import cuCustom from './colorui/components/cu-custom.vue'
import * as filters from './common/filters/index'; // global filters
Vue.use(uView);
Vue.component('cu-custom', cuCustom)

// register global utility filters
Object.keys(filters).forEach((key) => {
	Vue.filter(key, filters[key]);
});
Vue.config.productionTip = false
Vue.prototype.$cloudRequest = cloudRequest;
App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
