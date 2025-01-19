import { RequestInterface } from "../../../apps/request/interfaces/request.interface";
import { Auth, Token } from "../../../models/auth/auth";
import { signinApi, currentUserApi, updatePasswordApi, changeAuthImageApi } from "../../../urls/authApi";
import { request } from "../../../apps/request/request";
import { AUTH, AUTH_IMAGE } from "./authActionType";
import { TOKEN } from "../../../constants/authenticated.constant";
import { OnGuardProps, navigationGuard } from "../../../apps/auth/guard-auth";
import { requestCurrentCustomer } from "../../../apps/auth/checkAuth";
import { UserPhoto } from "../../../models/user/user";

export const dispatchAuth = (
    props: Auth
) => (dispatch: any) => {
    dispatch({
        type: AUTH,
        payload: {
            token: props.token,
            message: props.message,
            success: props.success,
            saveToken: props.token.access,
            user: props.user
        }
    });
}

export const dispatchSignin = (phone: string, password: string, props: RequestInterface<Auth>) => (dispatch: any) => {
    // clear state
    localStorage.setItem(TOKEN, '');
    // clean auth state
    dispatchAuth({
        token: { access: '', refresh: ''},
        message: '',
        success: false,
        saveToken: '',
        user: undefined
    })(dispatch);
    request.post<Auth>(signinApi(), { phone: phone, password: password }, {
        ...props,
        onResponse(data) {
            if(props.onResponse) props.onResponse(data)
            // renew auth state
            dispatchAuth(data)(dispatch);
            // set token pref
            // setPreference(TOKEN, data.token.access);
            localStorage.setItem(TOKEN, data.token.access);
        },
        onError(error) {
            if(props.onError) props.onError(error)
            // clear auth
            dispatchAuth({
                token: { access: '', refresh: '' },
                message: '',
                success: false,
                saveToken: '',
                user: undefined
            })(dispatch);
            // clear state
            localStorage.setItem(TOKEN, '');
        },
    });
}

export const dispatchSignout = (props: RequestInterface<Auth>) => (dispatch: any) => {
    // clear auth
    dispatchAuth({
        token: { access: '', refresh: '' },
        message: '',
        success: false,
        saveToken: '',
        user: undefined
    })(dispatch);
    // clear pref
    // clearPreference(TOKEN);
    localStorage.setItem(TOKEN, '')
    // // clear user, will remove it later
    setTimeout(() => {
        if(props.onFinish){
            props.onFinish();
        }
    }, 300);
};

export const dispatchAuthGuard = (token: string | '', props: OnGuardProps) => (dispatch: any) => {
    navigationGuard(token,{
        onAuthorized(t) {
            requestCurrentCustomer(t ?? '', {
                onResponse(data) {
                    // console.log(data)
                    dispatchAuth({
                        token: { access: t ?? '', refresh: '' },
                        message: '',
                        success: true,
                        saveToken: t ?? '',
                        user: data
                    })(dispatch);
                    setTimeout(() => {
                        if(props.onAuthorized){
                            props.onAuthorized(token);
                        }
                    }, 300);
                },
            });
            if (props.onAuthorized) props.onAuthorized(t)
        },
        onUnauthorized() {
            dispatchAuth({
                token: { access: '', refresh: '' },
                message: '',
                success: false,
                saveToken: '',
                user: undefined
            })(dispatch);
            if (props.onUnauthorized) props.onUnauthorized()
            localStorage.setItem(TOKEN, '');
        },
    });
}

// 
export interface UpdatePasswordInterface<T> extends RequestInterface<T> {
    phone: string,
    password: string
}

export const dispatchUpdatePassword = (id: number, props: UpdatePasswordInterface<Auth>) => (dispatch: any) => {
    // console.log(updatePasswordApi(id));
    request.put(updatePasswordApi(id), { phone: props.phone, password: props.password }, {}, props);
}

// image
export interface UploadAuthImageInterface<T> extends RequestInterface<T> {
    // userId: number,
    // userPhotoId?: number,
    auth: Auth
}

//
export const dispatchClearCatchImageUpload = () => (dispatch: any) => {
    dispatch({
        type: AUTH_IMAGE,
        payload: undefined
    });
}

export const dispatchUploadImage = (
    base64: string,
    props: UploadAuthImageInterface<UserPhoto>
) => (dispatch: any) => {
    // photo: "data:image\/" + new Date().getUTCMilliseconds() + ".png;base64," + base64
    if(props.auth.user?.user_photo?.id){
        request.put<UserPhoto>(changeAuthImageApi(props.auth.user?.user_photo?.id), { user: props.auth.user?.id, photo: base64 },{}, {
            ...props,
            onResponse(data) {
                if(props.onResponse) props.onResponse(data);
                // reset user state
                const user = props.auth.user;
                if(user?.user_photo){
                    user.user_photo = data
                }
                dispatchAuth({
                    token: { access: props.auth.saveToken ?? '', refresh: '' },
                    message: '',
                    success: true,
                    saveToken: props.auth.saveToken ?? '',
                    user: user
                })(dispatch);
            },
        });
    } else {
        request.post<UserPhoto>(changeAuthImageApi(), { user: props.auth.user?.id, photo: base64 }, {
            ...props,
            onResponse(data) {
                if(props.onResponse) props.onResponse(data);
                // reset user state
                const user = props.auth.user;
                if(user?.user_photo){
                    user.user_photo = data
                }
                dispatchAuth({
                    token: { access: props.auth.saveToken ?? '', refresh: '' },
                    message: '',
                    success: true,
                    saveToken: props.auth.saveToken ?? '',
                    user: user
                })(dispatch);
            },
        });
    }
}