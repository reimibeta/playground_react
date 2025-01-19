import React, { useState, useEffect } from "react";
import { Button, Container, Form, Modal, Spinner } from "react-bootstrap";
import { dispatchSignin } from "../../redux/actions/auth/authAction";
import { RequestInterface } from "../../apps/request/interfaces/request.interface";
import { Auth } from "../../models/auth/auth";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

interface Props {
    dispatchSignin: (phone: string, password: string, props: RequestInterface<Auth>) => void,
    auth: Auth
}

const LoginPage: React.FC<Props> = ({
    dispatchSignin,
    auth
}) => {

    const [errorText, setErrorText] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // useEffect(() => {
    //     let isMounted = true;               // note mutable flag
    //     someAsyncOperation().then(data => {
    //       if (isMounted) setState(data);    // add conditional check
    //     })
    //     return () => { isMounted = false }; // cleanup toggles value, if unmounted
    // }, []);   

    return (
        <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-5">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Login</h3></div>
                                    <div className="card-body">
                                        <Form onSubmit={(e) => {
                                            e.preventDefault();
                                            setLoading(true);
                                            setErrorText('');
                                            dispatchSignin(phone, password, {
                                                onError(error) {
                                                    setLoading(false);
                                                    setErrorText(error.message);
                                                },
                                                onFinish() {
                                                    setLoading(false);
                                                    navigate('/', {replace: true});
                                                },
                                            });
                                        }}>
                                            {errorText === '' ? <></> : <p style={{ color: 'red' }}>{errorText}</p>}
                                            <Form.Group className="mb-3" controlId="phoneElement">
                                                <Form.Label>Phone number</Form.Label>
                                                <Form.Control size="lg" type="text" placeholder="Enter phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                            </Form.Group>
                                        
                                            <Form.Group className="mb-3" controlId="passwordElement">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control size="lg" type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                            </Form.Group>
                                            {!loading ? <div className="d-grid">
                                                <Button variant="primary" type="submit" size="lg">
                                                    Submit
                                                </Button>
                                            </div>
                                            : <div className="d-grid">
                                                <Button variant="primary" disabled size="lg">
                                                    <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                    />
                                                    <span className="visually-hidden">Loading...</span> Loading...
                                                </Button>
                                            </div>}
                                        </Form>
                                    </div>
                                    {/* <div className="card-footer text-center py-3">
                                        <div className="small"><a href="register.html">Need an account? Sign up!</a></div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            {/* <div id="layoutAuthentication_footer">
                <footer className="py-4 bg-light mt-auto">
                    <div className="container-fluid px-4">
                        <div className="d-flex align-items-center justify-content-between small">
                            <div className="text-muted">Copyright &copy; Your Website 2023</div>
                            <div>
                                <a href="#">Privacy Policy</a>
                                &middot;
                                <a href="#">Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div> */}
        </div>
    );
}

const mapStateToProps = (
    state: { 
        auths: { 
            auth: Auth,
        }
    }
) => {
    // console.log(state.orders.orderSearchList)
    return {
        auth: state.auths.auth
    }
}

export default connect(mapStateToProps, { dispatchSignin })(LoginPage);