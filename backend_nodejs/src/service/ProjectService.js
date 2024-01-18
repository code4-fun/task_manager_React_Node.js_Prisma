import {Project, User} from '../db/models/index.js'

class ProjectService{
  async getAllProjects(){
    return Project.findAll({
      order: [
        ['createdAt', 'DESC']
      ],
      attributes: ['id', 'name', 'description', 'createdAt'],
      include: {
        model: User,
        as: 'user',
        attributes: ['id']
      }
    })
  }

  async createProject(data) {
    let project = await Project.create({...data, userId: '7a552492-d775-4f8e-9823-968144e60556'})
    project = await this.getProjectById(project.id)
    return project
  }

  async getProjectById(id){
    const project = await Project.findByPk(id, {
      attributes: ['id', 'name', 'description', 'createdAt'],
      include: {
        model: User,
        as: 'user',
        attributes: ['id']
      }
    })
    return project || {}
  }

}

export default new ProjectService()
