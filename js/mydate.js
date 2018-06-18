$(document).ready(function() {
	var now = new Date();
	var nowArray = [{
		YYYY: now.getFullYear(),
		MM: now.getMonth() + 1,
		DD: now.getDate(),
		hh: now.getHours(),
		mm: now.getMinutes(),
		ss: now.getSeconds()
	}];

	getMonDatesByYear('2018');
});


function getCountDays() {
	var curDate = new Date();
	/* 获取当前月份 */
	var curMonth = curDate.getMonth();
	/*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
	curDate.setMonth(curMonth + 1);
	/* 将日期设置为0, 这里为什么要这样设置, 我不知道原因, 这是从网上学来的 */
	curDate.setDate(0);
	/* 返回当月的天数 */
	return curDate.getDate();
}

function sortFunc(arg1, arg2) {
	if (arg1 < arg2) return -1;
	if (arg1 > arg2) return 1;
	if (arg1 == arg2) return 0;
}


function getMonDatesByMonth(year, month) {
	year = parseInt(year);
	month = parseInt(month);
	// 构造一个日期对象
	var day = new Date(year, month, 0);
	// 获取天数
	var dayCount = day.getDate();
	var monthDays = new Array();
	for (var i = 0; i < dayCount; i++) {
		monthDays.push(new Date(2018, month - 1, i + 1));
	}
	monthDays.sort(function(arg1, arg2) {
		if (arg1.getDate() < arg2.getDate()) return -1;
		if (arg1.getDate() > arg2.getDate()) return 1;
		if (arg1.getDate() == arg2.getDate()) return 0;
	});
	console.log(monthDays);
	var monDays = new Array();
	for (var j = 0; j < monthDays.length; j++) {
		if (monthDays[j].getDay() == 1) monDays.push(monthDays[j].toLocaleDateString());
	}
	console.log(monDays);
	return monDays;
}

function getMonDatesByYear(year) {
	var months = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
	var monDays = new Array();
	for (var i = 0; i < months.length; i++) {
		monDays.push(getMonDatesByMonth(year, i + 1));
	}
	console.log(monDays);

}