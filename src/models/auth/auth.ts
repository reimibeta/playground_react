import { User } from "../user/user"

export interface Auth {
    token: Token,
    message: string,
    success: boolean,
    saveToken: string,
    user?: User
}

export interface Token {
    refresh: string,
    access:  string,
}

export interface tokenVerify {
    token: Token,
    success: boolean,
    detail?: string,
    code?: string
}