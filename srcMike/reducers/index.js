import {combineReducers} from 'redux'

const init={
    id: '',
    username: '',
    

}

const AuthReducer = (state = init, action)=>{
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {...state, id: action.payload.id, username: action.payload.username}
           
        case 'LOGOUT_USER':
            window.location.pathname='/'
            return {...state,...init}
    
        case 'AUTH_SUCCESS':
            return {...state, error :'',success: action.payload}

        case 'AUTH_ERROR':
            return {...state, error :action.payload, success: ''}

        case 'SET_TIMEOUT':
            return {...state, error:'',success:''}

    default:
            return state
    }
}
const init2={
    id: '',
    username: '',
    email: ''
}

//bagian register
const RegisReducer = (state = init2, action)=>{
    switch (action.type) {
        case 'REGISTER_SUCCESS':
            return {...state, id: action.payload.id, username: action.payload.username, email: action.email}
           
            default:
            return state
    }
}


export default combineReducers(
    {
        auth: AuthReducer,
        auth2: RegisReducer //untuk register
    }
)