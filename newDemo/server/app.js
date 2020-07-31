const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')

const cors = require("koa-cors")


// 使用koa-cors 
// 服务端设置CORS CORS允许服务端在响应头中添加一些头信息来响应跨域请求
app.use(cors({
  origin:function(ctx){
    if(ctx.url === '/cors'){
      return "*";//允许来自所有域名请求
    }
    return 'http://localhost:8080';
  },
  exposeHeaders:['WWW-Authenticate','Server-Authorization'],
  maxAge:5,
  credentials:true,
  allowMethods:['GET','POST','DELETE'],//设置允许的HTTP请求类型
  allowHeaders:['Content-Type','Authorization','Accept'],
}));

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
