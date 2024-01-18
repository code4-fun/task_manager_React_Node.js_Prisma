import {Board} from '../db/models/index.js'

class BoardService{
  async getAllBoardsOfProject(){
    return Board.findAll({
      order: [
        ['order', 'ASC']
      ],
      attributes: ['id', 'order', 'status']
    })
  }

}

export default new BoardService()
