import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import logo from '../../../assets/images/logo-brand.png';
import './SellerHeader.scss';
import { Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import BASE_API_URL from '../../../api/api';

function SellerHeader() {
    const navigate = useNavigate();
    const [shop, setShop] = useState({});
    console.log(localStorage.getItem('userId'), localStorage.getItem('token'));
    useEffect(() => {
        // if (localStorage.getItem('shopId')) {
        axios
            .get(BASE_API_URL + `v1/shop/getShopByUser?userId=${localStorage.getItem('userId')}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            })
            .then((res) => {
                setShop(res.data);
                console.log('shop', res.data);
                localStorage.setItem('shopId', res.data.shopId);
            })
            .catch(() => navigate('/seller/register'));

        // axios
        //     .get(BASE_API_URL + 'v1/orderStatus/getAll', {
        //         headers: {
        //             'Content-Type': 'application/json',
        //             Authorization: 'Bearer ' + localStorage.getItem('token'),
        //         },
        //     })
        //     .then((res) => {
        //         console.log('status', res.data);
        //     })
        //     .catch((err) => console.log('err', err));

        // } else navigate('/seller/register');
    }, []);
    return (
        <Container fluid className="seller-navbar">
            <div className="wrapper px-5">
                <Link to="/">
                    <img src={logo} alt="logo" width={320} />
                </Link>
                <div className="search">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="form-control"
                        id="search"
                    />
                    <FontAwesomeIcon icon={faSearch} className="icon px-2" />
                </div>
                <div className="items">
                    <div className="item">
                        <img
                            // src={shop?.image}
                            src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                            alt=""
                            className="avatar"
                        />
                    </div>
                    <div className="name-shop">{shop?.shopName}</div>
                </div>
            </div>
        </Container>
    );
}

export default SellerHeader;
