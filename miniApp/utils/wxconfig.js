// import wx from "weixin-js-sdk";
// import axios from 'axios'
import {
	jsapiSignature
} from '../api/user.js'
/* 微信参数 */
let data = {
	// 公众号授权参数
	appId: "wx34100852e3dce9fc", //测试公众号
	// appId: "wxd40e0fb981c227a9", //正式
	redirect_uri: "https://h5dev.guxiaojiu.com/gxj_user_system", //测试域名
	// redirect_uri: "https://h5.guxiaojiu.com/gxj_user_system", //正式
	code: '',
	userInfo: {}
}
/* 获取URL参数 */
const getUrlParams = (name) => {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
};
/* wxconfg */
export const wxConfig = () => {
	jsapiSignature({
		url: window.location.href
	}).then(res => {
		wx.config({
			debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId: res.result.appId,
			timestamp: res.result.timestamp, // 必填，生成签名的时间戳
			nonceStr: res.result.nonceStr, // 必填，生成签名的随机串
			signature: res.result.signature, // 必填，签名
			jsApiList: [
				'onMenuShareTimeline',
				'onMenuShareAppMessage',
				'updateTimelineShareData',
				'updateAppMessageShareData',
				'wx-open-launch-app'
			] // 必填，需要使用的JS接口列表
		});
	})
}
//获取权限
export const getPermit = (path) => {
	return new Promise((resolve, reject) => {
		data.code = getUrlParams("code");
		if (data.code == null || data.code == "") {
			window.location.href =
				`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${data.appId}&redirect_uri=${data.redirect_uri + path}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
		} else {
			// 防止重复code重复请求
			if (data.code != localStorage.getItem("code")) {
				//登录获取用户信息
				wxConfig();
			}
		}
	});

}
