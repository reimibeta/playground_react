import React, { useEffect } from 'react'
import { connect } from "react-redux"
import {Navigate, useLocation} from "react-router-dom"
import { Auth } from '../models/auth/auth'
import { checkAuth } from '../apps/auth/checkAuth'

interface Props {
    auth: Auth,
    children: JSX.Element
}

const PageRouteProtected = ({
    auth,
    children
} : Props) => {
    
    let location = useLocation();
    
    useEffect(() => {}, [auth]);

    if(!checkAuth(auth)) {
        return <Navigate to="/login" state={{ from: location}} replace />
    }
 return children

};

const mapStateToProps = (
    state: {
        auths: {
            auth: Auth
        }
    }
) => {
    return {
        auth: state.auths.auth
    }
}

export default connect(mapStateToProps, {})(PageRouteProtected);