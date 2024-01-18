// Returns cookie by name
export function getCookie(cname){
  let name = cname + "="
  let decodedCookie = decodeURIComponent(document.cookie)
  let ca = decodedCookie.split(';')
  for(let i = 0; i < ca.length; i++){
    let c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0){
      return c.substring(name.length, c.length)
    }
  }
  return ""
}

/*
Groups comments by parent id. Returns an object like the following
{
  null: [{comment1, comment3}]
  21344a70-24bf-4cb9-ae49-e9d68dcd2a63: [{comment2}, {comment5}]
  ...
}
*/
export const getCommentsByParentId = (comments) => {
  const group = {}
  comments.forEach(comment => {
    group[comment.parentId] ||= []
    group[comment.parentId].push(comment)
  })
  return group
}
