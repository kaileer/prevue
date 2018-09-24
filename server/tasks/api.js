// http://api.douban.com/v2/movie/subject/1764796

const rp = require('request-promise-native')

async function fetchMovie(item) {
	const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`
	const res = await rp(url)
	return res
}

;(async () => {
	let movies = [
		{
			doubanId: 1866479,
			title: '复仇者联盟',
			rate: 0,
			poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p1524904031.jpg' 
		},
		{
			doubanId: 26366496,
			title: '邪不压正',
			rate: 0,
			poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2526297221.jpg'
		}
	]

	movies.map(async movie => {
		let movieData = await fetchMovie(movie)
		console.log(movieData)
		try{
			movieData = JSON.parse(movieData)
			
		}catch(err){
			console.log(err)
		}
	})
})()