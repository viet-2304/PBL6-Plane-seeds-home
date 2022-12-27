import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import BASE_API_URL from '../../api/api';
import Button from '../../components/Button/Button';
import Pagination from '../../components/Pagination/Pagination';

import './Shop.scss';
function Shop() {
    console.log('re-render');
    const [products, setProducts] = useState([]);
    const location = useLocation();
    const [shop, setShop] = useState();
    const pages = location.pathname.split('/').splice(1);
    const [image, setImage] = useState(document.querySelector('#file'));
    const [URL, setURL] = useState('');
    const [isShow, setIsShow] = useState(true);

    useEffect(() => {
        axios
            .get(BASE_API_URL + `v1/shop/getShopById?shopId=${localStorage.getItem('shopId')}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            })
            .then((res) => {
                setShop(res.data);
                console.log('shop', res.data);
            })
            .catch((err) => console.log(err));
    }, []);
    useEffect(() => {
        const fetchProdutList = () => {
            axios
                .get(BASE_API_URL + `v1/product/getProductByShop?shopId=${pages[pages.length - 1]}`)
                .then((res) => {
                    setProducts(res.data);
                    console.log('setProducts', res.data);
                })
                .catch((err) => console.log(err));
        };
        fetchProdutList();
    }, []);
    return (
        <div className="shop">
            <div className="shop-info ">
                <div className="container d-flex flex-column align-items-center justify-content-center">
                    <Image
                        className="user-image me-3"
                        src={
                            shop?.image
                                ? shop.image
                                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_mNmpqHOTakNgIaKR5bxJFfkUtiLdPBXPMw&usqp=CAU"'
                        }
                        alt="imageshop"
                    />
                    <div>
                        <h1 className="shop-name text-center">{shop?.shopName}</h1>
                    </div>
                </div>
            </div>
            <div>
                <Pagination title="" data={products} numberPerPage={8} />
            </div>
        </div>
    );
}

export default Shop;
