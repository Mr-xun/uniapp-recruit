import * as ENUM from '@/common/js/enum.js'
/**
 * filter gender 性别
 */
export function flGender(val) {
	for (let i = 0; i < ENUM.GENDER.length; i++) {
		if (ENUM.GENDER[i].value == val) {
			return ENUM.GENDER[i].label
		}
	}
	return '--';
}
/**
 * filter education 学历
 */
export function flEducation(val) {
	for (let i = 0; i < ENUM.EDUCATION.length; i++) {
		if (ENUM.EDUCATION[i].value == val) {
			return ENUM.EDUCATION[i].label
		}
	}
	return '--';
}
