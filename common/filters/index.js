import * as ENUM from '@/common/js/enum.js'
/**
 * filter genderinfo 性别信息
 */
export function flGenderInfo(val) {
	for (let i = 0; i < ENUM.ENUM_GENDER.length; i++) {
		if (ENUM.ENUM_GENDER[i].value == val) {
			return ENUM.ENUM_GENDER[i].text
		}
	}
	return '--';
}
/**
 * filter educationinfo 学历
 */
export function flEducationInfo(val) {
	for (let i = 0; i < ENUM.ENUM_EDUCATION.length; i++) {
		if (ENUM.ENUM_EDUCATION[i].value == val) {
			return ENUM.ENUM_EDUCATION[i].text
		}
	}
	return '--';
}
