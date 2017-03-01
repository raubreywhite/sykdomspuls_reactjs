const baseURLReducer = (state = "http://sykdomspulsen.fhi.no/api/", action) => {

  switch (action.type) {
    case 'SET_BASE_URL':
      return action.value
    default:
      return state
  }
}

export default baseURLReducer

