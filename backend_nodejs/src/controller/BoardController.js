import BoardService from '../service/BoardService.js'

class BoardController{
  async getAll(req, res, next){
    try{
      const boards = await BoardService.getAllBoardsOfProject()
      return res.json(boards)
    } catch(e){
      next(e)
    }
  }
}

export default new BoardController()
