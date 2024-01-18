import RoleService from '../service/RoleService.js'
import ApiError from "../error/ApiError.js";

class RoleController{
  async getAll(req, res, next){
    try{
      const role = await RoleService.getAllRoles()
      res.json(role)
    } catch(e){
      next(ApiError.badRequest(e.message))
    }
  }

  async create(req, res, next){
    if(req.body.name === '' || req.body.name == null){
      return next(ApiError.badRequest('Role name is required'))
    }
    try{
      const role = await RoleService.createRole({
        name: req.body.name
      })
      res.json(role)
    } catch(e){
      next(ApiError.badRequest(e.message))
    }
  }

  async getOneById(req, res, next) {
    try{
      const role = await RoleService.getRoleById(req.params.id)
      res.json(role)
    } catch(e){
      next(ApiError.badRequest(e.message))
    }
  }

  async filter(req, res, next){
    try{
      const roles = await RoleService.getRoleByQueryString(req.query)
      return res.json(roles)
    } catch(e){
      next(ApiError.badRequest(e.message))
    }
  }
}

export default new RoleController()
