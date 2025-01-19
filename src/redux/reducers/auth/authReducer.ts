import {
 AUTH
} from "../../actions/auth/authActionType";


export const initState = {
    auth: {}
}

const auths = (state = initState, action: any) => {
    if (action.type === AUTH){
        // console.log("state", action.payload.profile);
        return { 
            ...state, 
            auth: action.payload
        };
    }
    return state;
}

export default auths;
