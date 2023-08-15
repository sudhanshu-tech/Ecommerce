import { getProductsreducer } from "./ProductReducers";
import { combineReducers } from "redux";

const rootreducers = combineReducers({
    getproductsdata: getProductsreducer
});

export default rootreducers;