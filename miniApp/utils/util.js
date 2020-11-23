import config from '@/env.config.js'
// 前补位
function padStartEvent(target, str, num) {
	typeof target === 'number' ? target = `${target}` : '',
		console.log(target.padStart(num, str))
	return target.padStart(num, str)
}


//-  uuid
function createUuid(MP) {
	let userId = MP.$store.state.userState.userInfo.userId
	var s = [];
	var hexDigits = "0123456789abcdefghijklmn";
	for (var i = 0; i < 36; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
	s[8] = s[13] = s[18] = s[23] = "-";
	var uuid = s.join("");
	uuid = userId + uuid
	return uuid;
}

//- 去标签
const filterContent = function(opt) {
	let expHtml = /<[^<>]+>/g
	let expSpace = /&nbsp;/g
	let str = opt.replace(expHtml, '')
	str = str.replace(expSpace, '')
	return str
}

// 时间戳转换
const formatMsgTime = dateTimeStamp =>{
  let minute = 1000 * 60;
  let hour = minute * 60;
  let day = hour * 24;
  let halfamonth = day * 15;
  let month = day * 30;
  let now = new Date().getTime();
  let diffValue = now - dateTimeStamp;
  if(diffValue < 0){return;}
  let monthC =diffValue/month;
  let weekC =diffValue/(7*day);
  let dayC =diffValue/day;
  let hourC =diffValue/hour;
  let minC =diffValue/minute;
  let result = ''
  if(monthC>=1){
      result="" + parseInt(monthC) + "月前";
  }
  else if(weekC>=1){
      result="" + parseInt(weekC) + "周前";
  }
  else if(dayC>=1){
      result=""+ parseInt(dayC) +"天前";
  }
  else if(hourC>=1){
      result=""+ parseInt(hourC) +"小时前";
  }
  else if(minC>=1){
      result=""+ parseInt(minC) +"分钟前";
  }else
  result="刚刚";
  return result;
}

// 时间戳转换=》时间点
const formatTime = (dateTimeStamp) => {
	if (dateTimeStamp) {
		let time = new Date(dateTimeStamp);
		let year = time.getFullYear();
		let month = time.getMonth() + 1;
		let day = time.getDate();
		let hour = time.getHours();
		let minutes = time.getMinutes();
		let realTime = year + '/' + month + '/' + day + ' ' + hour + ':' + minutes
		return realTime
	}else{
		return '暂无时间'
	}
}

function throttle(fn, gapTime) {
  if (gapTime == null || gapTime == undefined) {
    gapTime = 1500
  }

  let _lastTime = null

  // 返回新的函数
  return function () {
    let _nowTime = + new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn.apply(this, arguments)   //将this和参数传给原函数
      _lastTime = _nowTime
    }
  }
}
function formatDateTime(inputTime) { 
 var date = new Date(inputTime);
 var y = date.getFullYear(); 
 var m = date.getMonth() + 1; 
 m = m < 10 ? ('0' + m) : m; 
 var d = date.getDate(); 
 d = d < 10 ? ('0' + d) : d; 
 var h = date.getHours();
 h = h < 10 ? ('0' + h) : h;
 var minute = date.getMinutes();
 var second = date.getSeconds();
 minute = minute < 10 ? ('0' + minute) : minute; 
 second = second < 10 ? ('0' + second) : second; 
 return y + '/' + m + '/' + d; 
};
export {
	padStartEvent,
	createUuid,
	filterContent,
	formatMsgTime,
	formatTime,
	formatDateTime,
	throttle
}
