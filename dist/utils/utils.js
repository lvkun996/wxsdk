"use strict";
/**
 * @description 获取url 中的 任意字段
 * @param name url想要获取的字段
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.upper = exports.getQueryString = void 0;
const getQueryString = (name) => {
    let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
    let r = window.location.search.substr(1).match(reg); // 获取url中"?"符后的字符串并正则匹配
    let context = '';
    if (r != null) {
        context = r[2];
    }
    reg = null;
    r = null;
    return context == null || context == '' || context == 'undefined' ? '' : context;
};
exports.getQueryString = getQueryString;
/**
 * @description 数字转成大写
 */
function upper(n) {
    if (!/(^[1-9]\d*$)/) {
        return '非法数字';
    }
    var uppercase = '千百亿千百十万千百十个';
    var nLength = n.length;
    var newStr = '';
    if (uppercase.length - nLength < 0) {
        return '数字过长';
    }
    uppercase = uppercase.substr(uppercase.length - nLength);
    for (var i = 0; i < nLength; i++) {
        newStr += '零一二三四五六七八九'.charAt(n[i]) + uppercase.charAt(i);
    }
    ;
    newStr = newStr.substr(0, newStr.length - 1);
    return newStr;
}
exports.upper = upper;
exports.default = {
    getQueryString: exports.getQueryString,
    upper
};
