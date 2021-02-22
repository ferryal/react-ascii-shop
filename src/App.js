import React, { useEffect } from 'react';
import './App.css';
import './constants/Style';
import { useSelector, useDispatch } from 'react-redux';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import ProductScreen from './screens/ProductScreen';
import { fetchAds } from './actions/AdsAction';

const App = () => {
  const dispatch = useDispatch();
  const ads = useSelector((state) => state.adsStore.ads);

  useEffect(() => {
    dispatch(fetchAds);
  }, [dispatch]);

  return (
    <div className="App">
      <div style={{ background: 'linear-gradient(#0F2027, #2C5364)', color: '#fff', padding: 50 }}>
        <Container>
          <Row>
            <Col lg={6}>
              <h1>Products Grid</h1>

              <p>
                Here you&apos;re sure to find a bargain on some of the finest ascii available to purchase. Be sure to
                peruse our selection of ascii faces in an exciting range of sizes and prices.
              </p>

              <p>But first, a word from our sponsors:</p>
            </Col>
            <Col lg={6}>
              <img src={ads} style={{ borderWidth: 2, borderColor: '#fff', borderStyle: 'solid' }} alt="" />
            </Col>
          </Row>
        </Container>
      </div>

      <Container style={{ padding: 50 }}>
        <Router>
          <Route exact path="/" component={ProductScreen} />
        </Router>
      </Container>
    </div>
  );
};

export default App;
