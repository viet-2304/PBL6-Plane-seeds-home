import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import routes from '../../config/routes';
import 'bootstrap/dist/css/bootstrap.css';
import BASE_API_URL from '../../api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-regular-svg-icons';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import './Login.scss';

function Login() {
    const [email, setEmail] = useState('user05@gmail.com');
    const [password, setPassword] = useState('user05');
    const navigate = useNavigate();

    const handleUserLogin = (e) => {
        e.preventDefault();
        const body = {
            email: email,
            password: password,
        };
        axios
            .post(BASE_API_URL + 'v1/auth/login', body)
            .then((res) => {
                //    navigate(routes.home);
                let token = res.data.token;
                localStorage.setItem('token', token);
                navigate(routes.home);
            })
            .catch((err) => {
                console.log('login failed', err);
            });
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate(routes.home);
        }
    }, []);

    return (
        <section className="wrapper-content">
            <div className="d-flex justify-content-start ">
                <button className="btn-exit">
                    <FontAwesomeIcon icon={faCircleXmark}></FontAwesomeIcon>
                </button>
            </div>
            <div className="container">
                <div
                    className="row justify-content-center"
                    data-toggle="animation"
                    data-animation-start="onLoad"
                    data-animation="fade-in-up"
                >
                    <div className="col-md-12 col-lg-10">
                        <div className="wrap d-md-flex">
                            <div className="img"></div>
                            <div className="login-wrap p-4 p-md-5">
                                <div className="d-flex">
                                    <div className="w-100">
                                        <h3 className="mb-4">Sign In</h3>
                                    </div>
                                    <div className="w-100">
                                        <p className="social-media d-flex justify-content-end">
                                            <a
                                                href="/"
                                                className="social-icon d-flex align-items-center justify-content-center"
                                            >
                                                <FontAwesomeIcon icon={faGoogle} />
                                            </a>
                                            <a
                                                href="/"
                                                className="social-icon d-flex align-items-center justify-content-center"
                                            >
                                                <FontAwesomeIcon icon={faFacebook} />
                                            </a>
                                        </p>
                                    </div>
                                </div>
                                <form
                                    action=""
                                    className="signin-form"
                                    onSubmit={(e) => handleUserLogin(e)}
                                >
                                    <div className="form-group mb-3">
                                        <label className="label" htmlFor="name">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required=""
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="label" htmlFor="password">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <button
                                            type="submit"
                                            className="form-control btn btn-primary rounded submit px-3"
                                        >
                                            Sign In
                                        </button>
                                    </div>
                                    <div className="form-group d-md-flex">
                                        <div className="w-50 text-left">
                                            <label className="checkbox-wrap checkbox-primary mb-0">
                                                Remember Me
                                                {/* <input type="checkbox" checked/> */}
                                                <span className="checkmark">
                                                    <FontAwesomeIcon
                                                        icon={faCheckSquare}
                                                    ></FontAwesomeIcon>
                                                </span>
                                            </label>
                                        </div>
                                        <div className="w-50 text-md-right">
                                            <a href="/">Forgot Password ?</a>
                                        </div>
                                    </div>
                                </form>
                                <p className="text-center">
                                    Not a member?{' '}
                                    <Link to="/register">
                                        <b>Register Here</b>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default Login;
