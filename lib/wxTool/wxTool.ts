import wx from 'weixin-js-sdk'

/**
 * @description 微信网页
 * @param appid 公众号appid
 * @param baseUrl 跳转基地址
 * @param url 跳转路由
 * @param state 微信state
 */

const wxLogin = (
    appid: string | number, 
    baseUrl: string, 
    url: string = '/', 
    state: number = 1 
  ) => {

  const redirect_uri = encodeURIComponent(baseUrl + url)

  window.location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?&appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`)

}

/**
 * @description 注册微信的config
 * @param { boolean } debug 是否开启调试
 * @param { object } data 注册wx.config 后端返回字段
 * @param { Array } jsApiList 注册微信config API 列表
 */

const registerWXConfig = (
    debug: boolean = false, 
    data: Record<string, any>, 
    jsApiList: string[] = []
  ) => {

    const _jsApiList = ["updateAppMessageShareData", "updateTimelineShareData", "onMenuShareWeibo", "chooseImage", "getLocalImgData", "uploadImage"]

  wx.config({
    debug,
    ...data,
    jsApiList: jsApiList.length > 0 ? jsApiList : _jsApiList
  })

}


type TShareData = {
  title: string,
  desc: string,
  link: string,
  imgUrl: string
}

/**
 * @description 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
 * @param title 分享标题
 * @param desc 分享描述
 * @param link 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
 * @param imgUrl 分享图标
 */

const updateAppMessageShareData = (data: TShareData) => {
  return new Promise( (resolve, reject) => {
    wx.updateAppMessageShareData({
      ...data,
      success: function () {
        resolve({msg: '调用成功'})
      },
    })
  })
}


/**
 * @description 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
 * @param { string } title 分享标题
 * @param { string } link 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
 * @param { string } imgUrl 分享图标
 * 
 */ 

const updateTimelineShareData = (data: TShareData) => {
  return new Promise( (resolve, reject) => {
    wx.updateTimelineShareData({
      ...data,
      success: function () {
        resolve({msg: '调用成功'})
      },
    })
  })
}

/**
 * 
 * @description 拍照或从手机相册中选图接口 --> 上传图片接口, 可获得与微信原生上传一样的体验
 * @param { number } count // 默认9 不能超过9， 超过无效
 * @param { string } sizeType // 可以指定是原图还是压缩图，默认二者都有
 * @param { string } sourceType // // 可以指定来源是相册还是相机，默认二者都有
 * @example chooseImage = (1, ['original', 'compressed'], ['album', 'camera'])
 *
 */

const chooseImage = (
    count: number,
    sizeType: string[], 
    sourceType: string[]
  ) => {
  return new Promise ( (resolve , reject) => {
    wx.chooseImage({
      count,
      sizeType,
      sourceType,
      success: function (res) {
        resolve(res)
      }
    });
  })
}



/**
 * @description 上传图片
 * @param { string } localId 需要上传的图片的本地ID，由chooseImage接口获得
 * @param { number } isShowProgressTips // 默认为1，显示进度提示
 */

const uploadImage = (
  localId: string
) => {
  return new Promise( (resolve, reject) => {
    wx.uploadImage({
      localId,
      isShowProgressTips: 1,
      success: function (res) {
        resolve(res)
      }
    })
  })
}


/**
 * @description 从相册选择并且上传图片
 * @param count // 默认9 不能超过9， 超过无效
 * @param sizeType // 可以指定是原图还是压缩图，默认二者都有
 * @param sourceType // // 可以指定来源是相册还是相机，默认二者都有
 * @returns  上传微信的图片信息集合
 */
const chooseUploadImage = (
  count: number,
  sizeType: string[], 
  sourceType: string[]
) => {
  return new Promise<Record<string, any>[]>((resolve, reject) => {
    chooseImage(count, sizeType, sourceType).then( async (r1: any) => {
      const len = r1.localIds.length
      let r: Record<string, any>[] = []
      for (let i = 0; i < len; i++) {
        const id: string  = r1.localIds[i]
        r.push( await uploadImage(id) as  Record<string, any> )
      }
      resolve(r)
    })
  })
}


export default {
  wxLogin,
  registerWXConfig,
  updateAppMessageShareData,
  updateTimelineShareData,
  chooseImage,
  uploadImage,
  chooseUploadImage
}


