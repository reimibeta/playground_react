import { Auth } from "../../models/auth/auth";
import { User } from "../../models/user/user";
import { currentUserApi } from "../../urls/authApi";
import { RequestInterface } from "../request/interfaces/request.interface";
import { request } from "../request/request";

export const checkAuth = (auth: Auth) => {
    if(auth && auth.saveToken !== "") return true
}

export const requestCurrentCustomer = (token: string, props: RequestInterface<User>) => {
    request.get<User>(currentUserApi({ token: token }), props);
}