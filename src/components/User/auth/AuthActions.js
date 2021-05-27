import {LOGIN_REQUEST,SUCCESS,FAILURE} from '.AuthTypes';

export const authenticateUser = (email,password) =>{

    return dispatch =>{

        dispatch(loginRequest());
        if(email==="test" && password==="test"){
            dispatch(success());
        }else{
            dispatch(failure());
        }
    };
};

const loginRequest =() =>{
    return{

        type:LOGIN_REQUEST
    };
};

const success =() =>{
    return{

        type:SUCCESS,
        playload:true
    };
};

const failure =() =>{
    return{

        type:FAILURE,
        payload:false 
    };
};

