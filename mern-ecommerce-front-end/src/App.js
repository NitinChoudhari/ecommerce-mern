import HomePage from './containers/HomePage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ProductListPage from './containers/productListPage';
import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { isUserLoggedIn } from './actions/auth.actions';
import ProductdetailsPage from './containers/ProductDetailsPage';
import CartPage from './containers/CartPage';
import { updateCart } from './actions';
import CheckoutPage from './containers/CheckoutPage';
import './App.css'
import OrdersPage from './containers/OrdersPage';


function App() {

  const auth = useSelector(state=> state.auth);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(!auth.authenticate){
      dispatch(isUserLoggedIn());
    }
  },[auth.authenticate]);

  useEffect(()=>{
    dispatch(updateCart());
  },[auth.authenticate]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage}/>
          <Route path="/cart" component={CartPage} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route path="/accounts/orders" component={OrdersPage}/>
          <Route path="/:productSlug/:productId/p"  component={ProductdetailsPage}/>
          <Route path="/:slug" component={ProductListPage}/>
      </Switch>
     </Router>
    </div>
      );
}

      export default App;
