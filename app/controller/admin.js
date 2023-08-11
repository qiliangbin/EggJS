'use strict'

const Controller = require('../core/base_constroller')

class AdminController extends Controller{
  async findAdmin() {
    const data = await this.ctx.service.user.findAdmin()
    this.success(200, data)
  }
}

module.exports = AdminController