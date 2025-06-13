import axios from 'axios'

export const registerUser = (user) => async dispatch => {
    dispatch({type:'USER_REGISTER_REQUEST'})
    try {
        const response = await axios.post('/api/users/register', user)
        console.log('Registered user:', response.data);
        dispatch({type:'USER_REGISTER_SUCCESS'})
    } catch (error) {
        dispatch({type:'USER_REGISTER_FAILED', payload: error.response && error.response.data ? error.response.data : error.message})
    }
}

export const loginUser = (user) => async dispatch => {
    dispatch({type:'USER_LOGIN_REQUEST'})
    try {
        const response = await axios.post('/api/users/login', user)
        console.log('Logged in user:', response.data);
        dispatch({type:'USER_LOGIN_SUCCESS', payload: response.data})
        // Save to localStorage
        localStorage.setItem('currentUser', JSON.stringify(response.data));
        window.location.href='/'
    } catch (error) {
        dispatch({type:'USER_LOGIN_FAILED', payload: error.response && error.response.data ? error.response.data : error.message})
    }
}