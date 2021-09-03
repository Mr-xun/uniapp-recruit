/**
 * @description 根据出生日期算出年龄
 * @param {string}   strBirthday 生日
 **/
export const jsGetAge = (strBirthday) => {
	var returnAge;
	var strBirthdayArr = strBirthday.split("-");
	var birthYear = strBirthdayArr[0];
	var birthMonth = strBirthdayArr[1];
	var birthDay = strBirthdayArr[2];

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
/**
 * 根据身份证获取出生日期（yyyy-MM-dd）
 * @param cardId
 * @returns {birthday:yyyy-MM-dd}
 * @constructor
 */
export const cardIdBirthday = (cardId) => {
	var birthdayno, birthdaytemp;
	if (cardId.length == 18) {
		birthdayno = cardId.substring(6, 14);
	} else if (cardId.length == 15) {
		birthdaytemp = cardId.substring(6, 12);
		birthdayno = "19" + birthdaytemp;
	} else {
		return "";
	}
	var birthday =
		birthdayno.substring(0, 4) +
		"-" +
		birthdayno.substring(4, 6) +
		"-" +
		birthdayno.substring(6, 8);
	return birthday;
}
/**
 *根据输入的身份证获取性别代码
 * @param cardId
 * @returns {sex}
 * @constructor
 */
export const cardIdSex = (cardId) => {
	var sexno, sex;
	if (cardId.length == 18) {
		sexno = cardId.substring(16, 17);
	} else if (cardId.length == 15) {
		sexno = cardId.substring(14, 15);
	} else {
		return "";
	}
	var tempid = sexno % 2;
	if (tempid == 0) {
		sex = "女";
	} else {
		sex = "男";
	}
	return sex;
}
//验证身份证有效性
export const cardIdCheck = (cardId) => {
	if (!cardId) {
		return '身份证号不能为空!'
	}
	var idcard = cardId;
	var Errors = new Array(
		true,
		"身份证号码位数不对!",
		"身份证号码出生日期超出范围或含有非法字符!",
		"sss!",
		"身份证号码校验错误!"
	);
	var ereg;
	var area = {
		11: "北京",
		12: "天津",
		13: "河北",
		14: "山西",
		15: "内蒙古",
		21: "辽宁",
		22: "吉林",
		23: "黑龙江",
		31: "上海",
		32: "江苏",
		33: "浙江",
		34: "安徽",
		35: "福建",
		36: "江西",
		37: "山东",
		41: "河南",
		42: "湖北",
		43: "湖南",
		44: "广东",
		45: "广西",
		46: "海南",
		50: "重庆",
		51: "四川",
		52: "贵州",
		53: "云南",
		54: "西藏",
		61: "陕西",
		62: "甘肃",
		63: "青海",
		64: "宁夏",
		65: "新疆",
		71: "台湾",
		81: "香港",
		82: "澳门",
		91: "国外",
	};
	var Y, JYM;
	var S, M;
	var idcard_array = new Array();
	idcard = jQuery.trim(idcard);
	idcard_array = idcard.split("");
	// 地区检验
	if (area[parseInt(idcard.substr(0, 2))] == null) {
		return Errors[4];
	}
	// 身份号码位数及格式检验
	switch (idcard.length) {
		case 15:
			if (
				(parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 ||
				((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 &&
					(parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0)
			) {
				ereg =
					/^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/; // 测试出生日期的合法性
			} else {
				ereg =
					/^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/; // 测试出生日期的合法性
			}
			if (ereg.test(idcard)) {
				return Errors[0];
			} else {
				return Errors[2];
			}
			break;
		case 18:
			// 18位身份号码检测
			// 出生日期的合法性检查
			// 闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
			// 平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
			if (
				parseInt(idcard.substr(6, 4)) % 4 == 0 ||
				(parseInt(idcard.substr(6, 4)) % 100 == 0 &&
					parseInt(idcard.substr(6, 4)) % 4 == 0)
			) {
				ereg =
					/^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; // 闰年出生日期的合法性正则表达式
			} else {
				ereg =
					/^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; // 平年出生日期的合法性正则表达式
			}
			if (ereg.test(idcard)) {
				// 测试出生日期的合法性
				// 计算校验位
				S =
					(parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 +
					(parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 +
					(parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 +
					(parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 +
					(parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 +
					(parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 +
					(parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 +
					parseInt(idcard_array[7]) * 1 +
					parseInt(idcard_array[8]) * 6 +
					parseInt(idcard_array[9]) * 3;
				Y = S % 11;
				M = "F";
				JYM = "10X98765432";
				M = JYM.substr(Y, 1); // 判断校验位
				if (M == idcard_array[17]) {
					return Errors[0]; // 检测ID的校验位
				} else {
					return Errors[3];
				}
			} else {
				return Errors[2];
			}
			break;
		default:
			return Errors[1];
			break;
	}
}
