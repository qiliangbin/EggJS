module.exports = (options, app) => {
  return async function csrf(ctx, next) {
    // const needLogin = options.ignore.some(v => {
    //   if(v === ctx.)
    // })
    ctx.state.csrf = ctx.csrf
    await next()
  }
}