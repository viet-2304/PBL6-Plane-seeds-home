import {
    faBarcode,
    faListCheck,
    faLocation,
    faMoneyCheckDollar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Container, Image } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import BASE_API_URL from '../../../api/api';
import './OrderDetail.scss';
function OrderDetail() {
    const [order, setOrder] = useState(['']);
    const location = useLocation();

    const pages = location.pathname.split('/').splice(1);
    const status = 'Shipping';
    let total = 0;
    const handleConfirm = () => {
        axios
            .post(
                BASE_API_URL + 'v1/order/updateStatus',
                {
                    orderId: order?.orderResponseDto?.orderId,
                    statusId: '3',
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    },
                },
            )
            .then((res) => {
                setOrder(res.data);
                console.log('d', res.data);
            })
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        axios
            .get(BASE_API_URL + `v1/order/getOrderDetail?orderId=${pages[pages.length - 1]}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            })
            .then((res) => {
                setOrder(res.data);
                console.log('d', res.data);
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <Container>
            <div className="sub-container my-3">
                <div className="title-container">
                    <FontAwesomeIcon icon={faListCheck} />
                    <div className="title">Status</div>
                </div>
                <div className="detail-container">
                    {/* <div className={`detail ${order?.orderResponseDto?.orderStatus.toLowerCase()}`}>
                        {order?.orderResponseDto?.orderStatus}
                    </div> */}
                    <div className={`detail ${status.toLowerCase()}`}>{status}</div>
                    <div className="detail d-flex justify-content-between">
                        {/* {order?.orderResponseDto?.orderStatus === 'Pending' &&
                            'Vui lòng chờ xác nhận từ quản trị viên và chuẩn bị kiện hàng sẵn sàn nhé.'}
                        {order?.orderResponseDto?.orderStatus === 'To Shipping' &&
                            'Vui lòng bấm xác nhận khi đã chuẩn bị xong kiện hàng.'}
                        {order?.orderResponseDto?.orderStatus === 'To Receive' &&
                            'Vui lòng chờ người nhận xác nhận đã nhận hàng thành công.'}
                        {order?.orderResponseDto?.orderStatus === 'Done' &&
                            'Xin chúc mừng bạn, kiện hàng đã được giao thành công. Vui lòng chờ trong vài ngày để nhận thanh toán.'} */}
                        {status === 'Pending' &&
                            'Vui lòng chờ xác nhận từ quản trị viên và chuẩn bị kiện hàng sẵn sàn nhé.'}
                        {status === 'Shipping' &&
                            'Vui lòng bấm xác nhận khi đã chuẩn bị xong kiện hàng.'}
                        {status === 'Receive' &&
                            'Vui lòng chờ người nhận xác nhận đã nhận hàng thành công.'}
                        {status === 'Done' &&
                            'Xin chúc mừng bạn, kiện hàng đã được giao thành công. Vui lòng chờ trong vài ngày để nhận thanh toán.'}
                        {status === 'Shipping' && (
                            <Button className="fs-4 btn-danger " onClick={() => handleConfirm()}>
                                Xác nhận
                            </Button>
                        )}
                    </div>
                </div>
            </div>
            <div className="sub-container my-3">
                <div className="title-container">
                    <FontAwesomeIcon icon={faBarcode} />
                    <div className="title">Order Code</div>
                </div>
                <div className="detail-container">
                    <div className="detail">{order?.orderResponseDto?.orderId}</div>
                </div>
                <div className="title-container">
                    <FontAwesomeIcon icon={faLocation} />
                    <div className="title">Address receive</div>
                </div>
                <div className="detail-container">
                    <div className="detail">{order?.orderResponseDto?.userName}</div>
                    <div className="detail">{order?.orderResponseDto?.address}</div>
                </div>
            </div>
            <div className="sub-container my-3">
                <div className="title-container">
                    <Image
                        className="user-image me-3"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_mNmpqHOTakNgIaKR5bxJFfkUtiLdPBXPMw&usqp=CAU"
                        alt="imageuser"
                    />
                    <div className="title">{order?.orderResponseDto?.userName}</div>
                </div>
            </div>
            <div className="sub-container my-3">
                <div className="title-container">
                    <FontAwesomeIcon icon={faMoneyCheckDollar} />
                    <div className="title">Billing Information</div>
                </div>
                <div className="detail-container">
                    <div className="detail">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-1">#</div>
                                <div className="col-sm-5 text-center">Product</div>
                                <div className="col-sm-3 text-center">Quantity</div>
                                <div className="col-sm-3 text-center">Total</div>
                            </div>

                            {order?.listProduct?.map((item, index) => {
                                console.log('item', item);
                                total += item.total;
                                return (
                                    <div className="row text-black" key={index}>
                                        <div className="col-sm-1 ">{index}</div>
                                        <div className="col-sm-5 ">{item.productName}</div>
                                        <div className="col-sm-3 text-center">{item.number}</div>
                                        <div className="col-sm-3 text-center">{item.total}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="detail me-5 mt-5 d-flex justify-content-end text-black">
                    <div className="info text-end pe-5 border-end">
                        <div>Total of product</div>
                        <div>Shipping fee</div>
                        <div>Total Income</div>
                    </div>
                    <div className="detail-info text-end ps-5 ">
                        <div>{total}</div>
                        <div>30000</div>
                        <div className="text-danger">{order?.orderResponseDto?.total}</div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default OrderDetail;
