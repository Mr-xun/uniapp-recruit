/**
 * @description 下划线格式转为小驼峰格式
 **/
const toCamel = (data) => {
	if (typeof data != 'object' || !data) return data
	if (Array.isArray(data)) {
		return data.map(item => toCamel(item))
	}
	const newData = {}
	for (let key in data) {
		let newKey = key.replace(/_([a-z])/g, (p, m) => m.toUpperCase())
		newData[newKey] = toCamel(data[key])
	}
	return newData
}
/**
 * @description 小驼峰格式转为下划线格式
 **/
const toUnderline = (data) => {
	if (typeof data != 'object' || !data) return data
	if (Array.isArray(data)) {
		return data.map(item => toUnderline(item))
	}

	const newData = {}
	for (let key in data) {
		let newKey = key.replace(/([A-Z])/g, (p, m) => `_${m.toLowerCase()}`)
		newData[newKey] = toUnderline(data[key])
	}
	return newData
}
/**
 * @description 根据出生日期算出年龄
 **/
const jsGetAge = (birthday) => {
	var returnAge;
	var brithDate = new Date(birthday)
	var birthYear = brithDate.getFullYear();
	var birthMonth = brithDate.getMonth() + 1;
	var birthDay = brithDate.getDate();

	d = new Date();
	var nowYear = d.getFullYear();
	var nowMonth = d.getMonth() + 1;
	var nowDay = d.getDate();

	if (nowYear == birthYear) {
		returnAge = 0; //同年 则为0岁
	} else {
		var ageDiff = nowYear - birthYear; //年之差
		if (ageDiff > 0) {
			if (nowMonth == birthMonth) {
				var dayDiff = nowDay - birthDay; //日之差
				if (dayDiff < 0) {
					returnAge = ageDiff - 1;
				} else {
					returnAge = ageDiff;
				}
			} else {
				var monthDiff = nowMonth - birthMonth; //月之差
				if (monthDiff < 0) {
					returnAge = ageDiff - 1;
				} else {
					returnAge = ageDiff;
				}
			}
		} else {
			returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
		}
	}

	return returnAge; //返回周岁年龄

}

module.exports = {
	toCamel,
	toUnderline,
	jsGetAge
}
