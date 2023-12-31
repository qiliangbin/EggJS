module.exports = (app) => {
  const {STRING, INTEGER, DATE} = app.Sequelize
  const User = app.model.define('users', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    name: STRING(30),
    age: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  },{tableName: 'users',timestamps: false})
  User.associate = function() {
    app.model.User.hasMany(app.model.Admin, {foreignKey: 'id'})
  } 
  return User
}