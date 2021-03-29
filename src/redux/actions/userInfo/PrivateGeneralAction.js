import {GET_PRIVATE_GENERAL,SUBMIT_PRIVATE_GENERAL} from '../actionTypes'

export const Get_PrivateGeneralAction =(data)=>{
    // console.log("PrivateGeneral Action")
    return{
        type: GET_PRIVATE_GENERAL,
        data:data
    }
}

export const Submit_PrivateGeneralAction =(data)=>{
    // console.log("PrivateGeneral Action")
    return{
        type: SUBMIT_PRIVATE_GENERAL,
        data:data
    }
}