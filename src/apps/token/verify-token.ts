import { tokenVerify } from "../../models/auth/auth";
import { tokenVerifyApi } from "../../urls/authApi";
import { RequestInterface } from "../request/interfaces/request.interface";
import { request } from "../request/request"

export const verifyToken = (accessToken: string, props: RequestInterface<tokenVerify>) => {
    request.post(
        tokenVerifyApi(),
        {
            token: accessToken
        },
        props
    );
}