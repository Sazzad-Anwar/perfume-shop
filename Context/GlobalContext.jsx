import { createContext, useEffect, useState } from 'react'
import useSWR from 'swr';
import fetcher from '../components/Fetcher';
import { v4 as uuidv4 } from 'uuid';

export const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
    const { data } = useSWR('/cart', fetcher)
    const [cart, setCart] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        setCart(data?.data)
    }, [data?.data])

    const addToCart = (product) => {
        setCart([...cart, product]);
    }

    const removeFromCart = (product) => {
        setCart(cart.filter((_, index) => cart.indexOf(product) !== index));
    }

    const login = (email, password) => {
        setUser({
            id: uuidv4(),
            email,
        });
        localStorage.setItem('user', email);
    }

    return (
        <GlobalContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContextProvider;