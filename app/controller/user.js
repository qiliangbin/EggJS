'use strict';

const Controller = require('../core/base_constroller');
const ms = require('ms');
class UserController extends Controller {
  async create() {
    const { ctx } = this;
    const data = await ctx.service.user.create()
    this.success(200, data);
  }
  async getUserList() {
    const { ctx } = this;
    const data = await ctx.service.user.findUser();
    // const data = await ctx.service.user.findUser()
    this.success(200, data);
  }
  async login() {
    const { ctx, app } = this;
    try {
      const rule = {
        account: 'string',
        password: 'string',
        // rememberMe: 'number',
      };
      ctx.validate(rule);
      const { account, password } = ctx.request.body;
      const data = await ctx.service.user.getAdminLogin(account, password);
      if (data.length) {
        this.success(200, data);
        ctx.setToken({account: data[0].account, uid: data[0].uid})
        // if (rememberMe > 0) ctx.session.maxAge = ms('7d');
      } else {
        this.fail(500, '账号不存在');
      }
    } catch (err) {
      this.fail(500, err);
    }
  }
  async register() {
    try {
      const { ctx, app } = this;
      const rule = {
        account: 'string',
        password: 'string',
      };
      ctx.validate(rule);
      const { account, password } = ctx.request.body;
      const sameAccount = await ctx.service.user.verifyAccount(account)
      if(sameAccount) {
        this.fail(500, '账户名重复')
      } else {
        await ctx.service.user.adminRegister(account, password);
        this.success(200, null)
      }
    } catch(err) {
      this.fail(500, err);
    }
  }
  async edit() {
    const {ctx} = this
    const rule = {
      account: 'string',
      password: 'string'
    }
    ctx.validate(rule)
    console.log(ctx.request.body)
    const data = await ctx.service.user.changePassword({id: 11,account: 'admin1121', password: '212121212'})
    // console.log(data, '000000')
  }
  async delete() {
    const {ctx, app} = this
    const rule = {
      account: 'string'
    }
    ctx.validate(rule)
    const {account} = ctx.request.body
    console.log(ctx.request.body, '---', account)
    const data = await ctx.service.user.deleteAdmin(account)
    this.success(200, data)
  }
}

module.exports = UserController;
