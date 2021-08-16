
const initialState = {
  user: null,
  btn: 'Log-In',
  vacations:[],
  followedVacationsId:[]
}

export function reducer (state = initialState, action) {
  switch (action.type) {
    case 'login':
      return {...state, user: action.payload, btn: 'Log-Out'}
    case 'logout':
      return {...state, user: null, btn: 'Log-In'}
    case 'getVacations':
      return {...state, vacations: action.payload}
    case 'getFollowedVacations':
      return {...state, followedVacationsId: action.payload}
    default:
      return state
  }
}
