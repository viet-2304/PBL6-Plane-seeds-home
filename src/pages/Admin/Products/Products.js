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
import './Products.scss';

function Product({ prop }) {
    const [products, setProducts] = useState([]);
    const API = axios.create({
        baseURL: BASE_API_URL,
    });

    useEffect(() => {
        const fetchProductList = () => {
            API.get('v1/product/getAllProduct')
                .then((res) => {
                    setProducts(res.data);
                })
                .catch((err) => console.log(err));
        };
        fetchProductList();
    }, []);

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
                        src={row.imagesUrl !== [] ? row.imagesUrl[0] : ''}
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
                    <Button className="remove">
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </div>
            ),
        },
    ];
    return (
        <Container className="d-flex flex-column justify-content-center ">
            {prop === 'all' && (
                <div className="button-action">
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

            {/* )} */}
        </Container>
    );
}

export default Product;
