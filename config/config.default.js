/* eslint valid-jsdoc: "off" */

'use strict';


/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1684897152859_9182';

  // add your middleware config here
  config.middleware = [];
   // 链接数据库
  config.mysql = {
    client: {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '123456',
      database: 'eggmysql'
    },
     // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  }
  //csrf配置
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: ['http://localhost:7777'],//允许访问接口的白名单
  };
  // validate配置
  config.validate = {
    // convert: false,
    // validateRoot: false,
  }
  // jwt配置
  config.jwt = {
    secret: "123456"//自定义 token 的加密条件字符串
  }
  config.cors = {
    origin:'*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  }
  config.middleware = ['auth']
  // config.csrf = {
  //   enable: true, // 是否开启该中间件，默认 true
  //   // match: ['/user'], // 匹配路由
  //   ignore: ['/login'] // 忽略路由，与 match 不能共用
  // }
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
