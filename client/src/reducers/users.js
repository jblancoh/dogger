const user = (state = { data: {} }, { type, payload }) => {
  switch (type) {
    case 'GET_USER':
      return {
        ...state,
        ...payload
      }
    case 'LOG_OUT':
      return {}
    case 'RESET':
      return {}
    default:
      return state
  }
}

export default user