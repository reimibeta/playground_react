import React from "react";
import { Auth } from "../../models/auth/auth";
import { dispatchSignout } from "../../redux/actions/auth/authAction";
import { connect } from "react-redux";
import { RequestInterface } from "../../apps/request/interfaces/request.interface";
import { useNavigate } from "react-router-dom";
import { accountRoute } from "../../routes";
import { Image } from "react-bootstrap";

interface Props {
    auth: Auth,
    dispatchSignout: (props: RequestInterface<Auth>) => void,
}

const Header: React.FC<Props> = ({
    auth,
    dispatchSignout
}) => {

    const navigate = useNavigate();
    
    return (
        <>
          <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            {/* <!-- Navbar Brand--> */}
            <a className="navbar-brand ps-3" href="/">PCR Pallet Shop</a>
            {/* <!-- Sidebar Toggle--> href="#!" */}
            <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" onClick={() => {
                document.body.classList.toggle('sb-sidenav-toggled');
                localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled').toString());
            }}>
                <i className="fas fa-bars"></i>
            </button>
            {/* <!-- Navbar Search--> */}
            {/* <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                <div className="input-group">
                    <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                    <button className="btn btn-primary" id="btnNavbarSearch" type="button"><i className="fas fa-search"></i></button>
                </div>
            </form> */}
            <div className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0"></div>
            {/* <!-- Navbar--> */}
            <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {/* fas fa-user fa-fw */}
                        <Image src={auth.user && auth.user.user_photo && auth.user.user_photo.thumbnail !== 'None' ? auth.user.user_photo.thumbnail : "https://dummyimage.com/600x400/000/fff"} style={{ width: 40, height: 40 }} roundedCircle />
                        {/* <div>
                            <Image src={auth.user && auth.user.user_photo && auth.user.user_photo.thumbnail !== 'None' ? auth.user.user_photo.thumbnail : "https://dummyimage.com/600x400/000/fff"} style={{ width: 50 }} roundedCircle />
                        </div> */}
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li>
                            <button className="dropdown-item" onClick={() => {
                                navigate(accountRoute.account.path);
                                }}>Account
                            </button>
                        </li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><button className="dropdown-item" onClick={() => {
                            dispatchSignout({
                                onFinish() {
                                    navigate("/login", { replace: true });
                                },
                            });
                        }}>Logout</button></li>
                    </ul>
                </li>
            </ul>
        </nav>
      </>
    );
}

const mapStateToProps = (state: {
    auths: { auth: Auth }
}) => {
    return {
        auth: state.auths.auth
    }
}

export default connect(mapStateToProps, { dispatchSignout })(Header);