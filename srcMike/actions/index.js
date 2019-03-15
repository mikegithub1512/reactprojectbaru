import axios from 'axios'
import cookies from 'universal-cookie'


const cookie = new cookies()
// fn action creator yg menghubungkan component ke redux store
export const onLoginClick = (user, pass)=> {
    // utk mengambil dan mencocokkan data yang telah di save di database
    return (dispatch) => {

    
    axios.get("http://localhost:1996/users",{
        params:{
            username : user,
            password : pass
        }
        }).then(res =>{
        if(res.data.length > 0){
            // jika data username ditemukan /object ada isinya
            console.log(res.data[0]);// mengambil object index 0 utk dikirim ke redux

            const {id, username} = res.data[0]//ambil data dari property id dan username
            dispatch({
                type: "LOGIN_SUCCESS",
                payload : {id, username}//penyederhanaan jika key dan valuenya bernama sama, cukup tulis valuenya saja
            })

            cookie.set('masihLogin',username,{path:'/'})
        }else {
            //jika username tidak ditemukan
            dispatch({
            type : 'AUTH_ERROR',
            payload:'username dan password salah'
            })
            // setelah tiga detik akan kirim action untuk menghapus pesan error dan success
                // ini akan menyebabkan component render ulang dan menghilangkan pesan error pada
                // login dan register
                setTimeout(() => {
                    dispatch({
                        type : 'SET_TIMEOUT'
                    })
                }, 3000);
        }

        }).catch(err => {
        console.log('system error')
        })
    }   
}

//untuk registrasi
export const onRegisClick = (user, email, pass)=> {
    return (dispatch) => {
    axios.get("http://localhost:1996/users",{
            params: {
                username: user
            }
        
        }).then(res=> {
            if(res.data.length === 0){
                axios.post('http://localhost:1996/users',{
                    username:user,
                    email: email,
                    password : pass
                }).then(res =>{
                    dispatch({
                        type: 'AUTH_SUCCESS',
                        payload: 'Registrasi Success'
                    })
                    
                })
            }else {
                dispatch({
                    type: 'AUTH_ERROR',
                    payload: 'Username has been taken'
                })
                setTimeout(() => {
                    dispatch({
                        type : 'SET_TIMEOUT'
                    })
                }, 3000);
                
            }
        })
    }
    
}
export const onLogoutClick =() => {
    return {type : "LOGOUT_USER"}
}

export const onSetTimeout =() => {
    return {type: 'SET_TIMEOUT'}
}

export const keepLogin = (user) => {
    return dispatch => {
        axios.get('http://localhost:1996/users', {
            params: {
                username: user
            }
        })
            .then(res => {
                if(res.data.length > 0){
                    dispatch({
                        type: 'LOGIN_SUCCESS',
                        payload: {username: user}
                    })
                }
            })
    }
}