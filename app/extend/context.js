'use strict';
module.exports = {
  SUCCESS_CODE: 200,
  ERROR_CODE: 500,
  NOT_FOUND: 404,
  NO_LOGIN_CODE: 100, // 未登录
  // 获取token
  getToken() {
    return this.cookies.get('token', { signed: false });
  },
  //设置token
  setToken(data = {}) {
    try{
      const { app } = this;
      let { account, uid } = data;
      const token = app.jwt.sign(data, app.config.jwt.secret, {
        expiresIn: '12h',
      });
      /**
       * @param {Boolean} httpOnly 设置键值对是否可以被 js 访问，默认为 true，不允许被 js 访问。
       * @param {Boolean} overwrite 设置 key 相同的键值对如何处理，如果设置为 true，则后设置的值会覆盖前面设置的，否则将会发送两个 set-cookies 响应头。
       * @param {Boolean} signed 设置是否对 cookies 进行签名，如果设置为 true，则设置键值对的时候会同时对这个键值对的值进行签名，后面取的时候做校验，可以防止前端对这个值进行篡改。默认为 true。
       */
      const cookiesConfig = {
        maxAge: 1000 * 3600 * 24 * 7,
        httpOnly: false,
        overwrite: true,
        signed: false,
      };
      // ctx.cookies.set(key, value, {
      //   httpOnly: false,
      //   signed: false,
      // });
      this.cookies.set('token', token, {...cookiesConfig, httpOnly: true});
      this.cookies.set('account', account, cookiesConfig);
      this.cookies.set('uid', uid, cookiesConfig);
    }catch(err) {
      console.log(err)
    }
  },
  removeToken() {
    this.cookies.set('token', null);
  },
  // 校验token
  async verifyToken() {
    const { app } = this;
    const token = this.getToken();
    const account = this.cookies.get('account', { signed: false });
    const uid = this.cookies.get('uid', { signed: false });
    const verifyResult = await new Promise((resolve, reject) => {
      app.jwt.verify(token, app.config.jwt.secret, (err, decoded) => {
        if(err) {
          if (err.name === 'TokenExpiredError' && uid) {
              this.setToken({ account, uid }); // 刷新token
              resolve({ verify: true, message: { uid } });
            } else {
              resolve({ verify: false, message: err.message });
            }
        } else {
          resolve({verify: true, message: decoded})
        }
      })
    });
    if(!verifyResult.verify) {
      this.verifyFail(401, verifyResult.message)
    }
    if(uid !== verifyResult.message.uid) {
      this.verifyFail(401, '用户UID和Token不一致')
    }
    this.request.body.uid = uid
    this.request.body.account = account
    return true
  },
  // token校验失败
  verifyFail(code, msg) {
    this.body = { code, msg };
    this.status = code;
  },
};
