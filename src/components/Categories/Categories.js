import { Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import BASE_API_URL from '../../api/api';

import CategoryItem from './CategoryItem';
import './Categories.scss';
import Button from '../Button/Button';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function Categories() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    const API = axios.create({
        baseURL: BASE_API_URL,
    });

    useEffect(() => {
        const fetchCategoryList = () => {
            API.get('/v1/product/getAllProductType')
                .then((res) => {
                    setCategories(res.data);
                    console.log('res.data', res.data);
                })
                .catch((err) => console.log(err));
        };
        fetchCategoryList();
    }, []);

    return (
        <Container fluid className="category-container px-0 py-5">
            <div className="container-xl px-0 pb-2 d-flex flex-row justify-content-between align-items-center mt-3">
                <h1 className="ps-4 fw-bold mb-3 mt-3">Shop plants by categories</h1>

                <Button
                    onClick={() => navigate('/products')}
                    rightIcon={<FontAwesomeIcon icon={faAngleRight} />}
                >
                    <span>Show All Plants</span>
                </Button>
            </div>
            <div className="container-xl px-4 pb-2 d-flex flex-row justify-content-center align-items-center mb-4">
                <Row>
                    {categories.map((item, index) => (
                        <Col md={3} sm={6} key={item.productTypeId}>
                            <CategoryItem item={item} index={index} />
                        </Col>
                    ))}
                    {/* <Col md={2} sm={6} key={5}>
                        <CategoryItem item={{ name: 'Cây Cảnh' }} index={3} />
                    </Col>
                    <Col md={2} sm={6} key={5}>
                        <CategoryItem item={{ name: 'Cây Cảnh' }} index={3} />
                    </Col> */}
                </Row>
            </div>
        </Container>
    );
}

export default Categories;
