
const localEvent = function (item) {
    this.get = function () {
        //本地localStorage中有以 声明时传入参数 为名的内容
        //有则将该内容从json格式转为js对象并返回，没有则返回空字符串
        return localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) : '';
    }
    this.set = function (obj) {
        //将使用时传参的js对象转化为json格式后
        //储存进以 声明时传参为名的localStorage数据中
        localStorage.setItem(item, JSON.stringify(obj));
    }
    this.clear = function () {
        //清除 以声明时传参为名的localStorage数据
        localStorage.removeItem(item);
    }
}

export const theme_local = new localEvent('lx_theme');