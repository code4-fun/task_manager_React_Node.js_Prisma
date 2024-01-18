import UserService from '../service/UserService.js'
import ApiError from '../error/ApiError.js'

class UserController{
  async getAll(req, res, next){
    try{
      const users = await UserService.getAllUsers()
      return res.json(users)
    } catch(e){
      next(ApiError.badRequest())
    }
  }
}

export default new UserController()
