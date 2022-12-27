import React from 'react';
import { Container } from 'react-bootstrap';
import Carousel from 'react-grid-carousel';

import ProductCard from '../ProductCard/ProductCard';
import './SliderProduct.scss';

function SliderProduct({ items, title }) {
    return (
        <Container fluid className="sliderItem-container px-0 py-5 mt-3">
            <div className="container-xl px-0 pb-2 d-flex flex-row justify-content-between align-items-center">
                <h1 className="ps-4 fw-bold mb-3 mt-3 ">{title}</h1>
            </div>
            <div className="container-xl px-0 mb-5">
                <Carousel
                    className="slide-space"
                    cols={4}
                    rows={1}
                    gap={20}
                    autoplay={5000}
                    loop={true}
                    responsiveLayout={[
                        {
                            breakpoint: 1023,
                            cols: 3,
                        },
                        {
                            breakpoint: 650,
                            cols: 2,
                        },
                    ]}
                    mobileBreakpoint={400}
                >
                    {items?.map((item) => {
                        return (
                            <Carousel.Item key={item.productDto.productId}>
                                <ProductCard
                                    title={item.productDto.productName}
                                    image={
                                        item.productDto?.imagesUrl !== []
                                            ? item.productDto.imagesUrl[0]
                                            : 'https://firebasestorage.googleapis.com/v0/b/plant-seeds-home.appspot.com/o/images%2Fdefaultproduct.png?alt=media&token=0491d08d-0f8b-401d-a76e-1bacaa5a2705'
                                    }
                                    price={item.productDto.price}
                                    to={`/products/${item.productDto.productType}/${item.productDto.productId}`}
                                />
                            </Carousel.Item>
                        );
                    })}
                </Carousel>
            </div>
        </Container>
    );
}

export default SliderProduct;
