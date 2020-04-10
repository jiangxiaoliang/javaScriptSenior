const md5 = require('md5')
const musicService = require('../service/musicService')

module.exports = {
   async testService(ctx) {
       ctx.body = 'hello'
   },
   async login(ctx, next) {
       let cookiesInfo = ctx.cookies.get('isLogin')
       if (cookiesInfo) {
           let serviceInfo = md5('jxl'+'123')
           if (cookiesInfo === serviceInfo) {
               ctx.redirect('/list')
           }
       }
       await ctx.render('login.pug')
   },
   async checkUser(ctx, next) {
    //    console.log(ctx.request.body)
       let { username, pwd } = ctx.request.body
       if (username === 'jxl' && pwd === '123') {
           if (ctx.request.body.rememberMe) {
               let loginStatus = md5(username + pwd)
               ctx.cookies.set('isLogin', loginStatus, {
                   maxAge: 3600000 * 24
               })
           }
           ctx.redirect('/list')
       } else {
           ctx.redirect('/error')
       }
   },
   async list(ctx) {
       let musicData = musicService.getMusicList()
       await ctx.render('list.pug', {
           musicData
       })
   },
   async error(ctx) {
       await ctx.render('error.pug')
   },
   async detail(ctx) {
       await ctx.render('detail.pug')
   }
}