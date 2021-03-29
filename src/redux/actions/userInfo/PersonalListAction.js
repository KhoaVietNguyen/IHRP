import {GET_PRIVATE_ALLOW, GET_PRIVATE_PROFILE} from './../actionTypes'

export const Get_PersonalListAction =(data)=>{
    // console.log("Personal Action")
    return{
        type: GET_PRIVATE_ALLOW,
        data:data
    }
}

export const Get_PersonalProfileAction =(data)=>{
    // console.log("Personal Action")
    return{
        type:GET_PRIVATE_PROFILE,
        data:data
    }
}