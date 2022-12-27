import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import BASE_API_URL from '../../../api/api';
import Button from '../../Button/Button';
import './ProductForm.scss';
import handleUpload from '../../../api/firebase';
const ProductForm = ({ prop }) => {
    const navigate = useNavigate();
    const [URL, setURL] = useState('');
    const [image, setImage] = useState(document.querySelector('#file'));
    const [products, setProducts] = useState({
        productName: '',
        description: '',
        EXP: '',
        MFG: '',
        manufacturer: '',
        price: 0,
        numberOfProduct: 0,
        shops: localStorage.getItem('shopId'),
        imagesUrl: [''],
        productType: '',
    });
    const categories = [
        { name: 'rau', productTypeId: '5e41c0e652ae11edbdc30242ac120002' },
        { name: 'củ', productTypeId: '75d100dc52ae11edbdc30242ac120002' },
        { name: 'hoa', productTypeId: '8202ea1e52ae11edbdc30242ac120002' },
        { name: 'quả', productTypeId: '8202ea1e52ae11edbdc30242ac120022' },
    ];
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
        console.log('categories', categories);
        prop === 'update' &&
            API.get(`v1/product/getProduct?id=${pages[pages.length - 1]}`)
                .then((res) => {
                    console.log('res.data', res.data);
                    setProducts(res.data);
                    setProducts({
                        productId: res.data.productId,
                        productName: res.data.productName,
                        description: res.data.description,
                        EXP: res.data.exp,
                        MFG: res.data.mfg,
                        manufacturer: res.data.manufacturer,
                        price: res.data.price,
                        numberOfProduct: res.data.numberOfProduct,
                        shops: localStorage.getItem('shopId'),
                        imagesUrl: [URL],
                        productType: categories?.find(
                            (category) => category?.name === res.data?.productType,
                        )?.productTypeId,
                    });
                })
                .catch((err) => console.log(err));
    }, []);
    console.log('products', products);
    const handleUpdateImage = () => {
        handleUpload(image, setURL);
    };
    useEffect(() => {
        setProducts({ ...products, imagesUrl: [URL] });
    }, [URL]);
    const handleClick = () => {
        if (prop === 'create') {
            axios
                .post(BASE_API_URL + 'v1/product/addNewProduct', products, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    },
                })
                .then((res) => {
                    console.log('OK', res.data);
                    navigate('/seller/product/all');
                })
                .catch((err) => console.log(err));
        } else {
            axios
                .post(BASE_API_URL + 'v1/product/editProduct', products, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    },
                })
                .then((res) => {
                    console.log('OK', res.data);
                    navigate('/seller/product/all');
                })
                .catch((err) => console.log(err));
        }
    };
    console.log('l', products);
    return (
        <Container fluid="xl" className="d-flex justify-content-center px-0 py-md-3">
            <div
                className="bg-white shadow p-4 rounded w-100 fs-20"
                // onSubmit={handleSubmit(handleCreateProduct)}
            >
                <h1 className="text-center mb-3">
                    {prop === 'create' ? 'Create ' : 'Update '}
                    Product
                </h1>

                <Row className="mb-3">
                    <Col md>
                        <FloatingLabel id="floatingInput" label="Product Name" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Product Name"
                                value={products?.productName}
                                onChange={(e) =>
                                    setProducts({
                                        ...products,
                                        productName: e.target.value,
                                    })
                                }
                            />
                        </FloatingLabel>
                        <FloatingLabel id="floatingInput" label="Manufacturer" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Manufacturer"
                                value={products?.manufacturer}
                                onChange={(e) =>
                                    setProducts({
                                        ...products,
                                        manufacturer: e.target.value,
                                    })
                                }
                            />
                        </FloatingLabel>
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
                            {console.log(products, products?.imagesUrl)}
                            <img
                                src={products?.imagesUrl !== [''] ? products?.imagesUrl[0] : ''}
                                alt=""
                                className="image-product mt-3"
                            />
                        </Form.Group>
                    </Col>
                    <Col md className="pt-3 pt-md-0">
                        <FloatingLabel className="mb-3" label="Category">
                            <Form.Select
                                defaultValue={
                                    products.productType !== '' ? products.productType : 'all'
                                }
                                onChange={(e) => {
                                    setProducts({
                                        ...products,
                                        productType: e.target.value,
                                    });
                                }}
                            >
                                <option value="all" key={-1}>
                                    Choose the category
                                </option>
                                {categories?.map((category) => {
                                    return (
                                        <option value={category?.productTypeId}>
                                            {category?.name.toUpperCase()}
                                        </option>
                                    );
                                })}
                            </Form.Select>
                        </FloatingLabel>
                        <FloatingLabel className="mb-3" label="Quantity In Stock">
                            <Form.Control
                                type="number"
                                step="10"
                                min="0"
                                placeholder="Quatity In Stock"
                                value={products?.numberOfProduct}
                                onChange={(e) =>
                                    setProducts({
                                        ...products,
                                        numberOfProduct: e.target.value,
                                    })
                                }
                            />
                        </FloatingLabel>

                        <FloatingLabel label="Price" className="mb-3">
                            <Form.Control
                                type="number"
                                step="10000"
                                placeholder="price"
                                value={products?.price}
                                onChange={(e) =>
                                    setProducts({
                                        ...products,
                                        price: e.target.value,
                                    })
                                }
                            />
                        </FloatingLabel>
                        <FloatingLabel className="mb-3" label="Date of manufacture">
                            <Form.Control
                                className="form-control "
                                type="date"
                                placeholder="Date of manufacture"
                                value={moment(products?.MFG).utc().format('YYYY-MM-DD')}
                                onChange={(e) =>
                                    setProducts({
                                        ...products,
                                        MFG: e.target.value + 'T00:00:00.000+00:00',
                                    })
                                }
                            />
                        </FloatingLabel>
                        <FloatingLabel className="mb-3" label="Expiration date">
                            <Form.Control
                                type="date"
                                className="form-control"
                                placeholder="Expiration date"
                                value={moment(products?.EXP).utc().format('YYYY-MM-DD')}
                                onChange={(e) =>
                                    setProducts({
                                        ...products,
                                        EXP: e.target.value + 'T00:00:00.000+00:00',
                                    })
                                }
                            />
                        </FloatingLabel>
                        <div className=" textarea">
                            <FloatingLabel label="Description" className="h-100">
                                <Form.Control
                                    as="textarea"
                                    className="h-100"
                                    placeholder="Product Description"
                                    value={products?.description}
                                    maxLength={255}
                                    onChange={(e) =>
                                        setProducts({
                                            ...products,
                                            description: e.target.value,
                                        })
                                    }
                                />
                            </FloatingLabel>
                        </div>
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
