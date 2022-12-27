import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react';
import BASE_API_URL from '../../api/api.js';
import Button from '../Button/Button.js';
import './ProductCard.scss';

function ProductCard({ id, to, title, price, image }) {
    const handleAddToCart = () => {
        axios
            .post(
                BASE_API_URL + 'v1/cart/addToCart',
                {
                    userId: localStorage.getItem('userId'),
                    number: 1,
                    productId: id,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    },
                },
            )
            .then((res) => {
                console.log('OK');
            })
            .catch((err) => {
                alert(err.response.data);
            });
    };
    return (
        <div
            className="card-container text-left d-flex align-items-center justify-content-center"
            key={id}
        >
            <div className="card text-left d-flex ">
                <div className="card-img-top">
                    <img src={image} alt="imageproduct" />
                    <div className="product-action d-flex align-items-center justify-content-center">
                        <Button className="action-btn" onClick={() => handleAddToCart()}>
                            <FontAwesomeIcon icon={faCartShopping} />
                        </Button>
                        <Button to={to} className="action-btn">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </Button>
                        <Button className="action-btn">
                            <FontAwesomeIcon icon={faHeart} />
                        </Button>
                    </div>
                </div>
                <div className="card-body text-left">
                    <h4 className="card-title">{title}</h4>
                    <h5 className="card-text text-danger">{price} VND</h5>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
