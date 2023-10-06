import { makeRequest } from "./request"

export function uploadFileApi({taskId, formData}){
  return makeRequest(`tasks/${taskId}/files`, {
    method: "POST",
    data: formData
  })
}

export function deleteFileApi({taskId, fileId}) {
  return makeRequest(`tasks/${taskId}/files/${fileId}`, {
    method: "DELETE"
  })
}
