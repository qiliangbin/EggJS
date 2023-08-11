module.exports = (app) => {
  const {STRING, INTEGER} = app.Sequelize
  const Admin = app.model.define('admin',{},{tableName: 'admin',timestamps: false})
  // // 建立表之间的关联
  Admin.associate = function() {
    app.model.Admin.belongsTo(app.model.User, { foreignKey: 'id' })
  }
  return Admin
}