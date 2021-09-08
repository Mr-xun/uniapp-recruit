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
// const shoolData = require("../../assets/school.json")
// const basicShcool = require("../../assets/basic-school.json")
// const basicUniversitySchool = require("../../assets/basic-university-school.json")
// const basicMiddleSchool = require("../../assets/basic-middle-school.json")
// const basicGaokaoSchool = require("../../assets/basic-gaokao-school.json")
module.exports = class SchoolService extends Service {
	//同步所有院校
	async asyncAllSchool(data) {
		let response = {
			code: 200,
			data: null,
			msg: '同步院校成功',
		}
		let user = this.ctx.auth;
		const dbCmd = this.db.command;
		let startTime = new Date().getTime();
		let dbCountRes = await this.db.collection('job-basic-all-school').where({}).count()
		console.log('已录入总数:' + dbCountRes.total, 11)
		let len = shoolData.length
		console.log('数据总数:' + len, 22)
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
				address: shoolData[i].address != '[]' ? shoolData[i].address : '', //学校详细地址
				location: shoolData[i].location, //学校所在经纬度
				geo_location: geo_location, //学校经纬度对象
			}
			if (geo_location.longitude && geo_location.latitude) {
				insertData.geo_point = new this.db.Geo.Point(geo_location.longitude, geo_location
					.latitude) //point类型经纬度
			}
			// await this.db.collection('job-basic-all-school').add(insertData)
			console.log(shoolData[i], '第' + (i + 1) + '条', '用时' + useTimes + 's')
		}
		let endTime = new Date().getTime();
		let allUseTimes = (endTime - startTime) / 1000
		response.msg += '总用时' + allUseTimes + 's'
		return response
	}
	
	//同步高校院校
	async asyncUniversitySchool() {
		let response = {
			code: 200,
			data: null,
			msg: '同步高校信息成功',
		}
		const dbCmd = this.db.command
		let startTime = new Date().getTime();
		let schools = []
		let len = basicUniversitySchool.length;
		for (let i = 0; i < len; i++) {
			let geoRes = await uniCloud.httpclient.request(
				`https://restapi.amap.com/v3/geocode/geo?output=JSON&address=${basicUniversitySchool[i].name}&city=${basicUniversitySchool[i].city_name}&key=d27c8c33e47aea8fa848fb2d2b1d365c`, {
					dataType: 'json'
				})
			if (geoRes.data.status == 1 && geoRes.data.count > 0) {
				let geocodes = geoRes.data.geocodes[0]
				let locationArr = geocodes.location.split(',')
				let geo_location = {
					longitude: locationArr.length ? Number(locationArr[0]) : null,
					latitude: locationArr.length ? Number(locationArr[1]) : null,
				}
				basicUniversitySchool[i].address = geocodes.formatted_address;
				basicUniversitySchool[i].type = '大学';
				basicUniversitySchool[i].district_name = geocodes.district;
				basicUniversitySchool[i].ad_code = geocodes.adcode;
				basicUniversitySchool[i].location = geocodes.location;
				basicUniversitySchool[i].geo_location = geo_location;
				basicUniversitySchool[i].geo_point = new this.db.Geo.Point(geo_location.longitude,
					geo_location.latitude) //point类型经纬度;
			}
		}
		// await this.db.collection('job-basic-university-school').add(basicUniversitySchool)
		let endTime = new Date().getTime();
		let allUseTimes = (endTime - startTime) / 1000
		console.log('总用时' + allUseTimes + 's')
		response.msg += '总用时' + allUseTimes + 's'
		return response
	}
	//同步中小学幼儿园院校
	async asyncPrimarySchool() {
		let response = {
			code: 200,
			data: null,
			msg: '同步中小学幼儿园院校信息成功',
		}
		let startTime = new Date().getTime();
		let dbCountRes = await this.db.collection('job-basic-primary-school').where({}).count()
		console.log('已录入总数:' + dbCountRes.total, 11)
		let basicMiddleSchoolData = basicMiddleSchool.nc_system_school
		let len = basicMiddleSchoolData.length;
		console.log(basicMiddleSchoolData, 11)
		for (let i = dbCountRes.total; i < len; i++) {
			let curTime = new Date().getTime();
			let useTimes = (curTime - startTime) / 1000;
			let locationArr = basicMiddleSchoolData[i].location.split(',')
			let geo_location = {
				longitude: locationArr.length ? Number(locationArr[0]) : null,
				latitude: locationArr.length ? Number(locationArr[1]) : null,
			}
			let {
				province_name,
				city_name,
				district_name,
				address
			} = basicMiddleSchoolData[i];
			basicMiddleSchoolData[i].address = city_name + district_name + address;
			if (province_name != city_name) {
				basicMiddleSchoolData[i].address = province_name + basicMiddleSchoolData[i].address;
			}
			basicMiddleSchoolData[i].geo_location = geo_location;
			basicMiddleSchoolData[i].geo_point = new this.db.Geo.Point(geo_location.longitude,
				geo_location.latitude) //point类型经纬度;
			// await this.db.collection('job-basic-primary-school').add(basicMiddleSchoolData[i])
			console.log(basicMiddleSchoolData[i], '第' + (i + 1) + '条', '用时' + useTimes + 's')
		}
		let endTime = new Date().getTime();
		let allUseTimes = (endTime - startTime) / 1000
		console.log('总用时' + allUseTimes + 's')
		response.msg += '总用时' + allUseTimes + 's'
		return response
	}
	//抓取高考网大学数据
	async grapGaoKaoSchool() {
		let response = {
			code: 200,
			data: null,
			msg: '抓取成功',
		}
		let startTime = new Date().getTime();
		let allPage = Math.ceil(2840 / 20)
		let allSchool = []
		for (let page = 1; page <= allPage; page++) {
			let curTime = new Date().getTime();
			let useTimes = (curTime - startTime) / 1000;
			let schoolRes = await uniCloud.httpclient.request(
				`https://api.eol.cn/gh5/api?size=20&page=${page}&uri=apidata/api/gk/school/lists`, {
					dataType: 'json'
				})
			if (schoolRes.data.code == '0000') {
				let resData = schoolRes.data.data.item || []
				allSchool = allSchool.concat(resData)
			}
			console.log(schoolRes, '第' + page + '页', '用时' + useTimes + 's')
		}
		console.log('总学校:', allSchool, 2222222222222)
		let endTime = new Date().getTime();
		let allUseTimes = (endTime - startTime) / 1000
		console.log('总用时' + allUseTimes + 's')
		response.msg += '总用时' + allUseTimes + 's'
		return response
	}
	//处理院校信息
	async dealData() {
		let response = {
			code: 200,
			data: null,
			msg: '处理院校信息成功',
		}
		const dbCmd = this.db.command

		let startTime = new Date().getTime();
		let dbCountRes = await this.db.collection('job-basic-university-school').where({}).count()
		console.log(dbCountRes, basicGaokaoSchool.length, 111)

		await this.db.collection('job-basic-primary-school').where({
			
		}).update({
			location:dbCmd.remove()
		})
		let endTime = new Date().getTime();
		let allUseTimes = (endTime - startTime) / 1000
		console.log('总用时' + allUseTimes + 's')
		response.msg += '总用时' + allUseTimes + 's'
		return response
	}
	//查询中小学总数量
	async middleSchoolCount() {
		let response = {
			code: 200,
			data: null,
			msg: '',
		}
		let dbCountRes = await this.db.collection('job-basic-primary-school').where({}).count()
		console.log(dbCountRes, basicMiddleSchool.nc_system_school.length, 111)
		response.msg += '当前插入中小学数量为' + dbCountRes.total + '总数量为' + basicMiddleSchool.nc_system_school.length
		return response
	}
	//毕业院校
	async graduateList(params) {
		let response = {
			code: 200,
			data: null,
			msg: '查询成功'
		}
		try {
			let dbCmd = this.db.command;
			let nameReg = new RegExp(params.name, 'g')
			let dbRes = await this.db.collection('job-basic-university-school').where({
				name: nameReg
			}).limit(20).field({
				'location': false,
				'geo_location': false,
				'geo_point': false
			}).get()
			response.data = dbRes.data;
		} catch (e) {
			//TODO handle the exception
			response.code = -1;
			response.msg = '系统错误：' + e;
		}

		return response;
	}
}
