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
module.exports = {
	toCamel,
	toUnderline
}
