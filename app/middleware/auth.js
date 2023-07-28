'use strict'
/**
 * 判断是否登录
 * @param {object} options - 中间件的配置项
 * @param {Egg.Application} app - 当前应用的实例
 */
module.exports = (options, app) => {
  return async function auth(ctx, next) {
    const ignorePath = ['/user/login', '/user/register', '/user/logout', '/user/list']
    const isWhite = ignorePath.some(v => ctx.path.indexOf(v) > -1)
    if(isWhite) {
      await next()
    } else {
      const valid = await ctx.verifyToken();
      if(valid) {
        await next()
      } else {
        ctx.body = {
          status: 500,
          message: '没有token'
        }
      }
      // 检测有没有token
    }
  }
}