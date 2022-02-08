import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useContext, useEffect, useRef, useState } from "react"
import NavLink from "./NavLink"
import { signOut, useSession } from 'next-auth/react';
import fetcher from "./Fetcher"
import useSWR, { useSWRConfig } from 'swr'
import Category from "./Category"
import axios from "axios"
import { GlobalContext, useGlobalContext } from "../Context/GlobalContext"
import { DECREASE_QUANTITY, GET_PRODUCT_FROM_CART, INCREASE_QUANTITY, REMOVE_FROM_CART } from "../Context/Constants/CartConstants"

const Nav = () => {
    let { mutate } = useSWRConfig()
    const { cart, cartDispatch } = useGlobalContext()
    const authentication = useSession();
    const router = useRouter();
    const [searchOpen, setSearchOpen] = useState(false);
    const [cartPanelHeight, setCartPanelHeight] = useState(0);
    const searchRef = useRef(null)
    const headerHeight = useRef(null);
    const cartHeaderHeight = useRef(null);
    const cartFooterHeight = useRef(null);
    const cartPanel = useRef(null);
    const [navOpen, setNavOpen] = useState(false);
    const [isMobileHeight, setIsMobileHeight] = useState(false);
    const [stickyNav, setStickyNav] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);

    // SWR data fetching
    const { data: categories, error } = useSWR(`/categories`, fetcher);
    const { data: cartData } = useSWR(`/carts`, fetcher);

    useEffect(() => {
        searchOpen && searchRef.current.focus();
        window !== undefined && window.addEventListener('resize', () => {
            if (window.innerWidth > 991) {
                setIsMobileHeight(false);
            } else {
                setIsMobileHeight(true);
            }
        });

        window !== undefined && window.addEventListener('scroll', () => {
            if (headerHeight?.current?.offsetHeight && (window.scrollY > headerHeight?.current?.offsetHeight)) {
                setStickyNav(true);
            } else {
                setStickyNav(false);
            }
        })

        if (window.innerWidth > 991) {
            setIsMobileHeight(false);
        } else {
            setIsMobileHeight(true);
        }
    }, [searchOpen, headerHeight]);

    useEffect(() => {

        if (cartOpen) {
            document.body.style.overflowY = "hidden";
            setCartPanelHeight(cartHeaderHeight?.current.offsetHeight + cartFooterHeight?.current.offsetHeight)
        } else {
            document.body.style.overflowY = "auto";
        }

    }, [cartOpen]);

    useEffect(() => {
        cartDispatch({
            type: GET_PRODUCT_FROM_CART,
            payload: cartData
        })
    }, [cartDispatch, cartData])

    const increaseQuantity = async (item) => {
        cartDispatch({
            type: INCREASE_QUANTITY,
            payload: item
        })
        item.quantity++;
        await axios.put(`/carts/${item.id}`, item);
        mutate('/carts')
    }

    const decreaseQuantity = async (item) => {
        cartDispatch({
            type: DECREASE_QUANTITY,
            payload: item
        })
        item.quantity--;
        await axios.put(`/carts/${item.id}`, item);
        mutate('/carts')
    }

    const removeItem = async (item) => {
        cartDispatch({
            type: REMOVE_FROM_CART,
            payload: item
        });
        await axios.delete(`/carts/${item.id}`, item);
        mutate('/carts')
    }

    return (
        <div className="bg-gradient-to-r from-purple-800 to-purple-300">
            <header ref={headerHeight} className={isMobileHeight ? "px-[1rem] w-screen pt-3 lg:pt-8 pb-3 fixed top-0 z-20 bg-gradient-to-r from-purple-800 to-purple-300" : "container mx-auto pt-3 lg:pt-8 pb-3 "}>
                <div className="grid grid-cols-3 items-center">
                    <div className="justify-self-start flex justify-around items-center bg-transparent">
                        <div
                            onBlur={() => searchRef.current.value !== '' ? '' : setSearchOpen(false)}
                            className={`${searchOpen ? `${isMobileHeight ? 'absolute left-0 right-0 z-10 h-10' : 'w-auto'} border border-purple-800 rounded-full normal-transition shadow-lg bg-purple-800` : 'h-10 w-10 border border-purple-800 group flex justify-center items-center rounded-full normal-transition cursor-pointer bg-transparent overflow-hidden lg:hover:bg-purple-800'}`}
                        >
                            <div className={`${searchOpen ? 'flex justify-center items-center py-2 mx-3 h-full ' : ''}`}>
                                <i onClick={() => setSearchOpen(!searchOpen)} className={searchOpen ? "bi bi-search mr-3 text-white" : "bi bi-search text-white "}></i>
                                {searchOpen && <input ref={searchRef} type="text" className="h-full w-full focus:outline-none bg-transparent text-white" />}
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        {/* <Image src="/logo-2.png" height={300} width={1400} layout="intrinsic" alt="logo-img" /> */}
                        <h1>
                            <Link href="/">
                                <a>
                                    <span className="text-sm lg:text-3xl block text-white font-bold">PERFUME BANGLADESH</span>
                                    <span className="hidden lg:block text-base text-white font-medium">A House of Authentic Fragrance</span>
                                </a>
                            </Link>
                        </h1>
                    </div>
                    <div className="justify-self-end flex items-center text-white">
                        <div className="mr-10 hidden lg:block">
                            <h1 className="text-base font-semibold text-white mb-0">Hello, Enthusiast</h1>
                            <div className="flex items-center">
                                <Link href="/login">
                                    <a className="text-xs text-white hover:text-purple-800 uppercase normal-transition font-medium">Log In</a>
                                </Link>
                                <span className='text-xs uppercase mx-1'>OR</span>
                                <Link href="/register">
                                    <a className="text-xs text-white hover:text-purple-800 uppercase normal-transition font-medium">Register</a>
                                </Link>
                            </div>
                        </div>
                        <div className="relative cursor-pointer w-7" onClick={() => setCartOpen(true)}>
                            <span className="h-5 w-5 text-xs rounded-full bg-purple-800 font-semibold absolute -top-1 -right-2 flex justify-center items-center text-white">
                                {cart?.length}
                            </span>
                            <i className="bi bi-bag text-3xl"></i>
                        </div>
                        <div onClick={() => setNavOpen(!navOpen)} className="h-12 w-12 flex justify-center items-center lg:hidden normal-transition cursor-pointer">
                            {navOpen ? <i className="bi bi-x-lg text-3xl normal-transition"></i> : <i className="bi bi-list text-3xl normal-transition"></i>}
                        </div>
                    </div>
                </div>
                <nav className={`flex justify-center items-center ${isMobileHeight && stickyNav ? 'absolute left-0 top-0 right-0 bg-gradient-to-r from-purple-800 to-purple-300' : !isMobileHeight && stickyNav ? 'py-3 w-screen fixed left-0 right-0 top-0 bg-gradient-to-r from-purple-800 to-purple-300 z-20 animate__animated animate__fadeInDown shadow-xl' : 'mt-3 '} text-white`}>
                    {navOpen && <i onClick={() => setNavOpen(!navOpen)} className="bi bi-x-lg text-3xl animate__animated animate__slideInLeft normal-transition absolute top-0 right-0 p-3 bg-purple-800 z-20"></i>}
                    <ul className={isMobileHeight ? `${isMobileHeight && navOpen ?
                        'list-none flex flex-col absolute top-0 left-0 bottom-0 w-full backdrop-blur-lg z-10 py-8 bg-white opacity-100 shadow-lg animate__animated animate__slideInLeft h-screen overflow-auto text-purple-800 container mx-auto' :
                        'absolute top-0 bottom-0 -left-full animate__animated animate__slideInRight bg-white z-10'} mb-0` :
                        'list-none flex lg:flex-row lg:items-center mb-0'}>
                        {categories && categories.map(category => (
                            <li key={category.id} className="py-2 lg:py-0 px-2 group">
                                <NavLink className="py-2 text-white font-medium uppercase border-b border-transparent hover:text-purple-500 lg:hover:text-gray-300 hover:border-white normal-transition" href={`/categories/${category.name.toLowerCase()}`}>
                                    <p className="mb-0">{category.name}</p>
                                </NavLink>
                                {category.subCategories.length ?
                                    <div className="hidden group-hover:block lg:absolute lg:left-0 lg:right-0 lg:z-40">
                                        <div className="container mx-auto">
                                            <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 bg-white px-1 lg:px-8 py-5 ;g:mx-48">
                                                {category.subCategories.map(subCategory => (
                                                    <Category
                                                        key={subCategory.name + subCategory.id}
                                                        category={category}
                                                        subCategory={subCategory}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    : null
                                }
                            </li>
                        ))}

                        {stickyNav && <div className="relative cursor-pointer w-7" onClick={() => setCartOpen(true)}>
                            <span className="h-5 w-5 text-xs rounded-full bg-purple-800 font-semibold absolute -top-1 -right-2 flex justify-center items-center text-white">
                                {cart?.length}
                            </span>
                            <i className="bi bi-bag text-2xl"></i>
                        </div>}
                    </ul>
                </nav>
            </header>
            {isMobileHeight && <div style={{ height: headerHeight.current?.offsetHeight }} />}
            {cartOpen &&
                <div className="fixed inset-0 backdrop-blur-md z-20">
                    <div className="absolute right-0 w-full lg:w-96 top-0 bottom-0 bg-white px-3 py-2  animate__animated animate__fadeInRight border border-purple-800">
                        <div className="relative h-full">
                            <div ref={cartHeaderHeight} className="flex justify-between items-center border-b border-purple-500 pb-3">
                                <div />
                                <h1 className="text-2xl font-semibold">Your Cart</h1>
                                <div className="text-black h-4 w-4 flex justify-center items-center hover:from-purple-800 hover:bg-purple-800 normal-transition hover:text-white p-4">
                                    <i className="bi bi-x-lg cursor-pointer" onClick={() => setCartOpen(false)}></i>
                                </div>
                            </div>
                            <div
                                ref={cartPanel}
                                className="overflow-auto fixed pb-5 cartPanel"
                                style={{ height: `calc(100vh - ${cartPanelHeight}px)` }}
                            >
                                {cart && cart.map((cartItem, index) => (

                                    <div key={cartItem.name.split(' ').join('-') + '-' + index} className="flex my-3 border rounded-lg shadow-md shadow-purple-300 px-3 py-3">
                                        <div className="w-24 flex justify-center items-center mr-2">
                                            <Image className="ml-auto" src={cartItem.images[0]} height={80} width={80} alt={cartItem.name} />
                                        </div>
                                        <div className="flex flex-col justify-between">
                                            <div className="flex justify-between items-start">
                                                <h1 className="text-sm text-left line-clamp-2 mr-2">{cartItem.name}</h1>
                                                <i onClick={() => removeItem(cartItem)} className="bi bi-x-lg cursor-pointer px-1 py-0 hover:bg-purple-700 hover:text-white normal-transition"></i>
                                            </div>
                                            <div className="flex justify-between items-center mb-0">
                                                <div className="flex items-center">
                                                    <i className="bi bi-dash border hover:border-purple-500 px-1 mr-1 cursor-pointer active:bg-purple-500 active:text-white normal-transition border-purple-300" onClick={() => cartItem.quantity >= 2 && decreaseQuantity(cartItem)}></i>
                                                    <span className="text-sm mx-2 w-3 text-center text-purple-700">{cartItem.quantity}</span>
                                                    <i className="bi bi-plus border ml-1 px-1 cursor-pointer hover:border-purple-500 active:bg-purple-500 active:text-white normal-transition border-purple-300" onClick={() => increaseQuantity(cartItem)}></i>
                                                </div>
                                                <p className="text-base font-bold text-purple-700 mb-0">
                                                    BDT {cartItem.price * cartItem.quantity}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div ref={cartFooterHeight} className="absolute bottom-0 left-0 right-0 px-2 py-4 border-t border-purple-500 bg-white">
                                <div className="flex justify-between items-center">
                                    <h1 className="text-base font-semibold">Total Quantity</h1>
                                    <p className="text-base font-bold text-purple-700">
                                        {cart && cart.reduce((acc, item) => acc + item.quantity, 0)}
                                    </p>
                                </div>

                                <div className="flex justify-between items-center">
                                    <h1 className="text-base font-semibold">Total Amount</h1>
                                    <p className="text-base font-bold text-purple-700">
                                        <span className="mr-2">BDT</span>
                                        {cart && cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}
                                    </p>
                                </div>
                                <Link href="/">
                                    <a className="text-base mt-4 font-semibold text-white bg-purple-700 block text-center py-3 rounded-md hover:bg-purple-500 hover:shadow-md normal-transition">Purchase</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Nav
