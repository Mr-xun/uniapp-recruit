/**
 * Created by Mr-Xun on 2021-09-23
 * 行业分类
 **/
const {
	Service
} = require('uni-cloud-router')
const CATEGORY_DATA = require("../../assets/data.js")
module.exports = class IndustryService extends Service {
	//同步职位分类
	async asyncData(data) {
		let response = {
			code: 200,
			data: null,
			msg: '同步职位成功',
		}
		console.log(CATEGORY_DATA, 888)

		// code转汉字大对象
		const CodeToText = {};
		// 汉字转code大对象
		const TextToCode = {};

		// 第一级
		const categoryObject = CATEGORY_DATA['0']; // 门类数据

		const categoryData = [];

		for (const prop in categoryObject) {
			categoryData.push({
				value: prop,
				label: categoryObject[prop]
			});
			CodeToText[prop] = categoryObject[prop];
			TextToCode[categoryObject[prop]] = {
				code: prop
			};
		}

		// 第二级
		for (let i = 0, len = categoryData.length; i < len; i++) {
			const majorCode = categoryData[i].value;
			const majorText = categoryData[i].label;
			const majorChildren = [];
			for (const prop in CATEGORY_DATA[majorCode]) {
				majorChildren.push({
					value: prop,
					label: CATEGORY_DATA[majorCode][prop]
				});
				CodeToText[prop] = CATEGORY_DATA[majorCode][prop];
				TextToCode[majorText][CATEGORY_DATA[majorCode][prop]] = {
					code: prop
				};
			}
			if (majorChildren.length) {
				categoryData[i].children = majorChildren;
			}
		}

		// 第三级
		for (let i = 0, len = categoryData.length; i < len; i++) {
			const majorObj = categoryData[i].children;
			const majorText = categoryData[i].label;
			if (majorObj) {
				for (let j = 0, len = majorObj.length; j < len; j++) {
					const mediumCode = majorObj[j].value;
					const mediumText = majorObj[j].label;
					const mediumChildren = [];
					for (const prop in CATEGORY_DATA[mediumCode]) {
						mediumChildren.push({
							value: prop,
							label: CATEGORY_DATA[mediumCode][prop]
						});
						CodeToText[prop] = CATEGORY_DATA[mediumCode][prop];
						TextToCode[majorText][mediumText][CATEGORY_DATA[mediumCode][prop]] = {
							code: prop
						};
					}
					if (mediumChildren.length) {
						// 第四级
						for (let k = 0, len = mediumChildren.length; k < len; k++) {
							const smallText = mediumChildren[k].label;
							const smallCode = mediumChildren[k].value;
							const smallChildren = [];
							for (const prop in CATEGORY_DATA[smallCode]) {
								smallChildren.push({
									value: prop,
									label: CATEGORY_DATA[smallCode][prop]
								});
								CodeToText[prop] = CATEGORY_DATA[smallCode][prop];
								TextToCode[majorText][mediumText][smallText][CATEGORY_DATA[smallCode][prop]] = {
									code: prop
								};
								if (smallChildren.length) {
									mediumChildren[k].children = smallChildren;
								}
							}
						}
						majorObj[j].children = mediumChildren;
					}
				}
			}
		}
		console.log(categoryData, TextToCode, CodeToText, 7)
		let user = this.ctx.auth;
		const dbCmd = this.db.command;
		let startTime = new Date().getTime();
		let insertData = {
			categoryData:CATEGORY_DATA,
			categoryTree:categoryData,
			TextToCode,
			CodeToText,
		}
		// await this.db.collection('job-basic-industry-category').add(insertData)
		let endTime = new Date().getTime();
		let allUseTimes = (endTime - startTime) / 1000
		response.msg += '总用时' + allUseTimes + 's'
		return response
	}
	//获取职业分类tree结构
	async tree() {
		let response = {
			code: 200,
			data: null,
			msg: '查询成功'
		}
		try {
			let dbRes = await this.db.collection('job-basic-industry-category').where({}).get()
			response.data = dbRes.data[0].categoryTree;
		} catch (e) {
			//TODO handle the exception
			response.code = -1;
			response.msg = '系统错误：' + e;
		}
		return response;
	}
}
