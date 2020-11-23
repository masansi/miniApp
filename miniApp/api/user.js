import {
	http
} from '@/utils/http'
let contentResource = function(code) {
	return http({
		url: '/app/content/resource',
		method: 'GET',
		data: {
			code: code
		},
		serveUrl:'extendDomain'
	})
}
// 游客登录
let guestLogin = function(code) {
	return http({
		url: '/guestLogin',
		method: 'post',
		data: {
			code: code
		},
		serveUrl: 'userUrl'
	})
}

export {
	guestLogin,
	contentResource,
}
