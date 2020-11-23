import {
	http
} from '@/utils/http'
// 登录
let login = function(code) {
	return http({
		url: 'user/login',
		method: 'POST',
		data: {
			code: code
		}
	})
}
// 退出登录
let logout = function(code) {
	return http({
		url: 'user/logout',
		method: 'POST',
		data: {
			code: code
		}
	})
}
// 首页数据
let homepage = function(code) {
	return http({
		url: 'v1/homepage',
		method: 'GET',
		data: {
			code: code
		}
	})
}
export {
	login,
	logout,
	homepage
}
