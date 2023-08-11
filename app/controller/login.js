'use strict'

const Constroller = require('../core/base_constroller')

class LoginConstroller extends Constroller {
  async register() {
    const { ctx } = this
    const { name, age } = ctx.request.body
    if(!name || !age) {
      return this.fail(500, 'name或age为空')
    }
    const data = await ctx.service.login.register({name, age})
  }
}

module.exports = LoginConstroller