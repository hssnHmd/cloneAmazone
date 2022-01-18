import './App.css';
import Header from './header/Header';
import Home from './homePage/Home';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import CheckOut from './checkout/CheckOut';
import Login from './login/Login';
import { useEffect } from 'react';
import { auth } from './firebase';
import {useStateValue} from './StateProvider';
import Payment from './payment/Payment';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js'
import Orders from './order/Orders';

const promise = loadStripe("pk_test_51K0CzcJPXcekda1Q329dSGmWQoZXrCzx9ESPBhFpErCg5maLp5Xwjv9Ll1DZcC2KV1jjFc0YiGMO2Oe6txUzovCp00hWg9UZI9");
 
function App() {
  // eslint-disable-next-line no-empty-pattern
  const [{},dispatch] = useStateValue();
    useEffect(() => {
      auth.onAuthStateChanged((authUser) =>{
        // console.log('The user is', authUser)
        if(authUser){
          // the user just logged / was logged
          dispatch({
            type: 'SET_USER',
            user:authUser
          })
        }else{
          // the user logged out
           dispatch({
            type: 'SET_USER',
            user:null
          })
        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  return (
     <Router>
      <div className="app">         
        <Routes>
          <Route path='/login' element={<Login/>} />         
            <Route path='/' element={<> <Header/><Home/></>} />                   
            <Route path='/checkout' element={<> <Header/><CheckOut/></>} />
            <Route path='/payment' element={
                                        <>
                                        <Header/>
                                        <Elements stripe={promise}>
                                        <Payment/>
                                        </Elements>
                                        </>
            } />
           <Route path='/orders' element={<> <Header/><Orders/></>} />   
        </Routes>
    </div>
     </Router>    
  );
}

export default App;
