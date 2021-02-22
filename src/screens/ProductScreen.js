import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch} from "react-redux";

import ProductList from '../components/ProductList';
import Loading from '../components/Loading';
import EndList from '../components/EndList';

import { fetchAds } from "../actions/AdsAction";
import { fetchProducts } from "../actions/ProductAction";
import { Form } from "react-bootstrap";

const ProductScreen = (props) => {
    const [page, setpage] = useState(0);
    const [, setproducts] = useState([]);
    const [end, setend] = useState(false);
    const dispatch = useDispatch();
    const sort = useSelector(state => state.productStore.sort);
    const products = useSelector(state => state.productStore.products);
    const loading = useSelector(state => state.productStore.loading);
    const error = useSelector(state => state.productStore.error);

    useEffect(() => {
        dispatch(fetchProducts(page));
        dispatch(fetchAds());
        window.addEventListener("scroll", handleScroll);
    }, [dispatch])


    const handleScroll = () => {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) {

            if (!end) {
                dispatch(fetchProducts(page));
                let product   = [];
                products.forEach(product => {
                    products.push(product);
                });
                props.products.forEach(item => {
                    products.push(item);
                });

                if (this.props.products.length === 0) {
                    setend(true);
                }
                setpage(page+1);
                setproducts(products)
            }
        }
    }

    const handleSort = (event) => {
        const value = event.target.value;

        if (sort !== value){
            dispatch(fetchProducts(0, value))
        }
    }

        return (
            <div>
                <Form>
                    <Form.Group onChange={(event) => handleSort(event)}>
                        <Form.Label>Sort by</Form.Label>
                        <Form.Control as="select">
                            <option value='id'>Id</option>
                            <option value='size'>Size</option>
                            <option value='price'>Price</option>
                        </Form.Control>
                    </Form.Group>
                </Form>

                { error && <h1>{ error }</h1> }

                <ProductList products={products}/>

                { loading && <Loading/> }

                { end && <EndList/>}

            </div>
        );
}

export default ProductScreen;
