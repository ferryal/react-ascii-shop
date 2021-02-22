import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import moment from 'moment';

import { useSelector, useDispatch } from 'react-redux';
import ProductItem from './ProductItem';
import AdsItem from './AdsItem';
import { fetchAds } from '../actions/AdsAction';

const ProductList = (props) => {
  const [indexAds, setindexAds] = useState(0);
  const ads = useSelector((state) => state.adsStore.ads);
  const dispatch = useDispatch();

  const insertAds = (index) => {
    if (indexAds < index) {
      setindexAds(index + 1);
      dispatch(fetchAds());
    }
  };

  // render() {
  const { products } = props;

  return (
    <div>
      <Row>
        { products !== null && products.map((product, index) => {
          const date = moment(product.date).format('YYYY-MM-DD');
          const itemDate = moment(date, 'YYYYMMDD').fromNow();
          if ((index + 1) % 20 === 0) {
            insertAds(index + 1);
          }
          const ind = Math.floor((Math.random() * ads.length));
          return (
            <>
              <Col xs={6} key={index}>
                <ProductItem size={product.size} face={product.face} price={product.price} date={itemDate} />
              </Col>
              { (index + 1) % 20 === 0 && (
                <Col xs={6} key={`ads-${index}`}>
                  <AdsItem ads={ads[ind]} />
                </Col>
              ) }
            </>
          );
        })}
      </Row>
    </div>
  );
};

// function mapStateToProps(state) {
//     return {
//         ads: state.adsStore.ads,
//         error: state.productStore.error
//     }
// }

export default ProductList;
