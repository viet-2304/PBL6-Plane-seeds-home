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
    });

    return (
        <Container className="m-5 home px-4 px-md-0">
            <div className="widgets-admin ">
                <StatCard type="customer" bg="bg-success" link="/admin/customers" />
                <StatCard type="product" bg="bg-warning" link="/admin/products" />
                <StatCard type="order" bg="bg-primary" link="/admin/orders" />
                <StatCard type="store" bg="bg-secondary" link="/admin/stores" />
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
