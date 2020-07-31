const Router = require('koa-router')
const ArticleController = require("../controllers/article")
const UserController = require("../controllers/user")
const sourceController = require("../controllers/source")

const router = new Router({
  prefix:'/index'
})

//文章接口
//创建文章接口（路由）
// router.post('/article',ArticleController.create);
//获取文章详情接口（路由）
// router.get('article/:id',ArticleController.detial);

//用户接口
//创建用户接口（路由）(注册)
router.post('/Register',UserController.create);
//获取用户详情接口（路由）
router.post('/Login',UserController.getUserInfo);

//资源接口
//上传资源
router.post('/addSource',sourceController.create);
//查询全部资源
router.post('/searchSource',sourceController.getAllSource);
//模糊查询资源
router.post('/SourceVague',sourceController.getSourceVague);

// router.get('/', async (ctx, next) => {
//   await ctx.render('index', {
//     title: 'Hello Koa 2!'
//   })
// })

// router.get('/string', async (ctx, next) => {
//   ctx.body = 'koa2 string'
// })

// router.get('/json', async (ctx, next) => {
//   ctx.body = {
//     title: 'koa2 json'
//   }
// })

module.exports = router
