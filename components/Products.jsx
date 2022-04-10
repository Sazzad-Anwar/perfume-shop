import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { mutate } from "swr";
import { useContext, useRef, useState } from "react";
import axios from "axios";
import Product from "./Product";
import { useGlobalContext } from "../Context/GlobalContext";
import { ADD_TO_CART } from "../Context/Constants/CartConstants";
import { v4 as uuidv4 } from "uuid";

const Products = ({ heading, delay, data, className }) => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const { cartDispatch } = useGlobalContext();

  const addToCartHandler = async (product) => {
    product.quantity = 1;
    product.id = uuidv4();
    cartDispatch({ type: ADD_TO_CART, payload: product });
    await axios.post("/carts", product);
  };

  return (
    <section className={className + " my-16"}>
      <div>
        <h1 className='after:content[""] relative mb-5 text-center text-xl font-semibold after:absolute after:-bottom-2 after:left-1/2 after:h-1 after:w-10 after:-translate-x-1/2 after:bg-purple-800 lg:text-3xl'>
          {heading}
        </h1>
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={30}
          autoplay={{
            delay,
            disableOnInteraction: true,
          }}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = navigationPrevRef.current;
            swiper.params.navigation.nextEl = navigationNextRef.current;
          }}
          pagination={{ clickable: true }}
          loop={true}
          centeredSlides={true}
          breakpoints={{
            640: {
              width: 640,
              slidesPerView: 1,
            },
            768: {
              width: 768,
              slidesPerView: 2,
            },
            992: {
              width: 992,
              slidesPerView: 4,
            },
            1400: {
              width: 1400,
              slidesPerView: 6,
            },
          }}
          className="mySwiper mx-auto w-full"
        >
          {data &&
            data.map((product) => (
              <SwiperSlide
                key={product.name + product.id}
                className="flex items-center justify-center"
              >
                <Product
                  product={product}
                  addToCartHandler={addToCartHandler}
                />
              </SwiperSlide>
            ))}
          <div
            ref={navigationPrevRef}
            className="normal-transition absolute top-1/2 left-0 z-10 flex -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-transparent px-3 py-2 text-purple-700 hover:bg-purple-500  hover:text-white"
          >
            <i className="bi bi-chevron-compact-left mb-0 pb-0"></i>
          </div>
          <div
            ref={navigationNextRef}
            className="normal-transition absolute top-1/2 right-0 z-10 flex -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-transparent px-3 py-2 text-purple-700 hover:bg-purple-500  hover:text-white"
          >
            <i className="bi bi-chevron-compact-right"></i>
          </div>
        </Swiper>
      </div>
    </section>
  );
};

export default Products;
