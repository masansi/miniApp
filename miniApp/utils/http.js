/**
 * @name 请求函数主体
 */

let urlObj = 'http://60.205.254.233:8080/api/app/'
let uploadUrl = ''
// request 异步请求函数
function http({
	url,
	data,
	method,
	serveUrl
}) {
	let _header = {
		clientType: 'WX',
		Authorization: uni.getStorageSync('T')
	}
	if (typeof data.code == 'string') {
		url = url + data.code
		data.code = {}
	}
	return new Promise((resolve, reject) => {
		uni.request({
			header: _header,
			url: urlObj + url,
			method: method || 'POST',
			data: data.code
		}).then(([err, res]) => {
			if (res) {
				resolve(res.data)
			} else {
				reject(err)
			}
		})
	})
}

export {
	http
}
