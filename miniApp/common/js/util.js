const crypto = requirePlugin("crypto");
const cryptoAes = new crypto.AES()
/**
 * 格式化时间戳
 * @param {Date} date 需要格式化的时间戳
 * @param {String} fmt 转换格式 例：'yyyy/MM/dd hh:mm:ss'
 */
export const dateFormat = (date, fmt) => {
	let o = {
		"M+": date.getMonth() + 1,
		"d+": date.getDate(),
		"h+": date.getHours(),
		"m+": date.getMinutes(),
		"s+": date.getSeconds(),
		"q+": Math.floor((date.getMonth() + 3) / 3),
		"S": date.getMilliseconds()
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
	}
	for (let k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
		}
	}
	return fmt
}
export const encryData = (data) => {
	var key = crypto.Utf8.parse("wXWvszmzZ6KCdhUcJKF4mD55nqy3xyf0");
	var a = cryptoAes.encrypt(JSON.stringify(data), key, {
		mode: crypto.Mode.ECB,
		padding: crypto.Padding.Pkcs7
	}).toString()
	return cryptoAes.encrypt(JSON.stringify(data), key, {
		mode: crypto.Mode.ECB,
		padding: crypto.Padding.Pkcs7
	}).toString()
}

export const transMD5 = (data) => {
	return new crypto.MD5(data).toString()
}