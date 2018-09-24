const puppeteer = require('puppeteer')

const base = 'https://movie.douban.com/subject/'
const doubanId = '26752088'
const baseUrl = 'https://movie.douban.com/trailer/233315/#content'

const sleep = time => new Promise(resolve => {
	setTimeout(resolve, time);
})

;(async () => {
	console.log('开始')

	const brower = await puppeteer.launch({
		args: ['--no-sandbox']
	})

	const page = await brower.newPage();

	await page.goto(base+doubanId, {
		waitUntil: 'networkidle2'
	})

	await sleep(1000);

	const result = await page.evaluate(() => {
		var $ = window.$
		var it = $('.related-pic-video')
		if(it && it.length>0){
			var link = it.attr('href')
			var cover = it.css('background-image').split("\"")[1]
			return {
				link,
				cover
			}
		}

		return {}
	})

	let video

	if(result.link){
		await page.goto(result.link, {
			waitUntil: 'networkidle2'
		})

		await sleep(1000)

		video = await page.evaluate(() => {
			var $ = window.$
			var it = $('source')

			if(it && it.length>0){
				return it.attr('src')
			}

			return ''
		})
	}

	const data = {
		video,
		doubanId,
		cover: result.cover
	}

	brower.close()
	// console.log(result)
	process.send(data)
	process.exit(0)
})()