import { useEffect, useState } from 'react';
import { Button, FormControl, Form, Table, Container } from 'react-bootstrap';
// import { getAllUsers, deleteUser, getUserBySearch } from '../../api/api';
import CustomerRow from './CustomerRow';
// import Pagination from '../../../components/Pagination/Pagination';
import { useForm } from 'react-hook-form';
import CustomerForm from '../../../components/Admin/CustomerForm/CustomerForm';
import axios from 'axios';
import BASE_API_URL from '../../../api/api';
import './Customer.scss';
import Pagi from '../../../components/Admin/Pagi/Pagi';

function Customers({ prop }) {
    const [customers, setCustomers] = useState();
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
    const getAllUsers = () => API.get('/users/getAll');
    useEffect(() => {
        const getCustomerData = async () => {
            setIsFetching(true);
            try {
                const result = await getAllUsers();
                console.log(result.data);
                setCustomers(result.data);
                setIsFetching(false);
                setPages(Math.ceil(result.data.length / 10));
            } catch (error) {
                setIsFetching(false);
                console.log(error);
            }
        };
        getCustomerData();
    }, []);

    return (
        <Container className="customer mt-5">
            {prop === 'all' && (
                <>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="mb-0 display-3 text-success fw-bold">Customers</h4>
                        <Button
                            variant="dark fs-4"
                            href="/admin/customers/create"
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
                            <Button
                                type="submit"
                                variant="outline-primary"
                                className="rounded-end px-4"
                            >
                                Search
                            </Button>
                        </Form>
                    </div>
                    <div className="position-relative">
                        <Table className="shadow-sm mb-2 bg-body rounded text-secondary">
                            <thead className="bg-success small bg-opacity-75 text-light">
                                <tr className="text-center fs-3">
                                    <th>PHONE</th>
                                    <th>EMAIL</th>
                                    <th>ADDRESS</th>
                                    <th>ACTIVE</th>
                                    <th>USERNAME</th>
                                    <th>IMAGE</th>
                                    <th>ROLE</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers
                                    ?.slice((currentPage - 1) * 10, currentPage * 10)
                                    .map((customer) => (
                                        <CustomerRow
                                            customer={customer}
                                            // handleDelete={handleDelete}
                                            key={customer.id}
                                        />
                                    ))}
                            </tbody>
                        </Table>
                    </div>
                    <Pagi pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </>
            )}
            {prop === 'create' && (
                <div className="mx-5">
                    <CustomerForm prop={'create'} />
                </div>
            )}
            {prop === 'update' && (
                <div className="mx-5">
                    <CustomerForm prop={'update'} />
                </div>
            )}
        </Container>
    );
}
export default Customers;
