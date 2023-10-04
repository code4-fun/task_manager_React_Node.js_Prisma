import { makeRequest } from "./request"

export function fetchBoardsApi(projectId) {
  return makeRequest(`/boards/${projectId}`)
}
