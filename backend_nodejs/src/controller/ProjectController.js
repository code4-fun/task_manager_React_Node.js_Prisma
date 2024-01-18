import ProjectService from '../service/ProjectService.js'
import ApiError from '../error/ApiError.js'

class ProjectController{
  async getAll(req, res, next){
    try{
      const projects = await ProjectService.getAllProjects()
      return res.json(projects)
    } catch(e){
      next(ApiError.badRequest())
    }
  }

  async create(req, res, next){
    try{
      if(req.body.name === "" || req.body.name == null){
        return next(ApiError.badRequest('Project name is required'))
      }
      const project = await ProjectService.createProject(req.body)
      return res.json(project)
    } catch(e){
      next(ApiError.badRequest())
    }
  }

  async getOne(req, res, next){
    try{
      const project = await ProjectService.getProjectById(req.params.id)
      return res.json(project)
    } catch(e){
      next(ApiError.badRequest())
    }
  }

}

export default new ProjectController()
