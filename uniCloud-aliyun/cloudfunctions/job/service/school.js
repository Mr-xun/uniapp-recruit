/**
 * Created by Mr-Xun on 2021-09-05
 * 所有院校
 * 幼儿园、小学、中学、职业学校、大学
 * 名称、省、市、区、详细地址、经纬度、类型
 * 已收集到的数据为405073
 **/
const {
	Service
} = require('uni-cloud-router')
const shoolData = require("../assets/school.json")
module.exports = class RecruitService extends Service {
	//新增院校
	async add(data) {
		let response = {
			code: 200,
			data: null,
			msg: '新增成功',
		}
		let user = this.ctx.auth;
		const dbCmd = this.db.command;
		let startTime = new Date().getTime();
		let dbCountRes = await this.db.collection('job-basic-school').where({}).count()
		console.log('已录入总数:' + dbCountRes.total, 11)
		let len = shoolData.length
		console.log('数据总数:' + len,22)
		for (let i = dbCountRes.total; i < len; i++) {
			let curTime = new Date().getTime();
			let useTimes = (curTime - startTime) / 1000;
			let locationArr = shoolData[i].location.split(',')
			let geo_location = {
				longitude: locationArr.length ? Number(locationArr[0]) : null,
				latitude: locationArr.length ? Number(locationArr[1]) : null,
			}
			let insertData = {
				name: shoolData[i].name, //学校名称
				type: shoolData[i].type, //学校类型
				province_name: shoolData[i].pname, //学校所在省
				city_name: shoolData[i].cityname, //学校所在城市
				district_name: shoolData[i].adname, //学校所在市区
				address: shoolData[i].address, //学校详细地址
				location: shoolData[i].location, //学校所在经纬度
				geo_location: geo_location, //学校经纬度对象
			}
			if (geo_location.longitude && geo_location.latitude) {
				insertData.geo_point = new this.db.Geo.Point(geo_location.longitude, geo_location
					.latitude) //point类型经纬度
			}
			await this.db.collection('job-basic-school').add(insertData)
			console.log(shoolData[i], '第' + (i + 1) + '条', '用时' + useTimes + 's')
		}
		// await this.db.collection('job-basic-school').add(shoolData)
		let endTime = new Date().getTime();
		let allUseTimes = (endTime - startTime) / 1000
		console.log(shoolData, allUseTimes + 's', 777)
		response.msg += '总用时' + allUseTimes + 's'
		return response
	}
}
