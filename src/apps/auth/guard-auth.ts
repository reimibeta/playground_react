
import { verifyToken } from "../token/verify-token";

export interface OnGuardProps {
    // auth: Auth,
    onUnauthorized: () => void,
    onAuthorized: (token?: string) => void,
}

export const navigationGuard = (token: string, props: OnGuardProps) => {
    verifyToken(token, {
        onError(error) {
            // console.log(error)
            // clear auth and token redirect to login
            // navigation.replace(appRoutes.moreAccountScreen.name);
            props.onUnauthorized();
        },
        onResponse(data) {
            // console.log(data)
            if(data.success){
                props.onAuthorized(token);
            } else {
                props.onUnauthorized();
            }
        },
    });
}

//
// export interface AppStateGuardInteface {
//     onActive?: () => void,
//     onInactive?: () => void,
//     onBackground?: () => void,
// }

// export const appStateGuard = (props: AppStateGuardInteface) => {
//     AppState.addEventListener('change', (state) => {
//         switch ( state ) {
//             case 'active':
//                 if(props.onActive){
//                     props.onActive();
//                 }
//                 // console.log('app state', state)
//                 break;
//             case 'background':
//                 if(props.onBackground){
//                     props.onBackground();
//                 }
//                 // console.log('app state', state)
//                 break;
//             case 'inactive':
//                 if(props.onInactive){
//                     props.onInactive();
//                 }
//                 // console.log('app state', state)
//                 break;
//             }
//     });
// }