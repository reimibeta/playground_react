import React from 'react'
import {Navigate, useLocation} from "react-router-dom"

interface Props {
    redirect: string
}

const HomeRedirectRoute = ({ redirect } : Props) => {
    
    let location = useLocation();

    return <Navigate to={redirect} state={{ from: location }} replace />

};

export default HomeRedirectRoute;