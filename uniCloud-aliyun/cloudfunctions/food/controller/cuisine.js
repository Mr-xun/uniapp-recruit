/**
 * Created by Mr-Xun on 2021-08-26
 * 菜系相关
 **/
const {
	Controller
} = require("uni-cloud-router")
module.exports = class MenuController extends Controller {
	//新增菜系
	add() {
		const {
			ctx,
			service
		} = this;
		return service.cuisine.add(ctx.data, service)
	}
}
