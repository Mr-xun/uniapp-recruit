//性别
export const ENUM_GENDER = [{
		text: '男',
		value: 1
	},
	{
		text: '女',
		value: 2
	},

]
//性别信息
export const SET_GENDER_INFO = () => {
	let arr = ENUM_GENDER.concat({
		text: '保密',
		value: -1
	});
	return arr
}
//性别要求
export const SET_GENDER_DEMAND = () => {
	let arr = ENUM_GENDER.concat({
		text: '性别不限',
		value: 3
	});
	return arr
}
//学历
export const ENUM_EDUCATION = [{
		text: '小学及以下',
		value: 1
	},
	{
		text: '初中',
		value: 2
	}, {
		text: '中专',
		value: 3
	}, {
		text: '高中',
		value: 4
	}, {
		text: '大专',
		value: 5
	}, {
		text: '本科',
		value: 6
	}, {
		text: '硕士',
		value: 7
	}, {
		text: '博士',
		value: 8
	},
]
//学历信息
export const SET_EDUCATION_INFO = () => {
	let arr = ENUM_EDUCATION.concat({
		text: '保密',
		value: -1
	});
	return arr
}
//学历要求
export const SET_EDUCATION_DEMAND = () => {
	let arr = ENUM_EDUCATION.concat({
		text: '学历不限',
		value: 9
	});
	return arr
}
//工作经验
export const ENUM_WORK_EXPERIENCE = [{
		text: '1年以内',
		value: 1
	},
	{
		text: '1-3年',
		value: 2
	}, {
		text: '3-5年',
		value: 3
	}, {
		text: '5-10年',
		value: 4
	}, {
		text: '10年以上',
		value: 5
	}
]
//设置精要要求
export const SET_WORK_EXPERIENCE_DEMAND = () => {
	let arr = ENUM_WORK_EXPERIENCE.concat({
		text: '经验不限',
		value: 6
	});
	return arr
}
