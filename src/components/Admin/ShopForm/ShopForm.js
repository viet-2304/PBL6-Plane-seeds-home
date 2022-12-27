import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import BASE_API_URL from '../../../api/api';
import Button from '../../Button/Button';
import '../CustomerForm/CustomerForm.scss';
import handleUpload from '../../../api/firebase';
const ShopForm = ({ prop }) => {
    const [URL, setURL] = useState('');
    const [image, setImage] = useState(document.querySelector('#file'));
    const [shop, setShop] = useState({
        email: '',
        phoneNumber: '',
        shopName: '',
        address: '',
        imageUrl: [''],
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
            API.get(`v1/shop/getShopById?shopId=${pages[pages.length - 1]}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
                .then((res) => {
                    setShop(res.data);
                    console.log('dataup', res.data);
                })
                .catch((err) => console.log(err));
    }, []);
    const handleUpdateImage = () => {
        handleUpload(image, setURL);
    };
    useEffect(() => {
        setShop({ ...shop, imageUrl: [URL] });
    }, [URL]);
    const handleClick = () => {
        if (prop === 'update') {
            axios
                .post(BASE_API_URL + 'v1/shop/updateShop', shop, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    },
                })
                .then((res) => {
                    setShop(res.data);
                    alert('Update successful!');
                    window.location.pathname = '/admin/shop';
                })
                .catch((err) => console.log(err));
        }
    };
    console.log('l', shop);
    return (
        <Container fluid="xl" className="d-flex justify-content-center px-0 py-md-3">
            <div
                className="bg-white shadow p-4 rounded w-100 fs-20"
                // onSubmit={handleSubmit(handleCreateProduct)}
            >
                <h1 className="text-center mb-3">
                    {prop === 'create' ? 'Create ' : 'Update '}
                    Shop
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
                            {console.log(shop, shop?.imageUrl)}
                            <img
                                // src={products?.imageAvatar !== [''] ? products?.imageAvatar[0] : ''}
                                src={shop?.imageUrl}
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
                                value={shop?.email}
                                onChange={(e) =>
                                    setShop({
                                        ...shop,
                                        email: e.target.value,
                                    })
                                }
                            />
                        </FloatingLabel>
                        <FloatingLabel label="Phone" className="mb-3">
                            <Form.Control
                                type="phone"
                                placeholder="phone"
                                value={shop?.phoneNumber}
                                onChange={(e) =>
                                    setShop({
                                        ...shop,
                                        phone: e.target.value,
                                    })
                                }
                            />
                        </FloatingLabel>
                        <FloatingLabel label="Address" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="address"
                                value={shop?.address}
                                onChange={(e) =>
                                    setShop({
                                        ...shop,
                                        address: e.target.value,
                                    })
                                }
                            />
                        </FloatingLabel>
                        <FloatingLabel label="Username" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Name shop"
                                value={shop?.shopName}
                                onChange={(e) =>
                                    setShop({
                                        ...shop,
                                        shopName: e.target.value,
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

export default ShopForm;
