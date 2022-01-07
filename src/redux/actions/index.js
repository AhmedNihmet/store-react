export const increment = (val) => {
  return {
    type: 'INCREMENT',
    payload: val
  }
}

export const decrement = (val) => {
  return {
    type: 'DECREMENT',
    payload: val
  }
}

export const login = () => {
  return {
    type: 'SIGN_IN',
  }
}

export const logout = () => {
  return {
    type: 'SIGN_OUT',
  }
}