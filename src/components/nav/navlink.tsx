import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavLink = (props: { title: string, route: string, locationPath: string }) => {
    if(props.route === props.locationPath){
        return <Nav.Link as={Link} to={props.route} active>{props.title}</Nav.Link>
    } 
    return <Nav.Link as={Link} to={props.route}>{props.title}</Nav.Link>
}

export default NavLink;