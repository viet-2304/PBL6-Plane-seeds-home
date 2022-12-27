import { Container } from 'react-bootstrap';
import Widget from '../../../components/Seller/Widget/Widget';
import BarChart from '../../../components/Seller/BarChart/BarChart';
import './Dashboard.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_API_URL from '../../../api/api';
function Dashboard() {
    const [numberCustomer, setNumberCustomer] = useState([]);
    const [numberProduct, setNumberProduct] = useState(0);
    const [numberOrder, setNumberOrder] = useState(0);
    // All income
    const [earning, setEarning] = useState(0);
    // Income only from orders has been implemented
    const [balance, setBalance] = useState(0);
    let customer = [];
    let total = 0;
    let _balance = 0;
    useEffect(() => {
        // Get number of order and number of customer
        axios
            .get(
                BASE_API_URL + `v1/order/getOrderByShopId?shopId=${localStorage.getItem('shopId')}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                },
            )
            .then((res) => {
                setNumberOrder(res.data.length);
                // Get number of customer
                res.data.forEach((c) => {
                    total += c.orderResponseDto.total;
                    if (!customer.includes(c.orderResponseDto.userId)) {
                        customer.push(c.orderResponseDto.userId);
                    }
                    if (c.orderResponseDto.orderStatus === 'Done') {
                        _balance += c.orderResponseDto.total;
                    }
                });
                setNumberCustomer(customer.length);
                // Set earning
                console.log('tot', total);
                setEarning(total);
                // Set balance
                setBalance(_balance);
            })
            .catch((err) => console.log('111', err));
        // Get number of product
        axios
            .get(BASE_API_URL + 'v1/product/getAllProduct')
            .then((res) => {
                setNumberProduct(res.data.length);
            })
            .catch((err) => console.log(err));
    }, []);
    console.log('s', numberCustomer);
    return (
        <Container className="dashboard">
            <div className="widgets ">
                <Widget type="customer" amount={numberCustomer} />
                <Widget type="product" amount={numberProduct} />
                <Widget type="order" amount={numberOrder} />
                <Widget type="earning" amount={earning} />
                <Widget type="balance" amount={balance} />
            </div>
            <div className="charts">
                <BarChart title="Last 6 Months (Revenue)" data={''} />
            </div>
        </Container>
    );
}

export default Dashboard;
