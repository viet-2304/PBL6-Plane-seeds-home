import classNames from 'classnames/bind';
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

import styles from './Products.module.scss';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import Panigation from '../../components/Pagination/Pagination';
import { useState, useEffect } from 'react';
import ProductDetail from '../../components/ProductDetail/ProductDetail';
import axios from 'axios';
import BASE_API_URL from '../../api/api';

const cx = classNames.bind(styles);

function Products() {
    console.log('re-render');
    const [productById, setProductById] = useState([]);
    const [productsByCategory, setProductsByCategory] = useState([]);
    const location = useLocation();

    const API = axios.create({
        baseURL: BASE_API_URL,
    });

    const [pages, setPages] = useState(location.pathname.split('/').splice(1));
    useEffect(() => {
        setPages(location.pathname.split('/').splice(1));
    }, [location]);
    useEffect(() => {
        if (pages.length === 3) {
            const fetchProdutList = () => {
                API.get(`v1/product/getProduct?id=${pages[pages.length - 1]}`)
                    .then((res) => {
                        setProductById(res.data);
                    })
                    .catch((err) => console.log(err));
            };
            fetchProdutList();
        } else if (pages.length === 1) {
            const fetchProdutList = () => {
                API.get('v1/product/getAllProduct')
                    .then((res) => {
                        setProductsByCategory(res.data);
                        console.log(res.data);
                    })
                    .catch((err) => console.log(err));
            };
            fetchProdutList();
        } else {
            const fetchProdutList = () => {
                API.get(`v1/product/getProductWithType?type=${pages[pages.length - 1]}`)
                    .then((res) => {
                        console.log('res:', res.data);
                        setProductsByCategory(res.data);
                    })
                    .catch((err) => console.log(err));
            };
            fetchProdutList();
        }
    }, []);

    // useEffect(() => {
    // if (pages.length === 3) {
    //     const fetchProdutList = () => {
    //         API.get(`v1/product/getProduct?id=${pages[pages.length - 1]}`)
    //             .then((res) => {
    //                 setProductById(res.data);
    //             })
    //             .catch((err) => console.log(err));
    //     };
    //     fetchProdutList();
    // }
    //    else if (pages.length === 1) {
    //         const fetchProdutList = () => {
    //             API.get('v1/product/getAllProduct')
    //                 .then((res) => {
    //                     setProductsByCategory(res.data);
    //                 })
    //                 .catch((err) => console.log(err));
    //         };
    //         fetchProdutList();
    //     } else {
    //         const fetchProdutList = () => {
    //             API.get(v1/product/getProductWithType?type=${pages[pages.length - 1]})
    //                 .then((res) => {
    //                     console.log('res:', res.data);
    //                     setProductsByCategory(res.data);
    //                 })
    //                 .catch((err) => console.log(err));
    //         };
    //         fetchProdutList();
    //     }
    // }, [pages]);
    // else console.log(productsByCategory);

    return (
        <Container className={cx('container')}>
            <Breadcrumbs />
            {pages.length === 3 ? (
                <ProductDetail />
            ) : (
                <Panigation
                    title={pages?.length === 1 ? 'all' : pages[pages?.length - 1]}
                    data={productsByCategory}
                    numberPerPage={8}
                ></Panigation>
            )}
        </Container>
    );
}

export default Products;
