/***
 * @description 获取网络图片相关信息
 * @param path 图片地址
 * @returns width 图片宽
 * @returns height 图片高
 * @returns mainColor 图片主要颜色
 */

export function asyncGetImgInfo (
  path: string
  ): Promise<{
    width: number,
    height: number,
    mainColor: string
  }> {

  return new Promise(( resolve, reject ) => {

    const img = new Image()

    img.src = path
  
    img.onload = function () {
      
      try {

        const canvas = document.createElement('canvas')
      
        canvas.width = img.width
    
        canvas.height = img.height
    
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D 
    
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data
    
        const color = getMainColor(data);
  
        resolve({
          width: img.width,
          height: img.height,
          mainColor: color
        })
      } catch (error) {
        reject(error)
      }
    }
  })

  function getMainColor(data) {
    const temp = {}
    const len = data.length

    let max = 0;
    let color = ''
    let i = 0
    while(i < len) {
      if (data[i + 3] !== 0) {
        const k = `${data[i]}, ${data[i + 1]}, ${data[i + 2]}, ${(data[i + 3] / 255)}`
        temp[k] = temp[k] ? temp[k] + 1 : 1
        if (temp[k] > max) {
          max = temp[k]
          color = k
        }
      }
      i += 4
    }

    return color
  }

}


/**
 * @description 图片压缩
 */

export function asyncImgCompression () {

}

/**
 * @description 视频取第一帧
 */




