import { faUser } from '@fortawesome/free-regular-svg-icons';
import {
    faCartShopping,
    faChevronUp,
    faDollar,
    faSeedling,
    faWallet,
    faShop,
    faTruckFast,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, Navigate } from 'react-router-dom';
import routes from '../../../config/routes';
import './StatCard.scss';

const StatCard = ({ type, bg, link }) => {
    let data;

    //temporary
    const amount = 100;
    const diff = 20;

    switch (type) {
        case 'customer':
            data = {
                title: 'CUSTOMERS',
                isMoney: false,
                link: <Link to={link}>See all customers</Link>,
                icon: (
                    <FontAwesomeIcon
                        icon={faUser}
                        className="icon"
                        style={{
                            color: 'crimson',
                            backgroundColor: 'rgba(255, 0, 0, 0.2)',
                        }}
                    />
                ),
            };
            break;
        case 'order':
            data = {
                title: 'ORDERS',
                isMoney: false,
                link: <Link to={link}>See all orders</Link>,
                icon: (
                    <FontAwesomeIcon
                        icon={faCartShopping}
                        className="icon"
                        style={{
                            backgroundColor: 'rgba(218, 165, 32, 0.2)',
                            color: 'goldenrod',
                        }}
                    />
                ),
            };
            break;
        case 'store':
            data = {
                title: 'STORE',
                isMoney: true,
                link: <Link to={link}>See all store</Link>,
                icon: (
                    <FontAwesomeIcon
                        icon={faShop}
                        className="icon"
                        style={{
                            backgroundColor: 'rgba(0, 43, 128, 0.2)',
                            color: 'blue',
                        }}
                    />
                ),
            };
            break;
        case 'delivery':
            data = {
                title: 'DELIVERY',
                isMoney: true,
                link: <Link to={link}>See all delivery</Link>,
                icon: (
                    <FontAwesomeIcon
                        icon={faTruckFast}
                        className="icon"
                        style={{
                            backgroundColor: 'rgba(128, 0, 128, 0.2)',
                            color: 'purple',
                        }}
                    />
                ),
            };
            break;
        case 'product':
            data = {
                title: 'PRODUCTS',
                isMoney: true,
                link: <Link to={link}>See all products</Link>,
                icon: (
                    <FontAwesomeIcon
                        icon={faSeedling}
                        className="icon"
                        style={{ backgroundColor: 'rgba(0, 128, 0, 0.2)', color: 'green' }}
                    />
                ),
            };
            break;
        default:
            break;
    }

    return (
        <div className={`w-100 shadow my-3 bg-opacity-25 widget ${bg}`}>
            <div className="left">
                <span className="title text-success">{data.title}</span>
                <span className="counter">
                    {data.isMoney && '$'} {amount}
                </span>
                <span className="link">{data.link}</span>
            </div>
            <div className="right">
                <div className="percentage positive">
                    <FontAwesomeIcon icon={faChevronUp} className="icon" />
                    {diff} %
                </div>
                {data.icon}
            </div>
        </div>
    );
};

export default StatCard;
