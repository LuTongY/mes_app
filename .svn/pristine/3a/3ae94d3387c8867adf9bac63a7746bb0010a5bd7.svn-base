/* 
		@parms url 接口地址
		@parms method 请求方式
		@parms data 参数
		@parms isUpload 默认false 是否上传
 */

// const BASE_URL = "http://120.37.137.59:9901" //公网地址(226服务器)

// const BASE_URL = "http://120.37.137.59:8086" //公网地址(190本地公网)

const BASE_URL = "http://192.168.60.190:8090"  //测试地址

// const BASE_URL ="https://api.mes.fjgdx.com" //小程序ssL地址

const request = (url, data, isUpload = false) => {
	return new Promise((resolve, reject) => {
		if(!data){data={}};
		for(let key in data){
			if(data[key] === ''){
				delete data[key];			
			}
		}
		if (!isUpload) {
			data.factoryId='10';
			// if(!uni.getStorageSync('accessToken')){
			// 	uni.reLaunch({url:'/pages/login/login'})
			// 	uni.showToast({icon: 'none',position: 'top',title: 'TOKEN丢失'});
			// 	return false;
			// }
			data.accessToken=uni.getStorageSync('accessToken');
			uni.request({
				url: BASE_URL + url,
				data: data,
				method: "POST",
				header: { //请求头自定义
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				success: (res) => { //具体捕获请看自己接口返回的形式
				   if(res.data.code !=200){
					   uni.showToast({
					       icon: 'none',
					       position: 'top',
					       title: res.data.message
					   });
				   }
				       
						resolve(res)	
				},
				fail(error) {
					uni.showToast({
					    icon: 'none',
						position: 'top',
					    title: '服务器无响应'
					});
					const obj={
						code:'-1',
						msg:error
					}
					resolve(obj)
					// reject(error)
				},
				complete() {
				}
			});
		} else {
			uni.uploadFile({
				url: _url,
				filePath: data,
				name: 'file',
				header: {
					'X-Access-Token': TOKEN
				},
				formData: {
					file: data,
					fileType: '1',
					pathType: "1"
				},
				success: (uploadFileRes) => {
					let parms = JSON.parse(uploadFileRes.data)
					let imgurls = parms.result.filePath
					resolve(imgurls)
				},
				fail: () => {
					uni.showToast({
						title: '图片上传失败',
						icon: 'none'
					})
				}
			});
		}

	})
}

export default {
	request  //向外暴露request
}