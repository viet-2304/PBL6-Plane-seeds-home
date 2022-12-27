import axios from 'axios';
import { useState, useEffect } from 'react';
import { Container, Form, Image, Modal } from 'react-bootstrap';

import BASE_API_URL from '../../../api/api';
import Button from '../../../components/Button/Button';
import './Profile.scss';
import handleUpload from '../../../api/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

function Profile() {
    const [URL, setURL] = useState('');
    const [shop, setShop] = useState({});
    const [image, setImage] = useState(document.querySelector('#file'));
    const [isShow, setIsShow] = useState(false);

    const onFileChange = (e) => {
        if (e.target && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };
    const handleUpdateImage = () => {
        handleUpload(image, setURL);
    };
    const handleUpdateShop = () => {
        console.log('shop', shop);
        axios
            .post(BASE_API_URL + 'v1/shop/updateShop', shop, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            })
            .then(() => {
                console.log('OK');
            })
            .catch((err) => console.log('err', err));
    };
    useEffect(() => {
        axios
            .get(BASE_API_URL + `v1/shop/getShopByUser?userId=${localStorage.getItem('userId')}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            })
            .then((res) => {
                setShop(res.data);
                console.log(res.data);
            })
            .catch((err) => console.log('err', err));
    }, []);
    useEffect(() => {
        setShop({ ...shop, imageUrl: URL });
    }, [URL]);
    return (
        <Container className="profile-container col px-4">
            <Modal show={isShow} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton onHide={() => setIsShow(false)}>
                    <Modal.Title id="contained-modal-title-vcenter modal-title text-align-center">
                        <h3 className="fw-bolder text-align-center align-self-center">
                            Choose a file
                        </h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
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
                            <img
                                src={shop?.imageUrl ? shop?.imageUrl : ''}
                                alt=""
                                className="image-product mt-3"
                            />
                        </Form.Group>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary py-2 px-4 fs-3" onClick={() => setIsShow(false)}>
                        Close
                    </Button>
                    <Button variant="primary" className="pe-5 me-5 fs-3" onClick={() => {}}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="top-info">Profile</div>
            <div className="info">
                <div className="row my-5 ">
                    <div className="col image">
                        <div className="wrapper">
                            <Image
                                className="shop-logo "
                                src={shop?.imageUrl ? shop?.imageUrl : ''}
                                alt="imageuser"
                            />

                            <button class="file-upload" onClick={() => setIsShow(true)}>
                                <FontAwesomeIcon icon={faArrowUp} className="icon" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row my-5">
                    <label htmlFor="inputEmail" className="col-sm-3 form-label ">
                        Email
                    </label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            className="form-control"
                            id="inputEmail"
                            value={shop.email || ''}
                            onChange={(e) =>
                                setShop({
                                    ...shop,
                                    email: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>
                <div className="row my-5">
                    <label htmlFor="inputShopName" className="col-sm-3 form-label ">
                        Shop Name
                    </label>
                    <div className="col-sm-9 ">
                        <input
                            type="text"
                            className="form-control  "
                            id="inputShopName"
                            value={shop.shopName || ''}
                            onChange={(e) =>
                                setShop({
                                    ...shop,
                                    shopName: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>
                <div className="row my-5">
                    <label htmlFor="inputAddress" className="col-sm-3 form-label ">
                        Address
                    </label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            className="form-control "
                            id="inputAddress"
                            value={shop.address || ''}
                            onChange={(e) =>
                                setShop({
                                    ...shop,
                                    address: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>
                <div className="row my-5">
                    <label htmlFor="inputPhone" className="col-sm-3 form-label ">
                        Phone Number
                    </label>
                    <div className="col-sm-9">
                        <input
                            type="tel"
                            className="form-control"
                            id="inputPhone"
                            value={shop.phoneNumber || ''}
                            onChange={(e) =>
                                setShop({
                                    ...shop,
                                    phoneNumber: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>

                <div className="row my-5">
                    <div className="d-flex justify-content-center ">
                        <Button cart onClick={() => handleUpdateShop()}>
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default Profile;
