import { makeRequest } from "./request"

export const fetchCommentsApi = taskId => {
  return makeRequest(`tasks/${taskId}/comments`)
}

export function createComment({taskId, message, parentId}){
  return makeRequest(`tasks/${taskId}/comments`, {
    method: "POST",
    data: {message, parentId}
  })
}

export function updateComment({taskId, message, id}) {
  return makeRequest(`tasks/${taskId}/comments/${id}`, {
    method: "PUT",
    data: {message}
  })
}

export function deleteComment({taskId, id}) {
  return makeRequest(`tasks/${taskId}/comments/${id}`, {
    method: "DELETE"
  })
}
