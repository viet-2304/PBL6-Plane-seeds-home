import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as XLSX from 'xlsx';
import BASE_API_URL from '../../../api/api';
import ProductForm from '../../../components/Seller/ProductForm/ProductForm';
import Button from '../../../components/Button/Button';
import List from '../../../components/Seller/Table/Table';
import movies from '../../../assets/movies';
import './Product.scss';

function Product({ prop }) {
    const navigate = useNavigate();
    const [isShow, setIsShow] = useState(false);
    const [products, setProducts] = useState([]);
    const API = axios.create({
        baseURL: BASE_API_URL,
    });

    const handleAddNew = () => {
        navigate('/seller/product/create');
    };
    const handleImportExcel = (action) => {
        setIsShow(action);
    };
    const handleSave = () => {
        axios
            .post(
                BASE_API_URL +
                    `v1/product/addMultiProduct?shopId=${localStorage.getItem('shopId')}`,
                items,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    },
                },
            )
            .then(() => {
                console.log('OK', items);
                setIsShow(false);
            })
            .catch((err) => console.log(err));
    };
    const handleDelete = (productId) => {
        axios
            .delete(BASE_API_URL + `v1/product/deleteProduct?productId=${productId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            })
            .then(() => {
                console.log('DELETE OK');
            })
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        const fetchProdutList = () => {
            API.get(`v1/product/getProductByShop?shopId=${localStorage.getItem('shopId')}`)
                .then((res) => {
                    setProducts(res.data);
                    console.log(res.data);
                })
                .catch((err) => console.log(err));
        };
        fetchProdutList();
    }, []);
    const [items, setItems] = useState(['']);
    const readExcel = (file) => {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);
            fileReader.onload = (e) => {
                const bufferArray = e.target.result;
                const wb = XLSX.read(bufferArray, { type: 'buffer' });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws);
                resolve(data);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
        promise.then((d) => {
            let list = [];
            d.map((item) => {
                item = { ...item, imagesUrl: [], shops: '' };
                list.push(item);
            });
            setItems(list);
        });
    };

    const label = [
        'productName',
        'description',
        'EXP',
        'MFG',
        'manufacturer',
        'price',
        'numberOfProduct',
        'productType',
    ];

    const labels = [
        {
            name: 'Name',
            selector: (row) => row.productName,
            sortable: true,
        },
        {
            name: 'Manufacturer',
            selector: (row) => row.manufacturer,
            sortable: true,
        },
        {
            name: 'Image',
            selector: (row) => (
                <div className="wrapper">
                    <img
                        src={
                            row.imagesUrl !== []
                                ? row.imagesUrl[0]
                                : 'https://cf.shopee.vn/file/59ced2b1371dd71a64a52af77b69d3d1'
                        }
                        alt=""
                        className="image"
                    />
                </div>
            ),
        },
        {
            name: 'Type',
            selector: (row) => row.productType,
            sortable: true,
        },
        {
            name: 'MFG',
            selector: (row) => <div className="tableCell text-center">{row.mfg.split('T')[0]}</div>,
            sortable: true,
        },
        {
            name: 'EXP',
            selector: (row) => <div className="tableCell text-center">{row.exp.split('T')[0]}</div>,
            sortable: true,
        },
        {
            name: 'Price',
            selector: (row) => row.price,
            sortable: true,
        },
        {
            name: 'Quantity',
            selector: (row) => row.numberOfProduct,
            sortable: true,
        },
        {
            name: 'Action',
            selector: (row) => (
                <div className="cellActions">
                    <Button className="icon-pen" to={`/seller/product/update/${row?.productId}`}>
                        <FontAwesomeIcon icon={faPen} />
                    </Button>
                    <Button className="remove" onClick={() => handleDelete(row?.productId)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </div>
            ),
        },
    ];
    console.log('items', items);
    return (
        <Container className="d-flex flex-column justify-content-center ">
            {prop === 'all' && (
                <div className="button-action">
                    <div className="d-flex  aglin-items-center mb-2 mx-5">
                        <button
                            type="button"
                            className="btn btn-outline-success "
                            onClick={() => handleAddNew()}
                        >
                            Add New
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-success "
                            onClick={() => handleImportExcel(true)}
                        >
                            Import Excel
                        </button>
                    </div>

                    <div className="mx-5">
                        <List
                            title="Products"
                            columns={labels}
                            data={products}
                            searchBy="productName"
                        />
                    </div>
                </div>
            )}
            {prop === 'create' && (
                <div className="mx-5">
                    <ProductForm prop={'create'} />
                </div>
            )}
            {prop === 'update' && (
                <div className="mx-5">
                    <ProductForm prop={'update'} />
                </div>
            )}
            <Modal show={isShow} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton onHide={() => setIsShow(false)}>
                    <Modal.Title id="contained-modal-title-vcenter modal-title text-align-center">
                        <h3 className="fw-bolder text-align-center align-self-center">
                            Choose a file
                        </h3>
                        <Button
                            variant="primary"
                            className="pe-5 me-5 fs-3"
                            onClick={() => handleSave(false)}
                        >
                            Save
                        </Button>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            controlId="formFile"
                            className="mb-3 d-flex  justify-content-center"
                        >
                            <Form.Control
                                type="file"
                                className="fs-3"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    readExcel(file);
                                }}
                            />
                        </Form.Group>
                        <table className="table container">
                            <thead>
                                {items !== null && items !== 'undefined' && (
                                    <tr>
                                        {label.map((d) => (
                                            <th scope="col">{d}</th>
                                        ))}
                                    </tr>
                                )}
                            </thead>
                            <tbody>
                                {items.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.productName}</td>
                                        <td>{item.description}</td>
                                        <td>{item.EXP}</td>
                                        <td>{item.MFG}</td>
                                        <td>{item.manufacturer}</td>
                                        <td>{item.price}</td>
                                        <td>{item.numberOfProduct}</td>
                                        <td>{item.productType}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary py-2 px-4 fs-3" onClick={() => setIsShow(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default Product;
