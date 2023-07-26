'use strict';

const Service = require('egg').Service;
const md5 = require('md5');
// 1、uuid.v1(); -->基于时间戳生成  （time-based）
// 2、uuid.v4(); -->随机生成  (random)
const uuid4 = require('uuid');

class UserService extends Service {
  async create() {
    const { ctx } = this;
  }
  async findUser() {
    const { ctx, app } = this;
    const data = await app.mysql.select('user'); // SELECT * from `user`
    return data;
  }
  async getAdminLogin(account, password) {
    return await this.app.mysql.select('admin', {
      where: {
        account,
        password: md5(password),
      }
    });
  }
  async adminRegister(account, password) {
    const data = {
      account,
      password: md5(password),
      uid: uuid4.v4(),
    };
    return await this.app.mysql.insert('admin', data);
  }
  async verifyAccount(account) {
    return await this.app.mysql.get('admin', {account})
  }
  async changePassword(account, password) {

  }
  async deleteAdmin(account) {
    return await this.app.mysql.delete('admin', {account})
  }
  async changePassword(params) {
    params.password = md5(params.password)
    // console.log(params, '---')
    return await this.app.mysql.update('admin', params)
  }
}
module.exports = UserService;
