export const SAVE_USER = 'SAVE_USER'

export const saveUser = userName => ({
  type: SAVE_USER,
  payload: userName
})
