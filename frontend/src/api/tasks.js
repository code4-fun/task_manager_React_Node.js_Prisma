import { makeRequest } from "./request"

export function fetchTaskApi(taskId) {
  return makeRequest(`/tasks/${taskId}`)
}

export function updateTaskApi({taskId, ...task}) {
  return makeRequest(`tasks/${taskId}`, {
    method: "PUT",
    data: task,
  })
}

export function createTaskApi(task){
  return makeRequest("tasks", {
    method: "POST",
    data: task
  })
}

export function deleteTaskApi(taskId){
  return makeRequest(`tasks/${taskId}`, {
    method: "DELETE"
  })
}

export function searchTasksApi(search) {
  return makeRequest('/tasks/search', {
    params: {search}
  })
}
