import {GET_PRIVATE_VIEW, GET_PERSONAL_FORM_LIST,GET_PRIVATE_FORM,GET_PRIVATE_LIST,SAVE_PRIVATE_FORM,DELETE_PRIVATE_FORM} from '../actionTypes'

export const Get_PrivateViewAction =(data)=>{
    // console.log("PrivateView Action")
    return{
        type: GET_PRIVATE_VIEW,
        data:data
    }
}

export const Get_PersonalFormListAction =(data)=>{
    // console.log("PersonalFormList Action")
    return{
        type: GET_PERSONAL_FORM_LIST,
        data:data
    }
}


export const Get_PrivateForm=(data)=>{
    // console.log("PrivateForm Action")
    return{
        type: GET_PRIVATE_FORM,
        data:data
    }
}

export const Get_PrivateListAction=(data)=>{
    // console.log("PrivateList Action")
    return{
        type: GET_PRIVATE_LIST,
        data:data
    }
}

export const Save_PrivateFormAction=(data)=>{
    // console.log("Save_PrivateForm Action")
    return{
        type: SAVE_PRIVATE_FORM,
        data:data
    }
}

export const Delete_PrivateFormAction=(data)=>{
    // console.log("Delete_PrivateForm Action")
    return{
        type: DELETE_PRIVATE_FORM,
        data:data
    }
}