//import logo from './logo.svg'
import './App.css'
import { Route, Switch } from 'react-router-dom'
import Signup from './container/Signup';
import Home from './container/Home';
import Signin from './container/Signin';
import PrivateRoute from './components/HOC/Privateroute';
import { isUserLoggedIn, getAllInitialData } from './actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Category from './components/Category';
import Orders from './components/orders';
import Products from './components/products';
import NewPage from './container/NewPage';

function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if (auth.authenticate) {
      dispatch(getAllInitialData());
    }
  }, [auth.authenticate]);

  return (
    <div className="App">
      <Switch>
        <PrivateRoute path='/' exact component={Home} />
        <PrivateRoute path='/page' component={NewPage} />
        <PrivateRoute path='/category' component={Category} />
        <PrivateRoute path='/products' component={Products} />
        <PrivateRoute path='/orders' component={Orders} />

        <Route path='/signup' component={Signup} />
        <Route path='/signin' component={Signin} />
      </Switch>
    </div>
  );
}

export default App;
