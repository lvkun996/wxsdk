"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const weixin_js_sdk_1 = (0, tslib_1.__importDefault)(require("weixin-js-sdk"));
/**
 * @description 微信网页
 * @param appid 公众号appid
 * @param baseUrl 跳转基地址
 * @param url 跳转路由
 * @param state 微信state
 */
const wxLogin = (appid, baseUrl, url = '/', state = 1) => {
    const redirect_uri = encodeURIComponent(baseUrl + url);
    window.location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?&appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`);
};
/**
 * @description 注册微信的config
 * @param { boolean } debug 是否开启调试
 * @param { object } data 注册wx.config 后端返回字段
 * @param { Array } jsApiList 注册微信config API 列表
 */
const registerWXConfig = (debug = false, data, jsApiList = []) => {
    const _jsApiList = ["updateAppMessageShareData", "updateTimelineShareData", "onMenuShareWeibo", "chooseImage", "getLocalImgData", "uploadImage"];
    weixin_js_sdk_1.default.config(Object.assign(Object.assign({ debug }, data), { jsApiList: jsApiList.length > 0 ? jsApiList : _jsApiList }));
};
/**
 * @description 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
 * @param title 分享标题
 * @param desc 分享描述
 * @param link 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
 * @param imgUrl 分享图标
 */
const updateAppMessageShareData = (data) => {
    return new Promise((resolve, reject) => {
        weixin_js_sdk_1.default.updateAppMessageShareData(Object.assign(Object.assign({}, data), { success: function () {
                resolve({ msg: '调用成功' });
            } }));
    });
};
/**
 * @description 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
 * @param { string } title 分享标题
 * @param { string } link 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
 * @param { string } imgUrl 分享图标
 *
 */
const updateTimelineShareData = (data) => {
    return new Promise((resolve, reject) => {
        weixin_js_sdk_1.default.updateTimelineShareData(Object.assign(Object.assign({}, data), { success: function () {
                resolve({ msg: '调用成功' });
            } }));
    });
};
/**
 *
 * @description 拍照或从手机相册中选图接口 --> 上传图片接口, 可获得与微信原生上传一样的体验
 * @param { number } count // 默认9 不能超过9， 超过无效
 * @param { string } sizeType // 可以指定是原图还是压缩图，默认二者都有
 * @param { string } sourceType // // 可以指定来源是相册还是相机，默认二者都有
 * @example chooseImage = (1, ['original', 'compressed'], ['album', 'camera'])
 *
 */
const chooseImage = (count, sizeType, sourceType) => {
    return new Promise((resolve, reject) => {
        weixin_js_sdk_1.default.chooseImage({
            count,
            sizeType,
            sourceType,
            success: function (res) {
                resolve(res);
            }
        });
    });
};
/**
 * @description 上传图片
 * @param { string } localId 需要上传的图片的本地ID，由chooseImage接口获得
 * @param { number } isShowProgressTips // 默认为1，显示进度提示
 */
const uploadImage = (localId) => {
    return new Promise((resolve, reject) => {
        weixin_js_sdk_1.default.uploadImage({
            localId,
            isShowProgressTips: 1,
            success: function (res) {
                resolve(res);
            }
        });
    });
};
/**
 * @description 从相册选择并且上传图片
 * @param count // 默认9 不能超过9， 超过无效
 * @param sizeType // 可以指定是原图还是压缩图，默认二者都有
 * @param sourceType // // 可以指定来源是相册还是相机，默认二者都有
 * @returns  上传微信的图片信息集合
 */
const chooseUploadImage = (count, sizeType, sourceType) => {
    return new Promise((resolve, reject) => {
        chooseImage(count, sizeType, sourceType).then((r1) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
            const len = r1.localIds.length;
            let r = [];
            for (let i = 0; i < len; i++) {
                const id = r1.localIds[i];
                r.push(yield uploadImage(id));
            }
            resolve(r);
        }));
    });
};
exports.default = {
    wxLogin,
    registerWXConfig,
    updateAppMessageShareData,
    updateTimelineShareData,
    chooseImage,
    uploadImage,
    chooseUploadImage
};
