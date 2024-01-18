import {Role} from '../db/models/index.js'
import Filter from './FilterService.js'

class RoleService{
  async getAllRoles(){
    return await Role.findAll() || []
  }

  async createRole(data){
    return await Role.create({...data})
  }

  async getRoleById(id){
    return await Role.findByPk(id) || {}
  }

  async getRoleByQueryString(queryParams){
    const safeParams = {
      name: ['eq'],
    }

    const filterCriteria = Filter.transform(safeParams, queryParams)

    return await Role.findAll({
      where: filterCriteria
    })
  }
}

export default new RoleService()
