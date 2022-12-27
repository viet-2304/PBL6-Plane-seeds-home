import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShop, faTruckFast, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button, Card, Image } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import BASE_API_URL from '../../api/api';
import axios from 'axios';

import './PurchaseItem.scss';

function PurchaseItem({ type }) {
    const [listOrder, setListOrder] = useState();
    const API = axios.create({
        baseURL: BASE_API_URL,
    });

    useEffect(() => {
        API.get(`v1/order/getOrderByUserId?userId=${localStorage.getItem('userId')}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        })
            .then((res) => {
                if (type === 'all') {
                    setListOrder(res.data);
                    console.log('list order', res.data, type);
                } else {
                    let list = [];
                    res.data.filter((item) => {
                        return item.orderResponseDto.orderStatus === type;
                    });
                    setListOrder(list);
                    console.log('list order', list, type);
                }
            })
            .catch((err) => console.log('err', err));
    }, []);
    let count = 0;
    return listOrder?.map((item) => {
        count += 1;
        return (
            <Card className="card-purchase mb-3" key={item?.orderResponseDto.orderId}>
                <Card.Body>
                    <div className="card-header d-flex justify-content-between">
                        <div className="fw-bold text-black d-block align-items-center">
                            <h2>Order: {count}</h2>
                            <h4>Created date: {item?.orderResponseDto.createDate.split('T')[0]}</h4>
                            <h4>Order Status: {item?.orderResponseDto.orderStatus}</h4>
                            <h4>Payment method: {item?.orderResponseDto.paymentMethod}</h4>
                            <h4>Address Shipping: {item?.orderResponseDto.address}</h4>
                            <h3 className="fw-bold">Total: {item?.orderResponseDto.total} VND</h3>
                        </div>
                        <div className={`${item?.orderResponseDto.orderStatus.toLowerCase()}`}>
                            {item?.orderResponseDto.orderStatus}
                        </div>
                    </div>
                    {item?.listProduct?.map((product) => {
                        return (
                            <div className="card-content border-bottom border-secondary d-flex py-3">
                                <div className="col-md-2">
                                    <Image
                                        className="item-img"
                                        src={
                                            product?.imagesUrl
                                                ? product?.imagesUrl
                                                : 'https://firebasestorage.googleapis.com/v0/b/plant-seeds-home.appspot.com/o/images%2Fdefaultproduct.png?alt=media&token=0491d08d-0f8b-401d-a76e-1bacaa5a2705'
                                        }
                                        alt="anh"
                                        width={110}
                                        height={110}
                                    />
                                </div>
                                <div className="col-md-8">
                                    <div className="row">
                                        <div className=" text-black h2">{product?.productName}</div>
                                        <div> {product?.shopName}</div>
                                        <div className="text-black">x{product?.number}</div>
                                    </div>
                                </div>
                                <div className="d-flex fw-bold col-md-2 align-items-center justify-content-end text-danger">
                                    {product?.total}
                                </div>
                            </div>
                        );
                    })}

                    <div className="card-footer d-flex justify-content-between py-4 px-4">
                        <div className="btn-delete">
                            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                        </div>

                        <div className="text-white display-6 ">
                            Total: {item?.orderResponseDto.total} VND
                        </div>
                    </div>
                </Card.Body>
            </Card>
        );
    });
}

export default PurchaseItem;
