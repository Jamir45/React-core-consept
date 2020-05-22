import React from 'react';
import './App.css';
import Header from './Componant/Header/Header';
import Shop from './Componant/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Review from './Componant/Review/Review';
import Manage from './Componant/Manage/Manage';
import Notfound from './Componant/Notfound/Notfound';
import ProductDetails from './Componant/Shop/ProductDetails/ProductDetails';
import PlaceOrder from './Componant/Shop/PlaceOrder';
import Login from './Componant/Login/Login';
import { AuthContextProvider, PrivateRoute } from './Componant/Login/useAuth';
import Shipment from './Componant/Shipment/Shipment';

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Router>
        <Header></Header>
          <Switch>
            <Route path="/shop">
              <Shop></Shop>
            </Route>
            <Route path="/review">
              <Review></Review>
            </Route>
            <Route path="/manage">
              <Manage></Manage>
            </Route>
            <Route exact path="/">
              <Shop></Shop>
            </Route>
            <Route path="/product/:key">
              <ProductDetails></ProductDetails>
            </Route>
            <Route path='/login'>
              <Login></Login>
            </Route>
            <PrivateRoute path='/shipment'>
              <Shipment></Shipment>
            </PrivateRoute>
            <Route path='/orderplaced'>
              <PlaceOrder></PlaceOrder>
            </Route>
            <Route path="*">
              <Notfound></Notfound>
            </Route>
          </Switch>
        </Router>
      </AuthContextProvider>

    </div>
  );
}

export default App;
