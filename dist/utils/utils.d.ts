/**
 * @description 获取url 中的 任意字段
 * @param name url想要获取的字段
 *
 */
export declare const getQueryString: (name: string) => string;
/**
 * @description 数字转成大写
 */
export declare function upper(n: any): string;
declare const _default: {
    getQueryString: (name: string) => string;
    upper: typeof upper;
};
export default _default;
