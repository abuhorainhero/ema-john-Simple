import React from 'react';
import './App.css';
import Header from './component/Header/Header';
import Shop from './component/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './component/Review/Review';
import Inventory from './component/Inventory/Inventory';
import NotFound from './component/NotFound/NotFound';
import ProductDetail from './component/ProductDetail/ProductDetail';

function App() {
  return (
    <div>
    <Header></Header>
    <Router>
      <Switch>
        <Route path='/shop'>
          <Shop></Shop>
        </Route>
        <Route path='/review'>
          <Review></Review>
        </Route>
        <Route path='/inventory'>
          <Inventory></Inventory>
        </Route>
        <Route exact path='/'>
          <Shop></Shop>
        </Route>
        <Route path='/product/:productKey'>
          <ProductDetail></ProductDetail>
        </Route>
        <Route path='*'>
          <NotFound></NotFound>
        </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
