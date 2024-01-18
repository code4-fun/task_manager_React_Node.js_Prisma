import {Op} from "sequelize";

/**
 * Represents a utility class for converting query parameters to WHERE clauses of Sequelize query.
 *
 * @class
 */
class Filter{
  /**
   * Mapping of query string parameters to Sequelize operators.
   *
   * @private
   * @type {Object}
   */
  #paramsMapping = {
    'eq': Op.eq,
    'gt': Op.gt,
    'gte': Op.gte,
    'lt': Op.lt,
    'lte': Op.lte
  }

  /**
   * Transforms query parameters into Sequelize-compatible filter criteria.
   *
   * @param {Object} safeParams - A dictionary of allowed parameters and their allowed operators.
   * @param {Object} queryParams - The actual query parameters received.
   * @returns {Object} The transformed filter criteria.
   * @throws {Error} Throws an error if an invalid query parameter is encountered.
   *
   * queryParams example: { name:{ eq: 'John' }, age:{ gt: '20', lt: '21' } }
   *
   * An example of returned value:
   * { name: {
   *     [Op.and]: {
   *       [Op.eq]: 'John'
   *     }
   *   },
   *   age: {
   *     [Op.and]: {
   *       [Op.gt]: 20,
   *       [Op.lt]: 40
   *     }
   *   }
   * }
   */
  transform(safeParams, queryParams){
    let transformedFilters = {}

    for(let param in safeParams){
      if(!queryParams.hasOwnProperty(param)){
        continue
      }

      const operators = queryParams[param]

      if(!operators){
        continue
      }

      let operatorFilters = {}
      for(let operator in operators){
        if(safeParams[param].includes(operator)){
          operatorFilters[this.#paramsMapping[operator]] = operators[operator]
        } else {
          throw new Error(`Wrong query string param: ${param}`)
        }
      }

      let paramFilter = {}
      paramFilter[Op.and] = operatorFilters
      transformedFilters[param] = paramFilter
    }

    return transformedFilters
  }
}

export default new Filter()
