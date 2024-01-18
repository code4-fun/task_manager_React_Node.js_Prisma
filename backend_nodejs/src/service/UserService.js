import {User} from '../db/models/index.js'

class BoardService{
  async getAllUsers(){
    return User.findAll({
      order: [
        ['name', 'ASC']
      ],
      attributes: ['id', 'name']
    })
  }
}

export default new BoardService()
