import { useEffect, useState } from 'react';
import { Button, FormControl, Form, Table, Container } from 'react-bootstrap';
// import { getAllUsers, deleteUser, getUserBySearch } from '../../api/api';
// import CustomerRow from './CustomerRow';
// import Pagination from '../../../components/Pagination/Pagination';
// import { useForm } from 'react-hook-form';
import { Trash } from 'react-bootstrap-icons';

import axios from 'axios';
import BASE_API_URL from '../../../api/api';
import './ShopAdmin.scss';
import Pagi from '../../../components/Admin/Pagi/Pagi';

function ShopAdmin() {
    const [shop, setShop] = useState();
    const [isFetching, setIsFetching] = useState(false);
    const [pages, setPages] = useState();
    const [currentPage, setCurrentPage] = useState(1);

    const API = axios.create({
        baseURL: BASE_API_URL + 'v1',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    const getAllShop = () => API.get('/shop/getAllShop');
    useEffect(() => {
        const getShopData = async () => {
            setIsFetching(true);
            try {
                const result = await getAllShop();
                console.log(result.data);
                setShop(result.data);
                setIsFetching(false);
                setPages(Math.ceil(result.data.length / 10));
            } catch (error) {
                setIsFetching(false);
                console.log(error);
            }
        };
        getShopData();
    }, []);

    return (
        <Container className="customer mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0 display-3 text-success fw-bold">Customers</h4>
                <Button
                    variant="dark fs-4"
                    href="/customers/create"
                    size="md"
                    className="rounded-pill px-3"
                >
                    + ADD
                </Button>
            </div>
            <div className="mb-3">
                <Form className="input-group">
                    <FormControl
                        id="search-customers"
                        placeholder="Search customers by email address or name"
                    />
                    <Button type="submit" variant="outline-primary" className="rounded-end px-4">
                        Search
                    </Button>
                </Form>
            </div>
            <div className="position-relative">
                <Table className="shadow-sm mb-2 bg-body rounded text-secondary">
                    <thead className="bg-success small bg-opacity-75 text-light">
                        <tr className="text-center fs-3">
                            <th>IMAGE</th>
                            {/* <th>SHOPID</th> */}
                            <th>SHOPNAME</th>
                            <th>ADDRESS</th>
                            <th>PHONE</th>
                            <th>EMAIL</th>
                            <th>USERID</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shop?.slice((currentPage - 1) * 10, currentPage * 10).map((item) => (
                            <tr className="text-center align-middle fs-4">
                                <td>
                                    <img src={item.imageUrl} alt="" width={50} />
                                </td>
                                {/* <td>{item.shopId}</td> */}
                                <td>{item.shopName}</td>
                                <td>{item.address}</td>
                                <td>{item.phoneNumber}</td>
                                <td id="emailBar">{item.email}</td>
                                <td>{item.userId}</td>

                                <td>
                                    <Button
                                        variant="link fs-4"
                                        href={`/admin/shop/update?shopId=${item.shopId}`}
                                    >
                                        EDIT
                                    </Button>
                                    <Button variant="link fs-4">
                                        <Trash color="FIreBrick" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <Pagi pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </Container>
    );
}
export default ShopAdmin;
