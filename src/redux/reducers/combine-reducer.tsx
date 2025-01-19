import { combineReducers } from 'redux';
// import { reducer as formReducer } from 'redux-form';
import auths from './auth/authReducer';
import { products } from "./product/productReducer";
import { orders } from './order/orderReducer';
import { customers } from "./customer/customerReducer";

export default combineReducers({
    // auth
    auths,
    // product
    products,
    // order
    orders,
    // customer
    customers,
    // form
    // form: formReducer
});