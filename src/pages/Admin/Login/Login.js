import { Button, Container, Form, FloatingLabel } from 'react-bootstrap';
import './Login.scss';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import routes from '../../../config/routes';
import 'bootstrap/dist/css/bootstrap.css';
import BASE_API_URL from '../../../api/api';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleAdminLogin = (e) => {
        e.preventDefault();
        const body = {
            email: email,
            password: password,
        };
        axios
            .post(BASE_API_URL + 'v1/auth/login', body)
            .then((res) => {
                let token = res.data.token;
                console.log(res.data);
                // localStorage.setItem('token', token);
                if (res.data.userDto.roleId == 'admin') {
                    localStorage.setItem('token', token);
                    navigate(routes.dashboardAdmin);
                    alert('Chào mừng bạn đến với trang quản trị của Admin !');
                } else {
                    alert('Bạn không được quyền truy cập vào trang này !');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate(routes.dashboardAdmin);
        }
    }, []);
    return (
        <Container
            fluid
            className="login-container d-flex justify-content-center align-items-center py-5"
        >
            {/* {isSuccess ? (
                <SuccessDiv message="Welcome to Jack's Garden Admin Panel. Redirecting you to dashboard now." />
            ) : ( */}
            <Form
                className="login-form bg-white shadow rounded-3 py-5 px-3 px-md-4"
                onSubmit={(e) => handleAdminLogin(e)}
            >
                <h1 className="text-center text-success fw-bold pt-3">LOG IN</h1>
                <h6 className="text-center text-secondary pb-3">@PLANT SEEDS HOME ADMIN PANEL</h6>
                <FloatingLabel className="mb-3" label="Email">
                    <Form.Control
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <p className="text-danger">
                        {/* {errors.email && "Please enter a valid email"} */}
                    </p>
                </FloatingLabel>
                <FloatingLabel className="mb-3" label="Password">
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <p className="text-danger">
                        {/* {errors.password && errors.password.message} */}
                    </p>
                </FloatingLabel>
                <div className="d-grid gap-2">
                    <Button variant="success" type="submit" className="submit-btn">
                        {/* {isFetching ? <FetchingSpinner /> : "SUBMIT"} */}
                        SUBMIT
                    </Button>
                </div>
            </Form>
            {/* )} */}
        </Container>
    );
};
export default Login;
