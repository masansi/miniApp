/**
 * @name 请求函数主体
 */
var Base64 = {

  // private property
  _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="

  // public method for encoding
  , encode: function (input) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    input = Base64._utf8_encode(input);

    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      }
      else if (isNaN(chr3)) {
        enc4 = 64;
      }

      output = output +
        this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
        this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
    } // Whend 

    return output;
  } // End Function encode 


  // public method for decoding
  , decode: function (input) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (i < input.length) {
      enc1 = this._keyStr.indexOf(input.charAt(i++));
      enc2 = this._keyStr.indexOf(input.charAt(i++));
      enc3 = this._keyStr.indexOf(input.charAt(i++));
      enc4 = this._keyStr.indexOf(input.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      output = output + String.fromCharCode(chr1);

      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }

      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }

    } // Whend 

    output = Base64._utf8_decode(output);

    return output;
  } // End Function decode 


  // private method for UTF-8 encoding
  , _utf8_encode: function (string) {
    var utftext = "";
    string = string.replace(/\r\n/g, "\n");

    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);

      if (c < 128) {
        utftext += String.fromCharCode(c);
      }
      else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      }
      else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }

    } // Next n 

    return utftext;
  } // End Function _utf8_encode 

  // private method for UTF-8 decoding
  , _utf8_decode: function (utftext) {
    var string = "";
    var i = 0;
    var c, c1, c2, c3;
    c = c1 = c2 = 0;

    while (i < utftext.length) {
      c = utftext.charCodeAt(i);

      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      }
      else if ((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i + 1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      }
      else {
        c2 = utftext.charCodeAt(i + 1);
        c3 = utftext.charCodeAt(i + 2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }

    } // Whend 

    return string;
  } // End Function _utf8_decode 

}
import env from '@/env.config.js'
//#ifdef MP-WEIXIN
import {
	encryData,
	transMD5
} from '../common/js/util.js'
//#endif
// #ifdef H5
import CryptoJS from 'crypto-js'
// #endif
var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
var atob = function(string) {
	string = String(string).replace(/[\t\n\f\r ]+/g, "");
	if (!b64re.test(string))
		throw new TypeError("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
	string += "==".slice(2 - (string.length & 3));
	var bitmap, result = "",
		r1, r2, i = 0;
	for (; i < string.length;) {
		bitmap = b64.indexOf(string.charAt(i++)) << 18 | b64.indexOf(string.charAt(i++)) << 12 |
			(r1 = b64.indexOf(string.charAt(i++))) << 6 | (r2 = b64.indexOf(string.charAt(i++)));

		result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) :
			r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) :
			String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
	}
	return result;
}

const getStorParam = (urlObj, key, envObj) => {
	return urlObj[key] ? decodeURIComponent(atob(urlObj[key])) : envObj[key]
	// return urlObj[key] ? decodeURIComponent(window ? window.atob(urlObj[key]) : atob(urlObj[key])) : envObj[key]
	// return urlObj[key] ? Base64.decode(urlObj[key]) : envObj[key]
}
let imgOrVideo = env.imgOrVideo
let urlObj = ''
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
		Authorization: uni.getStorageSync('T') ? uni.getStorageSync('T') : ''
	}
	urlObj = uni.getStorageSync('urlObj')
	// urlObj = {
	// 	"adminUrl": "aHR0cDovL3hsLmhvbmdndi5jbjoxOTMyNy9hZG1pbi1jbGllbnQ=",
	// 	"domainNameInner": null,
	// 	"domainNameOut": null,
	// 	"extendDomain": "aHR0cCUzQS8vMTkyLjE2OC4yMC45MSUzQTE4MDYwL3NpdGUtc2VydmVyLWxpdQ==",
	// 	"userUrl": "aHR0cCUzQS8vMTkyLjE2OC4yMC45MSUzQTE4MDYwL3VzZXItc2VydmVyLWxpdQ==",
	// 	"rsUrl": "aHR0cCUzQS8vMTkyLjE2OC4yMC45MSUzQTE4MDYwL3Jlc291cmNlLXNlcnZlci1saXU=",
	// 	"ossUrl": "aHR0cDovL3hsLmhvbmdndi5jbjoxOTMyNy9vc3Mtc2VydmVy",
	// 	"chatUrl": "aHR0cCUzQS8vMTkyLjE2OC4yMC45MSUzQTE4MDYwL2NoYXQtc2VydmVyLWxpdQ=="
	// }
	uploadUrl = getStorParam(urlObj, 'ossUrl', env) + '/oss/cephLoad'
	if (typeof data.code == 'string') {
		url = url + data.code
		data.code = {}
	}
	let path = getStorParam(urlObj, serveUrl, env)
	// console.log(getStorParam(urlObj, serveUrl, env), serveUrl, urlObj)
	return new Promise((resolve, reject) => {
		uni.request({
			header: _header,
			url: path + url,
			// url: env[serveUrl] + url,
			method: method || 'POST',
			data: data.code
		}).then(([err, res]) => {
			if (res) {
				if (res.data.code == 401) {
					if (uni.getStorageSync('toLogin') == undefined || uni.getStorageSync('toLogin') == false) {
						uni.setStorageSync('toLogin', true);
						uni.hideLoading();
						uni.showModal({
							title: '授权提醒',
							content: '您还未登录，是否确认去登录？',
							success: function(res) {
								if (res.confirm) {
									uni.navigateTo({
										url: "/pages/mine/login"
									})
									uni.setStorageSync('toLogin', false);
								} else if (res.cancel) {
									uni.switchTab({
										url: '/pages/home/start'
									})
									uni.setStorageSync('toLogin', false);
								}
							}
						});
					}
				} else {
					uni.setStorageSync('toLogin', false);
					resolve(res.data)
				}
			} else {
				reject(err)
			}
		})
	})
}
function http2({
	url,
	data,
	method,
	serveUrl
}) {
	if (typeof data.code == 'string') {
		console.log(data.code)
		url = url + '/' + data.code
		data.code = {}
	}
	let timestamp = new Date().getTime()
	// #ifdef MP-WEIXIN
	let _header = {
		'timestamp': timestamp,
		'sign': transMD5('Timestamp' + timestamp + url),
		'appCode': 'WLZN'
	}
	// #endif
	// #ifdef H5
	let _header = {
		'timestamp': timestamp,
		'sign': CryptoJS.MD5('Timestamp' + timestamp + url),
		'appCode': 'WLZN'
	}
	// #endif
	let path = getStorParam(urlObj, serveUrl, env)
	return new Promise((resolve, reject) => {
		uni.request({
			header: _header,
			url: path + url,
			method: method || 'POST',
			data: data.code
		}).then(([err, res]) => {
			if (res) {
				if (res.data.code == 401) {
					if (uni.getStorageSync('toLogin') == undefined || uni.getStorageSync('toLogin') == false) {
						uni.setStorageSync('toLogin', true);
						uni.hideLoading();
						uni.showModal({
							title: '授权提醒',
							content: '您还未登录，是否确认去登录？',
							success: function(res) {
								if (res.confirm) {
									uni.navigateTo({
										url: "/pages/mine/login"
									})
									uni.setStorageSync('toLogin', false);
								} else if (res.cancel) {
									uni.switchTab({
										url: '/pages/home/start'
									})
									uni.setStorageSync('toLogin', false);
								}
							}
						});
					}
				} else {
					uni.setStorageSync('toLogin', false);
					resolve(res.data)
				}
			} else {
				reject(err)
			}
		})
	})
}
export {
	http,
	http2,
	uploadUrl,
	imgOrVideo
}
