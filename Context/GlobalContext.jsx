import { createContext, useContext, useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { cartReducer } from './Reducers/CartReducers';

export const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalContextProvider = ({ children }) => {

    let initialState = {
        cart: []
    };

    const [cart, cartDispatch] = useReducer(cartReducer, initialState.cart);

    const login = (email, password) => {
        setUser({
            id: uuidv4(),
            email,
        });
        localStorage.setItem('user', email);
    }

    return (
        <GlobalContext.Provider value={{ cart, cartDispatch }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContextProvider;