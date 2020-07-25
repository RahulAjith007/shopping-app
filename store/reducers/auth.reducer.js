import {SIGNIN, SIGNUP} from '../actions/auth.actions'

const initialState = {
    token: null,
    userId: null
}

export default(state=initialState, action) => {
    switch(action.type){
        case SIGNIN:
            return{
                token: action.token,
                    userId: action.userId
            }
            case SIGNUP:
                return{
                    token: action.token,
                    userId: action.userId
                }
            default:
                return state;
    }
}