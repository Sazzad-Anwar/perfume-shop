import { Autoplay, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { mutate } from 'swr'
import { useContext, useRef, useState } from 'react';
import axios from 'axios';
import Product from './Product';
import { useGlobalContext } from '../Context/GlobalContext';
import { ADD_TO_CART } from '../Context/Constants/CartConstants';
import { v4 as uuidv4 } from 'uuid';

const Products = ({ heading, delay, data, className }) => {
    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);
    const { cartDispatch } = useGlobalContext()

    const addToCartHandler = async (product) => {
        product.quantity = 1;
        product.id = uuidv4();
        cartDispatch({ type: ADD_TO_CART, payload: product });
        await axios.post('/carts', product);
        mutate('/carts')
    }

    return (
        <section className={className + ' my-16'}>
            <div>
                <h1 className='text-xl lg:text-3xl font-semibold text-center mb-5 relative after:content[""] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:h-1 after:w-10 after:bg-purple-800'>{heading}</h1>
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={30}
                    autoplay={{
                        delay,
                        "disableOnInteraction": true
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
                            slidesPerView: 1
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
                        }
                    }}
                    className="mySwiper w-full mx-auto"
                >

                    {data && data.map(product => (
                        <SwiperSlide key={product.name + product.id} className="flex justify-center items-center">
                            <Product product={product} addToCartHandler={addToCartHandler} />
                        </SwiperSlide>
                    ))}
                    <div ref={navigationPrevRef} className="rounded-full absolute top-1/2 left-0 z-10 flex justify-center items-center -translate-y-1/2 px-3 py-2 bg-transparent hover:bg-purple-500 hover:text-white normal-transition text-purple-700  cursor-pointer">
                        <i className="bi bi-chevron-compact-left mb-0 pb-0"></i>
                    </div>
                    <div ref={navigationNextRef} className="rounded-full absolute top-1/2 right-0 z-10 flex justify-center items-center -translate-y-1/2 px-3 py-2 bg-transparent hover:bg-purple-500 hover:text-white normal-transition text-purple-700  cursor-pointer">
                        <i className="bi bi-chevron-compact-right"></i>
                    </div>
                </Swiper>
            </div>
        </section>
    )
}

export default Products
