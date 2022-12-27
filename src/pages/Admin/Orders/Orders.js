import 'jquery/dist/jquery.min.js';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';

import { useEffect } from 'react';
import './Orders.scss';
import { useState } from 'react';
import axios from 'axios';
import BASE_API_URL from '../../../api/api';
import DataTable from 'react-data-table-component';
import { SortDown } from 'react-bootstrap-icons';
import Button from '../../../components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import OrderDetail from '../../../components/Admin/OrderDetail/OrderDetail';

function Order({ prop }) {
    const [orderData, setOrderData] = useState();

    const API = axios.create({
        baseURL: BASE_API_URL,
    });
    const [order, setOrder] = useState([]);

    useEffect(() => {
        API.get('v1/order/getAllOrder', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((res) => {
                setOrderData(res.data);
                console.log('w', res.data);
            })
            .catch((err) => console.log('111', err));
    }, []);
    console.log('order', order);

    const [reload, setReload] = useState(false);

    useEffect(() => {
        orderData?.map((item) => {
            setOrder((pre) => [
                ...pre,
                {
                    id: item.orderResponseDto.orderId,
                    shopName: item.listProduct[0]?.shopName,
                    customer: item.orderResponseDto.userName,
                    imageURL: '',
                    quantity: item.listProduct.length,
                    total: item.orderResponseDto.total,
                    payment: item.orderResponseDto.paymentMethod,
                    status: item.orderResponseDto.orderStatus,
                    action: item.orderResponseDto.orderStatus,
                },
            ]);
        });
        setReload(!reload);
    }, [orderData]);

    const [tableRowsData, setTableRowsData] = useState();

    useEffect(() => {
        setTableRowsData(order);
    }, [reload]);
    console.log('table', tableRowsData);

    const onChange = (e) => {
        var searchData = order.filter((item) => {
            if (item.customer.toString().toLowerCase().includes(e.target.value.toLowerCase())) {
                return item;
            }
        });
        setTableRowsData(searchData);
    };

    const headerResponsive = [
        {
            name: 'ID',
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: 'Shop Name',
            selector: (row) => (
                <div className="cellWrapper">
                    <span className="pe-3">{row.shopName}</span>
                </div>
            ),
            sortable: true,
        },
        {
            name: 'Customer',
            selector: (row) => (
                <div className="cellWrapper">
                    <span className="pe-3">{row.customer}</span>
                    {/* <img
                        src={
                            row.imageURL ||
                            'https://cf.shopee.vn/file/59ced2b1371dd71a64a52af77b69d3d1'
                        }
                        alt=""
                        className="image"
                    /> */}
                </div>
            ),
            sortable: true,
        },
        {
            name: 'Quantity',
            selector: (row) => row.quantity,
            sortable: true,
        },
        {
            name: 'Total',
            selector: (row) => row.total,
            sortable: true,
        },
        {
            name: 'Payment Method',
            selector: (row) => (
                <div className={row.payment === 'Thanh toán bằng tiền mặt' ? 'cash' : 'paypal'}>
                    {row.payment === 'Thanh toán bằng tiền mặt' ? 'Cash' : 'Paypal'}
                </div>
            ),
            sortable: true,
        },
        {
            name: 'Status',
            selector: (row) => <div className={row.status.toLowerCase()}>{row.status}</div>,
            sortable: true,
        },
        {
            name: 'Action',
            selector: (row) => (
                <div className="action-row">
                    <Button className="icon-view" to={`/admin/orders/${row?.id}`}>
                        <FontAwesomeIcon icon={faEye} />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div>
            {prop === 'all' && (
                <div className="mx-5">
                    <div className="d-flex justify-content-end">
                        <input
                            className="search"
                            placeholder="Search..."
                            type="text"
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                    <DataTable
                        title="Orders"
                        columns={headerResponsive}
                        data={tableRowsData}
                        defaultSortField="id"
                        sortIcon={<SortDown />}
                        pagination
                        selectableRows
                    />
                </div>
            )}

            {prop === 'detail' && (
                <div className="mx-5">
                    <OrderDetail />
                </div>
            )}
        </div>
    );
}

export default Order;
