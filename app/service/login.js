'use strict'

const BaseService = require('./index.js')
const md5 = require('md5')
const uuid4 = require('uuid')

class LoginService extends BaseService {
  async register(json) {
    const { ctx } = this
    return ctx.model.User.create(json)
  }
}

module.exports = LoginService