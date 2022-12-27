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
                    {/* <Carousel.Item key="1">
                        <ProductCard
                            title="Cây cảnh"
                            image="https://cf.shopee.vn/file/59ced2b1371dd71a64a52af77b69d3d1"
                            price="1"
                            to="product/1"
                        />
                    </Carousel.Item>
                    <Carousel.Item key="1">
                        <ProductCard
                            title="Cây cảnh"
                            image="https://cf.shopee.vn/file/59ced2b1371dd71a64a52af77b69d3d1"
                            price="1"
                            to="product/1"
                        />
                    </Carousel.Item>
                    <Carousel.Item key="1">
                        <ProductCard
                            title="Cây cảnh"
                            image="https://cf.shopee.vn/file/59ced2b1371dd71a64a52af77b69d3d1"
                            price="1"
                            to="product/1"
                        />
                    </Carousel.Item>
                    <Carousel.Item key="1">
                        <ProductCard
                            title="Cây cảnh"
                            image="https://cf.shopee.vn/file/59ced2b1371dd71a64a52af77b69d3d1"
                            price="1"
                            to="product/1"
                        />
                    </Carousel.Item>
                    <Carousel.Item key="1">
                        <ProductCard
                            title="Cây cảnh"
                            image="https://cf.shopee.vn/file/59ced2b1371dd71a64a52af77b69d3d1"
                            price="1"
                            to="product/1"
                        />
                    </Carousel.Item>
                    <Carousel.Item key="1">
                        <ProductCard
                            title="Cây cảnh"
                            image="https://cf.shopee.vn/file/59ced2b1371dd71a64a52af77b69d3d1"
                            price="1"
                            to="product/1"
                        />
                    </Carousel.Item>
                    <Carousel.Item key="1">
                        <ProductCard
                            title="Cây cảnh"
                            image="https://cf.shopee.vn/file/59ced2b1371dd71a64a52af77b69d3d1"
                            price="1"
                            to="product/1"
                        />
                    </Carousel.Item>
                    <Carousel.Item key="1">
                        <ProductCard
                            title="Cây cảnh"
                            image="https://cf.shopee.vn/file/59ced2b1371dd71a64a52af77b69d3d1"
                            price="1"
                            to="product/1"
                        />
                    </Carousel.Item>

                    <Carousel.Item key="1">
                        <ProductCard
                            title="Cây cảnh"
                            image="https://cf.shopee.vn/file/59ced2b1371dd71a64a52af77b69d3d1"
                            price="1"
                            to="product/1"
                        />
                    </Carousel.Item> */}
                    {items?.map((item) => {
                        return (
                            <Carousel.Item key={item.productId}>
                                <ProductCard
                                    title={item.productName}
                                    image={item.imagesUrl ? item.imagesUrl[0] : ''}
                                    price={item.price}
                                    to={`/products/${item.productType}/${item.productId}`}
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
