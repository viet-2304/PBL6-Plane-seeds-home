import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logoSuccess from '../../assets/images/checked.png';
import { Link, Navigate } from 'react-router-dom';
import routes from '../../config/routes';
import './Thankpage.scss';
function Thankpage() {
    const [show, setShow] = useState(true);
    return (
        <>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    {/* <Modal.Title>Modal heading</Modal.Title> */}
                </Modal.Header>
                <Modal.Body>
                    <div className="d-block">
                        <div className="d-flex justify-content-center">
                            <img src={logoSuccess} alt="" width={100} />
                        </div>
                        <div className="text-center py-3">
                            <span className="text-center">Bạn đã thanh toán thành công !</span>{' '}
                            <br />
                            <span className="text-center my-3">
                                Cảm ơn bạn đã tin tưởng sử dụng sản phẩm của chúng tôi{' '}
                                <FontAwesomeIcon icon={faHeart} />
                            </span>
                            <Button variant="py-2 px-5 fs-4 primary text-white bg-success mt-4">
                                <Link to={routes.home} className="text-white">
                                    Continue shopping
                                </Link>
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>
        </>
    );
}
export default Thankpage;
