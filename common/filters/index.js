import * as ENUM from '@/common/js/enum.js'
/**
 * filter genderinfo 性别信息
 */
export function flGenderInfo(val) {
	for (let i = 0; i < ENUM.GENDER.length; i++) {
		if (ENUM.GENDER[i].value == val) {
			return ENUM.GENDER[i].label
		}
	}
	return '--';
}
/**
 * filter educationinfo 学历
 */
export function flEducationInfo(val) {
	for (let i = 0; i < ENUM.EDUCATION.length; i++) {
		if (ENUM.EDUCATION[i].value == val) {
			return ENUM.EDUCATION[i].label
		}
	}
	return '--';
}
