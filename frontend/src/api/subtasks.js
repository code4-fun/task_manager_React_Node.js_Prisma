import { makeRequest } from "./request"

export function createSubtaskApi({taskId, description}){
  return makeRequest(`tasks/${taskId}/subtasks`, {
    method: "POST",
    data: {description}
  })
}

export function toggleSubtaskApi({taskId, subtaskId}) {
  return makeRequest(`tasks/${taskId}/subtasks/${subtaskId}`, {
    method: "PUT"
  })
}

export function deleteSubtaskApi({taskId, subtaskId}) {
  return makeRequest(`tasks/${taskId}/subtasks/${subtaskId}`, {
    method: "DELETE"
  })
}
