import axios from "axios";
import { ADD_TO_CART, DECREASE_QUANTITY, ERROR_WHILE_CART_ACTION, GET_PRODUCT_FROM_CART, INCREASE_QUANTITY, REMOVE_FROM_CART } from "../Constants/CartConstants";

export const cartReducer = (state, action) => {
    switch (action.type) {
        case GET_PRODUCT_FROM_CART:
            return action.payload;
        case ADD_TO_CART:
            return [...state, action.payload];
        case REMOVE_FROM_CART:
            return state.filter(item => item.id !== action.payload.id);
        case INCREASE_QUANTITY:
            return state.map(item => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        quantity: item.quantity + 1,
                    };
                }
                return item;
            })
        case DECREASE_QUANTITY:
            return state.map(item => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        quantity: item.quantity - 1,
                    };
                }
                return item;
            })
        case ERROR_WHILE_CART_ACTION:
            return { error: action.payload };
        default:
            return state;
    }
}