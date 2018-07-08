var weekArray = ['第一周', '第二周', '第三周', '第四周', '第五周'];
$(document).ready(function() {
    // 根据当前日期获取所在年月的第几周信息
    // 获取当前日期所在周的星期信息
    var curMon = getFirstDayOfWeek(new Date()).toLocaleDateString();
    console.log(curMon);
    // 获取指定年份所有周一的日期信息
    var monDates = getMonDatesByYear('2018');
    for (var i = 0; i < monDates.length; i++) {
        for (var j = 0; j < monDates[i].length; j++) {
            if (monDates[i][j] == curMon) {
                console.log(++i + '月' + weekArray[j]);
            }
        }
    }
});

// 根据日期的方法获取当前这一周的周一
function getFirstDayOfWeek(date) {
    // 但是 ! js中的数字0就是false，非0就是true，于是0就被无情的当做false了
    // console.log(0 == false);
    var day = date.getDay() || 7;
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1 - day);
}

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
    // console.log(monthDays);
    var monDays = new Array();
    for (var j = 0; j < monthDays.length; j++) {
        if (monthDays[j].getDay() == 1) monDays.push(monthDays[j].toLocaleDateString());
    }
    // console.log(monDays);
    return monDays;
}

function getMonDatesByYear(year) {
    var months = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
    var monDays = new Array();
    for (var i = 0; i < months.length; i++) {
        monDays.push(getMonDatesByMonth(year, i + 1));
    }
    // console.log(monDays);
    return monDays;
}