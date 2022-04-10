import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import NavLink from "./NavLink";
import { signOut, useSession } from "next-auth/react";
import fetcher from "./Fetcher";
import useSWR, { useSWRConfig } from "swr";
import Category from "./Category";
import axios from "axios";
import { useGlobalContext } from "../Context/GlobalContext";
import {
  DECREASE_QUANTITY,
  GET_PRODUCT_FROM_CART,
  INCREASE_QUANTITY,
  REMOVE_FROM_CART,
} from "../Context/Constants/CartConstants";
import { Button } from "antd";

const Nav = () => {
  let { mutate } = useSWRConfig();
  const { cart, cartDispatch } = useGlobalContext();
  const authentication = useSession();
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartPanelHeight, setCartPanelHeight] = useState(0);
  const searchRef = useRef(null);
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
    window !== undefined &&
      window.addEventListener("resize", () => {
        if (window.innerWidth > 991) {
          setIsMobileHeight(false);
        } else {
          setIsMobileHeight(true);
        }
      });

    window !== undefined &&
      window.addEventListener("scroll", () => {
        if (
          headerHeight?.current?.offsetHeight &&
          window.scrollY > headerHeight?.current?.offsetHeight
        ) {
          setStickyNav(true);
        } else {
          setStickyNav(false);
        }
      });

    if (window.innerWidth > 991) {
      setIsMobileHeight(false);
    } else {
      setIsMobileHeight(true);
    }
  }, [searchOpen, headerHeight]);

  useEffect(() => {
    if (cartOpen) {
      document.body.style.overflowY = "hidden";
      setCartPanelHeight(
        cartHeaderHeight?.current.offsetHeight +
          cartFooterHeight?.current.offsetHeight
      );
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [cartOpen]);

  useEffect(() => {
    cartDispatch({
      type: GET_PRODUCT_FROM_CART,
      payload: cartData,
    });
  }, [cartDispatch, cartData]);

  const increaseQuantity = async (item) => {
    cartDispatch({
      type: INCREASE_QUANTITY,
      payload: item,
    });

    await axios.put(`/carts/${item.id}`, {
      ...item,
      quantity: item.quantity + 1,
    });
  };

  const decreaseQuantity = async (item) => {
    cartDispatch({
      type: DECREASE_QUANTITY,
      payload: item,
    });

    await axios.put(`/carts/${item.id}`, {
      ...item,
      quantity: item.quantity - 1,
    });
  };

  const removeItem = async (item) => {
    await axios.delete(`/carts/${item.id}`, item);

    cartDispatch({
      type: REMOVE_FROM_CART,
      payload: item,
    });
  };

  return (
    <div className="bg-gradient-to-r from-purple-800 to-purple-300">
      <header
        ref={headerHeight}
        className={
          isMobileHeight
            ? "fixed top-0 z-20 w-screen bg-gradient-to-r from-purple-800 to-purple-300 px-[1rem] pt-3 pb-3 lg:pt-8"
            : "container mx-auto pt-3 pb-3 lg:pt-8 "
        }
      >
        <div className="grid grid-cols-3 items-center">
          <div className="flex items-center justify-around justify-self-start bg-transparent">
            <div
              onBlur={() =>
                searchRef.current.value !== "" ? "" : setSearchOpen(false)
              }
              className={`${
                searchOpen
                  ? `${
                      isMobileHeight
                        ? "absolute left-0 right-0 z-10 h-10"
                        : "w-auto"
                    } normal-transition rounded-full border border-purple-800 bg-purple-800 shadow-lg`
                  : "normal-transition group flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-purple-800 bg-transparent lg:hover:bg-purple-800"
              }`}
            >
              <div
                className={`${
                  searchOpen
                    ? "mx-3 flex h-full items-center justify-center py-2 "
                    : ""
                }`}
              >
                <i
                  onClick={() => setSearchOpen(!searchOpen)}
                  className={
                    searchOpen
                      ? "bi bi-search mr-3 text-white"
                      : "bi bi-search text-white "
                  }
                ></i>
                {searchOpen && (
                  <input
                    ref={searchRef}
                    type="text"
                    className="h-full w-full bg-transparent text-white focus:outline-none"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="text-center">
            {/* <Image src="/logo-2.png" height={300} width={1400} layout="intrinsic" alt="logo-img" /> */}
            <h1>
              <Link href="/">
                <a>
                  <span className="block text-sm font-bold text-white lg:text-3xl">
                    PERFUME BANGLADESH
                  </span>
                  <span className="hidden text-base font-medium text-white lg:block">
                    A House of Authentic Fragrance
                  </span>
                </a>
              </Link>
            </h1>
          </div>
          <div className="flex items-center justify-self-end text-white">
            <div className="mr-10 hidden lg:block">
              <h1 className="mb-0 text-base font-semibold text-white">
                Hello!{" "}
                <span className="pl-1">
                  {authentication && authentication.data
                    ? authentication.data.user.name
                    : "Enthusiast"}
                </span>
              </h1>
              {authentication && authentication.data ? (
                <div className="flex items-center">
                  <Link href="/profile">
                    <a className="normal-transition text-xs font-medium uppercase text-white hover:text-purple-800">
                      Profile
                    </a>
                  </Link>
                  <span className="mx-1 text-xs uppercase">OR</span>
                  <div
                    onClick={() => {
                      signOut({ redirect: false });
                      router.replace("/login");
                    }}
                    className="normal-transition cursor-pointer text-xs font-medium uppercase text-white hover:text-purple-800"
                  >
                    Logout
                  </div>
                </div>
              ) : (
                <div className="flex items-center">
                  <Link href="/login">
                    <a className="normal-transition text-xs font-medium uppercase text-white hover:text-purple-800">
                      Log In
                    </a>
                  </Link>
                  <span className="mx-1 text-xs uppercase">OR</span>
                  <Link href="/registration">
                    <a className="normal-transition text-xs font-medium uppercase text-white hover:text-purple-800">
                      Register
                    </a>
                  </Link>
                </div>
              )}
            </div>
            <div
              className="relative w-7 cursor-pointer"
              onClick={() => setCartOpen(true)}
            >
              <span className="absolute -top-1 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-purple-800 text-xs font-semibold text-white">
                {cart?.length}
              </span>
              <i className="bi bi-bag text-3xl"></i>
            </div>
            <div
              onClick={() => setNavOpen(!navOpen)}
              className="normal-transition flex h-12 w-12 cursor-pointer items-center justify-center lg:hidden"
            >
              {navOpen ? (
                <i className="bi bi-x-lg normal-transition text-3xl"></i>
              ) : (
                <i className="bi bi-list normal-transition text-3xl"></i>
              )}
            </div>
          </div>
        </div>
        <nav
          className={`flex items-center justify-center ${
            isMobileHeight && stickyNav
              ? "absolute left-0 top-0 right-0 bg-gradient-to-r from-purple-800 to-purple-300"
              : !isMobileHeight && stickyNav
              ? "animate__animated animate__fadeInDown fixed left-0 right-0 top-0 z-20 w-screen bg-gradient-to-r from-purple-800 to-purple-300 py-3 shadow-xl"
              : "mt-3 "
          } text-white`}
        >
          {navOpen && (
            <i
              onClick={() => setNavOpen(!navOpen)}
              className="bi bi-x-lg animate__animated animate__slideInLeft normal-transition absolute top-0 right-0 z-20 bg-purple-800 p-3 text-3xl"
            ></i>
          )}
          <ul
            className={
              isMobileHeight
                ? `${
                    isMobileHeight && navOpen
                      ? "animate__animated animate__slideInLeft container absolute top-0 left-0 bottom-0 z-10 mx-auto flex h-screen w-full list-none flex-col overflow-auto bg-white py-8 text-purple-800 opacity-100 shadow-lg backdrop-blur-lg"
                      : "animate__animated animate__slideInRight absolute top-0 bottom-0 -left-full z-10 bg-white"
                  } mb-0`
                : "mb-0 flex list-none lg:flex-row lg:items-center"
            }
          >
            {categories &&
              categories.map((category) => (
                <li key={category.id} className="group py-2 px-2 lg:py-0">
                  <NavLink
                    className="normal-transition border-b border-transparent py-2 font-medium uppercase text-purple-800 hover:border-white hover:text-purple-500 lg:text-white lg:hover:text-gray-300"
                    href={`/categories/${category.name.toLowerCase()}`}
                  >
                    <p className="mb-0">{category.name}</p>
                  </NavLink>
                  {category.subCategories.length ? (
                    <div className="hidden group-hover:block lg:absolute lg:left-0 lg:right-0 lg:z-40">
                      <div className="container mx-auto">
                        <div className=";g:mx-48 grid grid-cols-1 gap-4 bg-white px-1 py-5 lg:grid-cols-6 lg:px-8">
                          {category.subCategories.map((subCategory) => (
                            <Category
                              key={subCategory.name + subCategory.id}
                              category={category}
                              subCategory={subCategory}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </li>
              ))}

            {stickyNav && (
              <div
                className="relative w-7 cursor-pointer"
                onClick={() => setCartOpen(true)}
              >
                <span className="absolute -top-1 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-purple-800 text-xs font-semibold text-white">
                  {cart?.length}
                </span>
                <i className="bi bi-bag text-2xl"></i>
              </div>
            )}
          </ul>
        </nav>
      </header>
      {isMobileHeight && (
        <div style={{ height: headerHeight.current?.offsetHeight }} />
      )}
      {cartOpen && (
        <div className="fixed inset-0 z-20 backdrop-blur-md">
          <div className="animate__animated animate__fadeInRight absolute right-0 top-0 bottom-0 w-full border border-purple-800  bg-white px-3 py-2 lg:w-96">
            <div className="relative h-full">
              <div
                ref={cartHeaderHeight}
                className="flex items-center justify-between border-b border-purple-500 pb-3"
              >
                <div />
                <h1 className="text-2xl font-semibold">Your Cart</h1>
                <div className="normal-transition flex h-4 w-4 items-center justify-center p-4 text-black hover:bg-purple-800 hover:from-purple-800 hover:text-white">
                  <i
                    className="bi bi-x-lg cursor-pointer"
                    onClick={() => setCartOpen(false)}
                  ></i>
                </div>
              </div>
              <div
                ref={cartPanel}
                className="cartPanel fixed overflow-auto pb-5"
                style={{ height: `calc(100vh - ${cartPanelHeight}px)` }}
              >
                {cart &&
                  cart.map((cartItem, index) => (
                    <div
                      key={cartItem.name.split(" ").join("-") + "-" + index}
                      className="my-3 flex rounded-lg border px-3 py-3 shadow-md shadow-purple-300"
                    >
                      <div className="mr-2 flex w-24 items-center justify-center">
                        <Image
                          className="ml-auto"
                          src={cartItem.images[0]}
                          height={80}
                          width={80}
                          alt={cartItem.name}
                        />
                      </div>
                      <div className="flex flex-col justify-between">
                        <div className="flex items-start justify-between">
                          <h1 className="mr-2 text-left text-sm line-clamp-2">
                            {cartItem.name}
                          </h1>
                          <i
                            onClick={() => removeItem(cartItem)}
                            className="bi bi-x-lg normal-transition cursor-pointer px-1 py-0 hover:bg-purple-700 hover:text-white"
                          ></i>
                        </div>
                        <div className="mb-0 flex items-center justify-between">
                          <div className="flex items-center">
                            <i
                              className="bi bi-dash normal-transition mr-1 cursor-pointer border border-purple-300 px-1 hover:border-purple-500 active:bg-purple-500 active:text-white"
                              onClick={() =>
                                cartItem.quantity >= 2 &&
                                decreaseQuantity(cartItem)
                              }
                            ></i>
                            <span className="mx-2 w-3 text-center text-sm text-purple-700">
                              {cartItem.quantity}
                            </span>
                            <i
                              className="bi bi-plus normal-transition ml-1 cursor-pointer border border-purple-300 px-1 hover:border-purple-500 active:bg-purple-500 active:text-white"
                              onClick={() => increaseQuantity(cartItem)}
                            ></i>
                          </div>
                          <p className="mb-0 text-base font-bold text-purple-700">
                            BDT {cartItem.price * cartItem.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              <div
                ref={cartFooterHeight}
                className="absolute bottom-0 left-0 right-0 border-t border-purple-500 bg-white px-2 py-4"
              >
                {cart && cart.length ? (
                  <div>
                    <div className="flex items-center justify-between">
                      <h1 className="text-base font-semibold">
                        Total Quantity
                      </h1>
                      <p className="text-base font-bold text-purple-700">
                        {cart &&
                          cart.reduce((acc, item) => acc + item.quantity, 0)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <h1 className="text-base font-semibold">Total Amount</h1>
                      <p className="text-base font-bold text-purple-700">
                        <span className="mr-2">BDT</span>
                        {cart &&
                          cart.reduce(
                            (acc, item) => acc + item.price * item.quantity,
                            0
                          )}
                      </p>
                    </div>
                    <Link href="/checkout">
                      <a className="">
                        <Button type="primary" className="w-full" size="large">
                          Checkout
                        </Button>
                      </a>
                    </Link>
                  </div>
                ) : (
                  <Button
                    type="primary"
                    disabled
                    className="w-full text-white"
                    size="large"
                  >
                    Your cart is empty
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nav;
