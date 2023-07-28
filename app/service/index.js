const Service = require('egg').Service;

class BaseService extends Service {
  // 查询全量数据
  async _findAll(modalName) {
    const {ctx, app} = this
    try{
      const data = await ctx.model[modalName].findAll()
      return data
    }catch(err){
      return err
    }
  }
  // 根据ID查询
  async _findById(modelName, id) {
    const {ctx, app} = this
    try{
      return await ctx.model[modelName].findByPk(id)
    }catch(err){
      return err
    }
  }
  // 新增数据
  async _add(modalName, json) {
    const {ctx, app} = this
    try{
      await ctx.model[modalName].create(json)
      return '新增成功'
    }catch(err) {
      return err
    }
  }
  // 编辑数据
  async _edit(modalName, json) {
    const {ctx} = this
    try{
      const result = await ctx.model[modalName].findByPK(json.id)
      if(!result) return '未查询到数据'
      await result.update({...json})
      return true
    }catch(err) {
      return err
    }
  }
  // 删除数据
  async _delete(modalName, json) {
    const {ctx} = this
    try{
      const result = await ctx.model[modalName].findByPk(json.id)
      if(!result) return '删除失败'
      await result.destroy()
      return true
    }catch(err) {
      return err
    }
  }
}

module.exports = BaseService