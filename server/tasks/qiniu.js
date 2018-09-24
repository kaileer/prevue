
const qiniu = require('qiniu')
const nanoid = require('nanoid')
const config = require('../config')

const bucket = config.qiniu.bucket
const mac = new qiniu.auth.digest.Mac(config.qiniu.AK, config.qiniu.SK)
const cfg = new qiniu.conf.Config()
const client = new qiniu.rs.BucketManager(mac, cfg)

const uploadToQiniu = async (url, key) => {
	return new Promise((resolve, reject) =>{
		client.fetch(url, bucket, key, (err, ret, info) => {
			if(err){
				reject(err)
			}else{
				if(info.statusCode === 200){
					resolve({key})
				}else{
					reject(info)
				}
			}
		})
	})
}

;(async () => {
	let movies =[
		{
			video: 'http://vt1.doubanio.com/201809221703/98b3b2e9a2b1e20290055a199867c55d/view/movie/M/402330315.mp4',
			doubanId: '26752088',
			poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2517753454.jpg',
			cover: 'https://img1.doubanio.com/img/trailer/medium/2527050797.jpg?'
		}
	]
	movies.map(async movie => {
		if(movie.video && !movie.key){
			try{
				console.log('开始视频')
				let videoData = await uploadToQiniu(movie.video, nanoid() + '.mp4')
				console.log('正在传cover')
				let coverData = await uploadToQiniu(movie.cover, nanoid() + '.png')
				console.log('正在传poster')
				let posterData = await uploadToQiniu(movie.poster, nanoid() + '.png')
				if(videoData.key){
					movie.videoKey = videoData.key
				}
				if(coverData.key){
					movie.coverKey = coverData.key
				}
				if(posterData.key){
					movie.posterKey = posterData.key
				}
				console.log(movie)
			}catch(err){
				console.log(err)
			}
		}
	})
})()