const Koa = require('koa')
const app = new Koa()
// const ejs = require('ejs')
const views = require('koa-views')
const static = require('koa-static')
const { resolve } = require('path')
// const { ejsTpl } = require('./tpl')
app.use(views(
    resolve(__dirname, './views'),
    {
        extension: 'ejs'
    }
))
app.use(static(
    resolve(__dirname, './public')
))
app.use(async (ctx,next) => {
	await ctx.render('index', {
        name: 'wangtaokai'
    })
})
app.listen(8090)