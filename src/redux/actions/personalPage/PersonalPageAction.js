export const GET_PRIVATE_GEN_VIEW = "GET_PRIVATE_GEN_VIEW"
export const GET_PRIVATE_GEN_VIEW_SUCCESS = "GET_PRIVATE_GEN_VIEW_SUCCESS"
export const GET_PRIVATE_GEN_VIEW_ERROR = "GET_PRIVATE_GEN_VIEW_ERROR"
export const REMOVE_PRIVATE_GEN_VIEW = "REMOVE_PRIVATE_GEN_VIEW"

export const GET_PERSONAL_FORM = "GET_PERSONAL_FORM"
export const GET_PERSONAL_FORM_SUCCESS = "GET_PERSONAL_FORM_SUCCESS"
export const GET_PERSONAL_FORM_ERROR = "GET_PERSONAL_FORM_ERROR"


export const GET_PERSONAL_FORM_SOURCE = "GET_PERSONAL_FORM_SOURCE"
export const GET_PERSONAL_FORM_SOURCE_SUCCESS = "GET_PERSONAL_FORM_SOURCE_SUCCESS"
export const GET_PERSONAL_FORM_SOURCE_ERROR = "GET_PERSONAL_FORM_SOURCE_ERROR"

export const SAVE_PERSONAL_FORM = "SAVE_PERSONAL_FORM"
export const SAVE_PERSONAL_FORM_SUCCESS = "SAVE_PERSONAL_FORM_SUCCESS"
export const SAVE_PERSONAL_FORM_ERROR = "SAVE_PERSONAL_FORM_ERROR"

export const RemovePrivateGenViewAction = (input) =>{
    return {
        type: REMOVE_PRIVATE_GEN_VIEW,
        input: input
    }
}

export const getPrivateGenViewAction = (input) =>{
    return {
        type: GET_PRIVATE_GEN_VIEW,
        input: input
    }
}

export const getPersonalFormAction = (input) =>{
    return {
        type: GET_PERSONAL_FORM,
        input: input
    }
}

export const getPersonalFormSourceAction = (input) =>{
    return {
        type: GET_PERSONAL_FORM_SOURCE,
        input: input
    }
}

export const savePersonalFormAction = (input) =>{
    return {
        type: SAVE_PERSONAL_FORM,
        input: input
    }
}