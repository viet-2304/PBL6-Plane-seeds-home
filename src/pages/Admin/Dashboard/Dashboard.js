import { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
// import { Widget } from '../../../components/Seller/Widget/Widget';
import Chart from '../../../components/Admin/Chart/Chart';
import Featured from '../../../components/Admin/Featured/Featured';

import StatCard from '../../../components/Admin/StatCard/StatCard';
import './Dashboard.scss';
import BASE_API_URL from '../../../api/api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const [numberCustomer, setNumberCustomer] = useState(0);
    const [numberProduct, setNumberProduct] = useState(0);
    const [numberOrder, setNumberOrder] = useState(0);
    const [numberShop, setNumberShop] = useState(0);

    const [currentUser, setCurrentUser] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();
    const API = axios.create({
        baseURL: BASE_API_URL,
    });
    useEffect(() => {
        API.get('v1/users/getCurrentUser', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }).then((res) => {
            if (res.data.roleId !== 'admin') {
                alert('Tài khoản của bạn không được quyền truy cập vào trang này');
                localStorage.clear();
                sessionStorage.clear();
                setCurrentUser(localStorage.getItem('token'));
                navigate('/admin/login');
            } else {
                // navigate('/admin/dashboard');
            }
        });

        API.get('v1/users/getAll', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }).then((res) => {
            setNumberCustomer(res.data.length);
        });

        API.get('v1/product/getAllProduct')
            .then((res) => {
                setNumberProduct(res.data.length);
            })
            .catch((err) => console.log(err));

        API.get('v1/order/getAllOrder', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((res) => {
                setNumberOrder(res.data.length);
            })
            .catch((err) => console.log('111', err));

        API.get('v1/shop/getAllShop', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((res) => {
                setNumberShop(res.data.length);
            })
            .catch((err) => console.log('111', err));
    }, []);

    return (
        <Container className="m-5 home px-4 px-md-0">
            <div className="widgets-admin ">
                <StatCard
                    type="customer"
                    bg="bg-success"
                    link="/admin/customers"
                    amount={numberCustomer}
                />
                <StatCard
                    type="product"
                    bg="bg-warning"
                    link="/admin/products"
                    amount={numberProduct}
                />
                <StatCard type="order" bg="bg-primary" link="/admin/orders" amount={numberOrder} />
                <StatCard type="store" bg="bg-secondary" link="/admin/stores" amount={numberShop} />
                <StatCard type="delivery" bg="bg-light" link="/admin/delivery" />
            </div>
            {/* <Row className="bottom-container"> */}
            <div className="charts">
                <Featured />
                <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
            </div>
            {/* </Row> */}
        </Container>
    );
};

export default Dashboard;
