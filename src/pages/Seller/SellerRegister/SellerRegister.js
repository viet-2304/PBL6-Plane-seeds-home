import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SellerRegister.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import BASE_API_URL from '../../../api/api';
function SellerRegister() {
    console.log('re-render');
    const [shop, setShop] = useState({
        shopName: '',
        address: '',
        phoneNumber: '',
        email: '',
        userId: localStorage.getItem('userId'),
        imageUrl: '',
    });
    const navigate = useNavigate();

    const handleSellerRegister = (e) => {
        e.preventDefault();
        axios
            .post(BASE_API_URL + 'v1/shop/addNewShop', shop, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            })
            .then((res) => {
                // localStorage.setItem('shopId', res.data.shopId);
                navigate('/seller/dashboard');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <section className="signup-wrapper">
            <div className="d-flex justify-content-start ">
                <button className="btn-exit">
                    <FontAwesomeIcon icon={faCircleXmark}></FontAwesomeIcon>
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
                                        <h3 className="mb-4">Register</h3>
                                        <p className="py-2">
                                            Register your shop to get full access
                                        </p>
                                    </div>
                                </div>
                                <form
                                    action=""
                                    className="signup-form"
                                    onSubmit={(e) => handleSellerRegister(e)}
                                >
                                    <div className="form-group mb-3">
                                        <label className="label" htmlFor="shopname">
                                            Shop Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Shop Name"
                                            required
                                            value={shop?.shopName}
                                            onChange={(e) =>
                                                setShop({
                                                    ...shop,
                                                    shopName: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="label" htmlFor="email">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Email"
                                            required
                                            value={shop?.email}
                                            onChange={(e) =>
                                                setShop({
                                                    ...shop,
                                                    email: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="label" htmlFor="phonenumber">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            placeholder="Phone Number"
                                            value={shop?.phoneNumber}
                                            onChange={(e) =>
                                                setShop({
                                                    ...shop,
                                                    phoneNumber: e.target.value,
                                                })
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="label" htmlFor="address">
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Address"
                                            value={shop?.address}
                                            onChange={(e) =>
                                                setShop({
                                                    ...shop,
                                                    address: e.target.value,
                                                })
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <button
                                            type="submit"
                                            className="form-control btn btn-primary submit rounded  px-3"
                                        >
                                            Register
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SellerRegister;
