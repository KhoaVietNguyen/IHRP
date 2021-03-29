import { UPLOAD_AVATAR } from './../actionTypes'

export const uploadAvatarAction = (input) => {
    return {
        type: UPLOAD_AVATAR,
        input: input
    }
}