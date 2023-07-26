const {Controller} = require('egg')
class BaseController extends Controller{
  get user() {
    return this.ctx.session.account
  }
  success(status, data) {
    this.ctx.body = {
      status,
      data
    }
  }
  fail(status, message) {
    const {ctx} = this
    ctx.body = {
      status,
      message
    }
  }
  notFound(message) {
    this.ctx.body = {
      statue: 404,
      message
    }
  }
}

module.exports = BaseController;