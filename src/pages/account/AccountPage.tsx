import React, { useEffect, useState } from "react";
import AccountLayout from "./AccountLayout";
import { Col, Row, Image, Form, Button, Spinner } from "react-bootstrap";
import CardComponent from "../../components/card/card-component";
import { Auth } from "../../models/auth/auth";
import { connect } from "react-redux";
import { checkAuth } from "../../apps/auth/checkAuth";
import { dispatchUpdatePassword, UpdatePasswordInterface, dispatchSignout, dispatchUploadImage, UploadAuthImageInterface } from "../../redux/actions/auth/authAction";
import { RequestInterface } from "../../apps/request/interfaces/request.interface";
import { useNavigate } from "react-router-dom";
import { UserPhoto } from "../../models/user/user";
import { convertBase64 } from "../../apps/image/image-convert-base64";
//
interface Props {
    auth: Auth,
    dispatchUpdatePassword: (id: number, props: UpdatePasswordInterface<Auth>) => void,
    dispatchSignout: (props: RequestInterface<Auth>) => void,
    dispatchUploadImage: (base64: string, props: UploadAuthImageInterface<UserPhoto>) => void,
}

const AccountPage: React.FC<Props> = ({
    auth,
    dispatchUpdatePassword,
    dispatchSignout,
    dispatchUploadImage
}) => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [errorUpdatePasswordMessage, setErrorUpdatePasswordMessage] = useState('');
    const [userPhoto, setUserPhoto] = useState('');

    useEffect(() => {
        if(checkAuth(auth) && auth.user){
            setUsername(auth.user?.name);
            setPhone(auth.user?.phone.toString());
            if(auth.user.user_photo) setUserPhoto(auth.user.user_photo?.thumbnail)
        }
    }, [auth]);

    return (
        <>
            <div>{auth.user?.name}</div>
            {checkAuth(auth) && auth.user ? <AccountLayout>
                <Row>
                    <Col xs={12} md={4} className="mb-3">
                        <CardComponent header={"គណនីយរូបភាព"}>
                            <>
                                <Image className="mb-3" src={auth.user && userPhoto !== 'None' ? userPhoto : "https://dummyimage.com/600x400/000/fff"} thumbnail fluid style={{ width: '100%' }} />
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Control type="file" onChange={ async (e: any) => {
                                        // dispatchUploadImage();
                                        // console.log(convertBase64(e.currentTarget.files[0]));
                                        const base64 = await convertBase64(e.target.files[0]);
                                        // console.log(base64)
                                        if(base64 && auth.user){
                                            dispatchUploadImage(base64 as string, {
                                                // userId: auth.user?.id,
                                                // userPhotoId: auth.user.user_photo?.id,
                                                auth: auth,
                                                onResponse(data) {
                                                    setUserPhoto(data.thumbnail);
                                                    e.target.value = null;
                                                    // console.log(data)
                                                },
                                                onError(error) {
                                                    e.target.value = null;
                                                    console.log(error)
                                                },
                                            });
                                        }
                                        // console.log(e.target.files);
                                    }} accept="image/*" />
                                </Form.Group>
                            </>
                        </CardComponent>
                    </Col>
                    <Col xs={12} md={8} className="mb-3">
                        <CardComponent header="គណនីយកែសំរួល">
                            <>
                                <Form onSubmit={(e) => {
                                    e.preventDefault();
                                    if(password !== "" && auth.user){
                                        setLoading(true);
                                        dispatchUpdatePassword(auth.user.id, {
                                            phone: phone,
                                            password: password,
                                            onResponse(data) {
                                                setLoading(false);
                                                dispatchSignout({
                                                    onFinish() {
                                                        navigate("/login", { replace: true });
                                                    },
                                                });
                                            },
                                            onError(error) {
                                                setLoading(false);
                                                setErrorUpdatePasswordMessage(error.message);
                                            },
                                        });
                                    }
                                }}>
                                    {errorUpdatePasswordMessage === '' ? <></> : <p style={{ color: 'red' }}>{errorUpdatePasswordMessage}</p>}
                                    <Form.Group className="mb-3" controlId="usernameElement">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => {}} disabled />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="phoneElement">
                                        <Form.Label>Phone number</Form.Label>
                                        <Form.Control type="text" placeholder="Enter phone" value={auth.user.phone} disabled onChange={(e) => {}} />
                                    </Form.Group>
                                
                                    <Form.Group className="mb-3" controlId="passwordElement">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </Form.Group>
                                    {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="Check me out" />
                                    </Form.Group> */}
                                    {!loading ? <div className="d-grid">
                                        <Button variant="primary" type="submit">
                                            Update Password
                                        </Button>
                                    </div>
                                    : <div className="d-grid">
                                        <Button variant="primary" disabled>
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
                            </>
                        </CardComponent>
                    </Col>
                </Row>
            </AccountLayout> : <></>}
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

export default connect(mapStateToProps, { dispatchUpdatePassword, dispatchSignout, dispatchUploadImage })(AccountPage);