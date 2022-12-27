import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import BASE_API_URL from '../../api/api';
import { Navigate } from 'react-router-dom';
import './Checkout.scss';
function Checkout() {
    const [cartItems, setCartItems] = useState();
    const [address, setAddress] = useState();
    const [paymentMethod, setPaymentMethod] = useState();
    const API = axios.create({
        baseURL: BASE_API_URL,
    });
    // let subTotal = 0;
    let sum = 0;
    let listCartId = [];
    let count = 0;
    console.log('sum', sum);
    // console.log('cartID: ', listCartId);
    const changePaymentMethod = (value) => {
        setPaymentMethod(value);
        console.log(value);
    };
    const handlePayment = (total) => {
        if (paymentMethod == '1') {
            API.post(
                'v1/payment/pay',
                {
                    price: total,
                    currency: '',
                    method: 'paypal',
                    intent: '',
                    description: 'test post man',
                    order: {
                        listCartId: listCartId,
                        total: total,
                        paymentMethodId: paymentMethod,
                        address: address,
                    },
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    },
                },
            )
                .then((res) => {
                    // window.location.href = res.data;
                    // return <Navigate to={res.data} />;
                    window.location.href = res.data;
                    console.log(res.data);
                })
                .catch((err) => console.log('err', err));
        } else {
            API.post(
                'v1/order/createOrder',
                {
                    listCartId: listCartId,
                    total: total,
                    paymentMethodId: paymentMethod,
                    address: address,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    },
                },
            )
                .then((res) => {
                    window.location.pathname = '/api/v1/paymentSuccess';
                    console.log(res.data);
                })
                .catch((err) => console.log('err', err));
        }
    };
    useEffect(() => {
        API.get(`v1/cart/getCartDetail?userId=${localStorage.getItem('userId')}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        })
            .then((res) => {
                setCartItems(res.data.listProduct);
                console.log(res.data.listProduct);
            })
            .catch((err) => console.log('err', err));
    }, []);
    return (
        <>
            <Container className="Checkout-content">
                <main>
                    <div className="py-5 row g-5">
                        <div className="col-md-5 col-lg-4 order-md-last">
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-success fs-3">Your cart</span>
                                <span className="badge bg-success rounded-pill">3</span>
                            </h4>
                            {/* Cart detail */}
                            {cartItems?.map((item) => {
                                console.log('item ', item);
                                let subTotalByShop = 0;
                                let subFee = 30000;
                                // let subTotal = 0;

                                return (
                                    <>
                                        <div className="your-cart py-2" key={item?.shopId}>
                                            {item?.listProductAndNumberDto.map((product) => {
                                                listCartId.push(product.cartId);

                                                let subTotal =
                                                    product?.price *
                                                    parseInt(product?.numberOfProductInCart);
                                                subTotalByShop += subTotal;
                                                subFee += subTotal;
                                                // console.log('res: ', subFee);
                                                // sum = sum + subFee;
                                                // console.log('a', sum, subFee, subTotalByShop);
                                                // console.log(subFee);
                                                count += 1;
                                                return (
                                                    <>
                                                        <div className="product-cart d-flex justify-content-between">
                                                            <img
                                                                src="https://landing.engotheme.com/html/plant/demo/images/product/pro_07.jpg"
                                                                width={60}
                                                                height={60}
                                                                alt=""
                                                            ></img>
                                                            <div className="first">
                                                                <h4 className="product-name">
                                                                    {product?.productName}
                                                                </h4>
                                                                <span className="quantity">
                                                                    x
                                                                    {product?.numberOfProductInCart}{' '}
                                                                </span>
                                                            </div>
                                                            <div className="second">
                                                                <span>
                                                                    {product?.numberOfProductInCart *
                                                                        product?.price}{' '}
                                                                    VND
                                                                </span>{' '}
                                                                <br></br>
                                                                <span className="text-dark fw-bold">
                                                                    {item?.shopName}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        {/* {(sum = sum + subFee)} */}
                                                    </>
                                                );
                                            })}
                                            <div hidden>{(sum += subFee)}</div>
                                            <div className="py-5">
                                                <h4 className="d-flex justify-content-between align-items-center mb-3">
                                                    <span className="text-success fs-3">
                                                        Cart Total
                                                    </span>
                                                    <span className="badge bg-success rounded-pill">
                                                        3
                                                    </span>
                                                </h4>
                                                <ul className="list-group mb-3">
                                                    <li className="list-group-item d-flex justify-content-between bg-light">
                                                        <div className="text-success">
                                                            <h6 className="my-0 fs-4">Price</h6>
                                                            <small>Price total</small>
                                                        </div>
                                                        <span className="text-success">
                                                            {subTotalByShop}
                                                        </span>
                                                    </li>

                                                    <li className="list-group-item d-flex justify-content-between bg-light">
                                                        <div className="text-success">
                                                            <h6 className="my-0 fs-4">Shipping</h6>
                                                            <small>shipping fee</small>
                                                        </div>
                                                        <span className="text-success">30000</span>
                                                    </li>

                                                    <li className="list-group-item d-flex justify-content-between">
                                                        <span>Total (VND)</span>
                                                        <b>{subFee}</b>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </>
                                );
                            })}
                            <div className="bg-secondary text-white p-2">
                                Số tiền mà bạn phải thanh toán là: {sum}
                            </div>
                        </div>
                        <div className="col-md-7 col-lg-8">
                            <h2 className="mb-3">Billing address</h2>
                            {/* <form className="needs-validation" validate> */}
                            <div className="row g-3">
                                <div className="col-sm-6">
                                    <label for="firstName" className="form-label">
                                        First name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="firstName"
                                        // required
                                    />
                                    <div className="invalid-feedback">
                                        Valid first name is required.
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <label for="lastName" className="form-label">
                                        Last name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="lastName"
                                        // required
                                    />
                                    <div className="invalid-feedback">
                                        Valid last name is required.
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label for="username" className="form-label">
                                        Username
                                    </label>
                                    <div className="input-group has-validation">
                                        <span className="input-group-text">@</span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="username"
                                            placeholder="Username"
                                            // required
                                        />
                                        <div className="invalid-feedback">
                                            Your username is required.
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <label for="email" className="form-label">
                                        Email
                                        <span className="text-muted">(Optional)</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="email"
                                        placeholder="you@example.com"
                                    />
                                    <div className="invalid-feedback">
                                        Please enter a valid email address for shipping updates.
                                    </div>
                                </div>

                                <div className="col-12">
                                    <label for="address" className="form-label">
                                        Address{' '}
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="address"
                                        placeholder="1234 Main St"
                                        onChange={(e) => setAddress(e.target.value)}
                                        value={address}
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        Please enter your shipping address.
                                    </div>
                                </div>

                                <div className="col-12">
                                    <label for="address2" className="form-label">
                                        Address 2<span className="text-muted">(Optional)</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="address2"
                                        placeholder="Apartment or suite"
                                    />
                                </div>

                                <div className="col-md-5">
                                    <label for="country" className="form-label">
                                        Country
                                    </label>
                                    <select className="form-select" id="select-country">
                                        <option value="">Choose...</option>
                                        <option>United States</option>
                                        <option>Japan</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Please select a valid country.
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <label for="state" className="form-label">
                                        State
                                    </label>
                                    <select className="form-select" id="select-state">
                                        <option value="">Choose...</option>
                                        <option>California</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Please provide a valid state.
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <label for="zip" className="form-label">
                                        Zip
                                    </label>
                                    <input type="text" className="form-control" id="zip" />
                                    <div className="invalid-feedback">Zip code required.</div>
                                </div>
                            </div>
                            <hr className="my-4" />
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="same-address"
                                />
                                <label for="same-address" className="form-check-label">
                                    Shipping address is the same as my billing address
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="save-info"
                                />
                                <label for="save-info" className="form-check-label">
                                    Save this information for next time
                                </label>
                            </div>
                            <hr className="my-4" />
                            <h4 className="mb-3">Payment</h4>
                            <div className="my-3">
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        className="form-check-input"
                                        id="paypal"
                                        value="1"
                                        onClick={() => changePaymentMethod(1)}
                                    />

                                    <img
                                        className="paypal-image"
                                        src="https://www.logo.wine/a/logo/PayPal/PayPal-Logo.wine.svg"
                                        width={100}
                                        alt=""
                                    ></img>
                                </div>
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        class="form-check-input"
                                        id="cash"
                                        value="2"
                                        onClick={() => changePaymentMethod(2)}
                                    />

                                    <img
                                        className="cash-image me-3"
                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Square_Cash_app_logo.svg/768px-Square_Cash_app_logo.svg.png"
                                        width={30}
                                        alt=""
                                    ></img>
                                    <label className="fw-bold">Cash</label>
                                </div>
                            </div>

                            <hr className="my-4" />
                            <button
                                className="w-100 btn btn-primary btn-lg fs-4"
                                type="submit"
                                onClick={() => handlePayment(sum, paymentMethod)}
                            >
                                Continue to checkout
                            </button>
                            {/* </form> */}
                        </div>
                    </div>
                </main>
            </Container>
        </>
    );
}
export default Checkout;
