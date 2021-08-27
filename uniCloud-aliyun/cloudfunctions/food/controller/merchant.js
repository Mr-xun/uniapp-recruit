/**
 * Created by Mr-Xun on 2021-08-25
 * 商户相关
 **/
const {
	Controller
} = require('uni-cloud-router')
const uniID = require('uni-id')
module.exports = class MerchantController extends Controller {
	//添加商户
	add() {
		const {
			ctx,
			service
		} = this;
		return service.merchant.add(ctx.data)
	}
}
