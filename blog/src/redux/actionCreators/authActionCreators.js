import {SET_USER, RESET_USER} from '../types/authTypes';

const setUser =(data) => ({
    type: SET_USER,
    payload: data
})

const resetUser =() => ({
    type: RESET_USER,
  
})

export const loginUser =(data)=> (dispatch)=>{
    dispatch(setUser(data))
}

export const logoutUser =()=> (dispatch)=>{
    dispatch(resetUser())
}