import User from './user.js'
import Project from './project.js'
import Board from './board.js'
import Role from './role.js'

User.hasMany(Project, {
  foreignKey: 'userId',
  as: 'projects'
})

Project.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
})

Role.belongsToMany(User, {through: 'RoleUser'})
User.belongsToMany(Role, {through: 'RoleUser'})


export {
  User,
  Project,
  Board,
  Role
}
