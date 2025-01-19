import { HOST_API } from "./hostApi";

export const signinApi = () => {
    return HOST_API + '/view/token/users/user_token/';
}

export const tokenVerifyApi = () => {
    return HOST_API + '/view/token/users/user_token_verify/';
}

export const currentUserApi = (props: { token: string }) => {
    return HOST_API + '/view/token/users/get_current_user?token=' + props.token;
}

export const updatePasswordApi = (id: number) => {
    return HOST_API + '/view/api/users/user/' + id + '/';
}

export const changeAuthImageApi = (userPhotoId?: number) => {
    if(userPhotoId)
        return HOST_API + '/view/api/users/user-photo/' + userPhotoId + '/';
    else
        return HOST_API + '/view/api/users/user-photo/';
}