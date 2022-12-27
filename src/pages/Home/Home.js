import classNames from 'classnames/bind';
import axios from 'axios';

import BASE_API_URL from '../../api/api';
import {
    faFacebook,
    faInstagram,
    faYoutube,
    faTwitter,
    faLinkedin,
} from '@fortawesome/free-brands-svg-icons';

import SliderProduct from '../../components/SliderProduct/SliderProduct';
import styles from './Home.module.scss';
import Categories from '../../components/Categories/Categories';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

function Home() {
    const API = axios.create({
        baseURL: BASE_API_URL,
    });
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchCurrentUser = () => {
            API.get('v1/users/getCurrentUser', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            })
                .then((res) => {
                    localStorage.setItem('userId', res.data.id);
                })
                .catch((err) => console.log('c', err));
        };
        fetchCurrentUser();
        const fetchProductList = () => {
            API.get('v1/product/getAllProduct')
                .then((res) => {
                    setProducts(res.data);
                })
                .catch((err) => console.log(err));
        };
        fetchProductList();
    }, []);
    return (
        <div>
            <div className={cx('wrapper')}>
                <Categories />
                <SliderProduct items={products} title={'Products Best Seller'}></SliderProduct>
            </div>
            {/* floating icon */}
            <div className={cx('icons')}>
                <ul>
                    <a href="" >
                        <li className={cx('facebook')}>
                            <FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon>
                        </li>
                    </a>
                    <a href="">
                        <li className={cx('twitter')}>
                            <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
                        </li>
                    </a>
                    <a href="">
                        <li className={cx('youtube')}>
                            <FontAwesomeIcon icon={faYoutube}></FontAwesomeIcon>
                        </li>
                    </a>
                    <a href="">
                        <li className={cx('linkedin')}>
                            <FontAwesomeIcon icon={faLinkedin}></FontAwesomeIcon>
                        </li>
                    </a>
                    <a href="" >
                        <li className={cx('instagram')}>
                            <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
                        </li>
                    </a>
                </ul>
            </div>
            <div className={cx('banner-ads')}>
                <img
                    src="https://www.ruffalonl.com/wp-content/uploads/2020/11/Mizzou_Vertical-Banner.jpg"
                    alt="ads"
                />
            </div>
        </div>
    );
}

export default Home;
