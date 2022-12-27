import React, { useState } from 'react';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Pagination.scss';
import ProductCard from '../ProductCard/ProductCard';

function Pagination({ title, data, numberPerPage }) {
    const [pageNumber, setPageNumber] = useState(0);
    const [displayProducts, setDisplayProducts] = useState([]);

    const pageCount = Math.ceil(data?.length / numberPerPage);
    const visitedPage = pageNumber * numberPerPage;
    const handlePageChange = ({ selected }) => {
        setPageNumber(selected);
    };
    useEffect(() => {
        setDisplayProducts(data?.slice(visitedPage, visitedPage + numberPerPage));
    }, [data, numberPerPage, visitedPage]);
    return (
        <Container className="pagination-container">
            <h1 className="fw-bold mb-5">{title.toUpperCase()}</h1>
            <div className="row row-cols-lg-4 row-cols-md-2 g-4">
                {displayProducts?.map((product) => {
                    return (
                        <div className="col" key={product.productId}>
                            <ProductCard
                                id={product.productId}
                                title={product.productName}
                                // image="https://product.hstatic.net/1000269461/product/hat-giong-bap-ngot-pn_d20b175577684dcba3c57167006ee34a_medium.png"
                                image={product.imagesUrl ? product.imagesUrl[0] : ''}
                                price={product.price}
                                to={`/products/${product.productType}/${product.productId}`}
                                button
                            />
                        </div>
                    );
                })}
            </div>
            <ReactPaginate
                previousLabel={<FontAwesomeIcon icon={faAngleLeft} />}
                nextLabel={<FontAwesomeIcon icon={faAngleRight} />}
                pageCount={pageCount}
                onPageChange={handlePageChange}
                containerClassName="paginationContainer"
                previousLinkClassName="icon"
                nextLinkClassName="icon"
                disabledClassName="paginationDisabled"
                activeClassName="paginationActive"
            />
        </Container>
    );
}

export default Pagination;
