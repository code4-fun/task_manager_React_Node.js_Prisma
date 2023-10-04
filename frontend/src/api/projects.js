import { makeRequest } from "./request"

export function fetchProjectsApi(){
  return makeRequest("/projects")
}

export function createProjectApi(data){
  return makeRequest("projects", {
    method: "POST",
    data: data
  })
}

export function deleteProjectApi({projectId}){
  return makeRequest(`projects/${projectId}`, {
    method: "DELETE"
  })
}

export function updateProjectApi(data){
  return makeRequest(`projects/${data.id}`, {
    method: "PUT",
    data: data
  })
}
