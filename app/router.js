'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/user/list', controller.user.getUserList)
  router.post('/user/create', controller.user.create)
  // 登录相关
  router.post('/user/login', controller.user.login)
  router.post('/user/register', controller.user.register)
  router.post('/user/delete', controller.user.delete)
  router.post('/user/edit', controller.user.edit)
};
