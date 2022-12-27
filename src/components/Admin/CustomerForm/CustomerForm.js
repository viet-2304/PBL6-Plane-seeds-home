import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import BASE_API_URL from '../../../api/api';
import Button from '../../Button/Button';
import './CustomerForm.scss';
import handleUpload from '../../../api/firebase';
const ProductForm = ({ prop }) => {
    const [URL, setURL] = useState('');
    const [image, setImage] = useState(document.querySelector('#file'));
    const [customer, setCustomer] = useState({
        email: '',
        phoneNumber: '',
        address: '',
        userName: '',
        imageAvatar: [''],
    });
    const location = useLocation();
    const pages = location.pathname.split('/').splice(1);
    const API = axios.create({
        baseURL: BASE_API_URL,
    });

    const onFileChange = (e) => {
        if (e.target && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    useEffect(() => {
        prop === 'update' &&
            API.get(`v1/users/getUserById?userId=${pages[pages.length - 1]}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
                .then((res) => {
                    setCustomer(res.data);
                    console.log('dataup', res.data);
                })
                .catch((err) => console.log(err));
    }, []);
    const handleUpdateImage = () => {
        handleUpload(image, setURL);
    };
    useEffect(() => {
        setCustomer({ ...customer, imageAvatar: [URL] });
    }, [URL]);
    const handleClick = () => {
        if (prop === 'create') {
            axios
                .post(BASE_API_URL + 'v1/users/createUser', customer, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    },
                })
                .then((res) => {
                    alert('Create successful!');
                    window.location.pathname = '/admin/customers';
                    console.log('OK', res.data);
                })
                .catch((err) => console.log(err));
        } else {
            axios
                .post(BASE_API_URL + 'v1/users/editUser', customer, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    },
                })
                .then((res) => {
                    setCustomer(res.data);
                    alert('Update successful!');
                    window.location.pathname = '/admin/customers';
                })
                .catch((err) => console.log(err));
        }
    };
    console.log('l', customer);
    return (
        <Container fluid="xl" className="d-flex justify-content-center px-0 py-md-3">
            <div
                className="bg-white shadow p-4 rounded w-100 fs-20"
                // onSubmit={handleSubmit(handleCreateProduct)}
            >
                <h1 className="text-center mb-3">
                    {prop === 'create' ? 'Create ' : 'Update '}
                    User
                </h1>

                <Row className="mb-3">
                    <Col md>
                        <Form.Group
                            id="formFile"
                            className="mt-3 d-flex flex-column justify-content-center "
                        >
                            <div className="d-flex ">
                                <Form.Control
                                    type="file"
                                    id="file"
                                    name="file"
                                    size="lg"
                                    multiple={false}
                                    onChange={onFileChange}
                                    className="me-5"
                                />
                                <Button cart onClick={() => handleUpdateImage()}>
                                    Choose this file
                                </Button>
                            </div>
                            {console.log(customer, customer?.imageAvatar)}
                            <img
                                // src={products?.imageAvatar !== [''] ? products?.imageAvatar[0] : ''}
                                src="https://cf.shopee.vn/file/59ced2b1371dd71a64a52af77b69d3d1"
                                alt=""
                                className="image-product mt-3"
                            />
                        </Form.Group>
                    </Col>
                    <Col md className="pt-3 pt-md-0">
                        <FloatingLabel label="Email" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="email"
                                value={customer?.email}
                                onChange={(e) =>
                                    setCustomer({
                                        ...customer,
                                        email: e.target.value,
                                    })
                                }
                            />
                        </FloatingLabel>
                        <FloatingLabel label="Phone" className="mb-3">
                            <Form.Control
                                type="phone"
                                placeholder="phone"
                                value={customer?.phoneNumber}
                                onChange={(e) =>
                                    setCustomer({
                                        ...customer,
                                        phone: e.target.value,
                                    })
                                }
                            />
                        </FloatingLabel>
                        <FloatingLabel label="Address" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="address"
                                value={customer?.address}
                                onChange={(e) =>
                                    setCustomer({
                                        ...customer,
                                        address: e.target.value,
                                    })
                                }
                            />
                        </FloatingLabel>
                        <FloatingLabel label="Username" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="user name"
                                value={customer?.userName}
                                onChange={(e) =>
                                    setCustomer({
                                        ...customer,
                                        userName: e.target.value,
                                    })
                                }
                            />
                        </FloatingLabel>
                    </Col>
                </Row>
                <div className="d-flex justify-content-center ">
                    <Button cart onClick={() => handleClick()}>
                        {prop === 'create' ? 'Create ' : 'Update '}
                    </Button>
                </div>
            </div>
        </Container>
    );
};

export default ProductForm;
