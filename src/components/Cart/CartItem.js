import { Dash, Plus } from 'react-bootstrap-icons';
import './CartItem.scss';
import axios from 'axios';
import BASE_API_URL from '../../api/api';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button/Button';

function CartItem({ itemKey, item, handleChangeQuantity, handleDelete }) {
    const [quantity, setQuantity] = useState(
        parseInt(item?.numberOfProductInCart) ? parseInt(item?.numberOfProductInCart) : 1,
    );
    const handleQuantity = (type) => {
        if (type === 'down') {
            if (quantity > 1) {
                setQuantity((pre) => pre - 1);
            }
        } else {
            // kiểm tra còn hàng không
            setQuantity((prev) => prev + 1);
        }
    };

    useEffect(() => {
        axios
            .post(
                BASE_API_URL + 'v1/cart/editCart',
                {
                    id: item.cartId,
                    number: quantity,
                    userId: localStorage.getItem('userId'),
                    productId: item.productId,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    },
                },
            )
            .then(() => {
                handleChangeQuantity();
            })
            .catch((err) => console.log('111', err));
    }, [quantity]);
    return (
        <div key={itemKey} className=" border-bottom border-secondary d-flex py-3">
            <div className="col d-flex align-items-center justify-content-start">
                <img
                    src={
                        item.imagesUrl !== []
                            ? item.imagesUrl[0]
                            : 'https://firebasestorage.googleapis.com/v0/b/plant-seeds-home.appspot.com/o/images%2Fdefaultproduct.png?alt=media&token=0491d08d-0f8b-401d-a76e-1bacaa5a2705'
                    }
                    alt=""
                    width="70px"
                    height="70px"
                />
            </div>
            <div className="col d-flex align-items-center justify-content-start">
                <div className="text-black h2 text-name">{item?.productName}</div>
            </div>
            <div className="col d-flex col align-items-center justify-content-center">
                <div className=" text-black">{item?.price}</div>
            </div>
            <div className="col d-flex col align-items-center justify-content-center">
                <Dash size="30px" onClick={() => handleQuantity('down')} />
                <p className="quantity d-inline-flex justify-content-center align-items-center border border-success rounded-3 mx-1">
                    {quantity}
                </p>
                <Plus size="30px" onClick={() => handleQuantity('up')} />
            </div>
            <div className="d-flex col align-items-center justify-content-center text-danger">
                {quantity * item?.price}
            </div>
            <div className="d-flex align-items-center justify-content-center pe-5">
                <Button onClick={() => handleDelete(item?.cartId)}>
                    <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
                </Button>
            </div>
        </div>
    );
}

export default CartItem;
