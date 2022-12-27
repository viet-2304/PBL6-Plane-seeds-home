import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import BASE_API_URL from '../../api/api';
import './Register.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleUserSignUp = (e) => {
        axios
            .post(BASE_API_URL + 'v1/users/createUser', {
                userName: username,
                email: email,
                password: password,
            })
            .then((res) => {
                navigate('/login');
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/');
        }
    }, []);

    const formSchema = Yup.object().shape({
        password: Yup.string()
            .required('Password is mendatory')
            .min(3, 'Password must be at 3 char long'),
        confirmPwd: Yup.string()
            .required('Password is mendatory')
            .oneOf([Yup.ref('password')], 'Passwords does not match'),
    });
    const formOptions = { resolver: yupResolver(formSchema) };
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    return (
        <section className="signup-wrapper">
            <div className="d-flex justify-content-start ">
                <button className="btn-exit">
                    <FontAwesomeIcon icon={faCircleXmark}></FontAwesomeIcon>{' '}
                </button>
            </div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12 col-lg-10">
                        <div className="wrap d-md-flex">
                            <div className="img"></div>
                            <div className="login-wrap p-4 p-md-5">
                                <div className="d-flex">
                                    <div className="w-100">
                                        <h3 className="mb-4">Sign Up</h3>
                                        <p className="py-2">
                                            Create your account to get full access
                                        </p>
                                    </div>
                                </div>
                                <form
                                    action=""
                                    className="signup-form"
                                    onSubmit={handleSubmit((e) => handleUserSignUp(e))}
                                >
                                    <div className="form-group mb-3">
                                        <label className="label" htmlFor="name">
                                            Full name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Username"
                                            required
                                            value={username}
                                            onChange={(e) => setUsername(e.currentTarget.value)}
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="label" htmlFor="password">
                                            Email Address
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.currentTarget.value)}
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Password</label>
                                        <input
                                            name="password"
                                            value={password}
                                            type="password"
                                            {...register('password')}
                                            className={`form-control ${
                                                errors.password ? 'is-invalid' : ''
                                            }`}
                                            onChange={(e) => setPassword(e.currentTarget.value)}
                                        />
                                        <div className="invalid-feedback">
                                            {errors.password?.message}
                                        </div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Confirm Password</label>
                                        <input
                                            name="confirmPwd"
                                            type="password"
                                            {...register('confirmPwd')}
                                            className={`form-control ${
                                                errors.confirmPwd ? 'is-invalid' : ''
                                            }`}
                                        />
                                        <div className="invalid-feedback">
                                            {errors.confirmPwd?.message}
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <button
                                            type="submit"
                                            className="form-control btn btn-primary rounded submit px-3"
                                        >
                                            Sign Up
                                        </button>
                                    </div>
                                </form>
                                <p className="text-center">
                                    Already have an account?{' '}
                                    <Link to="/login">
                                        <b>Login Here</b>
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

export default Register;
