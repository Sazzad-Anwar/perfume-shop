import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import Layout from "../../components/Layout";
import Link from "next/link";
import { useContext, useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, } from 'swiper';
import { GlobalContext } from "../../Context/GlobalContext";
import Rating from "../../components/Rating";
import Products from "../../components/Products";
import { useEffect } from "react";

export const getServerSideProps = async ({ query }) => {

    const { slug } = query;

    let { data } = await axios.get(`/products?name=${slug[0].split('-').join(' ')}`);
    let { data: relatedProduct } = await axios.get('/products');

    return {
        props: {
            product: data[0],
            images: data[0].images,
            relatedProduct
        }
    }
}

const Index = ({ product, images, relatedProduct }) => {

    const { cart, addToCart } = useContext(GlobalContext)
    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);
    const router = useRouter();
    let { slug } = router.query;
    const [quantity, setQuantity] = useState(1);
    const [productMainImage, setProductMainImage] = useState(images[0]);
    const [productColor, setProductColor] = useState(product.colors[0]);
    const [showProductDetails, setShowProductDetails] = useState(true);
    const [windowHeight, setWindowHeight] = useState(0);

    useEffect(() => {
        setWindowHeight(typeof window !== 'undefined' && window.innerHeight);
    }, [])

    let productStock = product.stock > quantity;

    const { data } = useSWR(`/products?name=${slug[0].split('-').join(' ')}`, { fallbackData: product });
    let productDetails = data && data;

    let avgRating = parseFloat((product.reviews.reduce((acc, item) => acc + item.rating, 0) / product.reviews.length));

    const addToCartHandler = async (product) => {
        product.quantity = 1;
        addToCart(product)
        mutate(`/carts`, cart, false);
        // await axios.post('/carts', product);
        mutate('/carts')
    }

    return (
        <Layout>
            <Head>
                <title>{productDetails.name}</title>
            </Head>
            <div className="container mx-auto py-5 xl:py-10">
                <div className="flex items-center text-sm">
                    <Link href="/">
                        <a className=" text-gray-500 hover:text-black normal-transition">
                            Home
                        </a>
                    </Link>
                    <i className="bi bi-chevron-compact-right mx-3 text-gray-500"></i>
                    <p className=" text-gray-500 truncate mb-0">{productDetails.name}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
                    <div>
                        <Image className="mx-auto" layout="responsive" height={440} width={440} src={productMainImage} alt={productDetails.name} />
                        <Swiper
                            modules={[Navigation, Autoplay]}
                            spaceBetween={10}
                            autoplay={false}
                            pagination={{ clickable: true }}
                            loop={false}
                            navigation={{
                                prevEl: navigationPrevRef.current,
                                nextEl: navigationNextRef.current,
                            }}
                            onBeforeInit={(swiper) => {
                                swiper.params.navigation.prevEl = navigationPrevRef.current;
                                swiper.params.navigation.nextEl = navigationNextRef.current;
                            }}
                            slidesPerView={6}
                            centeredSlides={true}
                            className="mySwiper mx-auto w-full"
                        >
                            {images.map((image, index) => (
                                <SwiperSlide key={image + '-' + index} className={`rounded-full h-14 w-14 border-2 cursor-pointer overflow-hidden shadow-md`}>
                                    <div className="w-full mx-auto">
                                        <Image onClick={() => setProductMainImage(image)} height={50} width={50} src={image} alt={image} />
                                    </div>
                                </SwiperSlide>
                            ))}
                            <div ref={navigationPrevRef} className="rounded-full absolute top-1/2 left-0 z-10 flex justify-center items-center -translate-y-1/2 px-3 py-2 bg-transparent hover:bg-purple-500 hover:text-white normal-transition text-purple-700 cursor-pointer">
                                <i className="bi bi-chevron-compact-left mb-0 pb-0"></i>
                            </div>
                            <div ref={navigationNextRef} className="rounded-full absolute top-1/2 right-0 z-10 flex justify-center items-center -translate-y-1/2 px-3 py-2 bg-transparent hover:bg-purple-500 hover:text-white normal-transition text-purple-700 cursor-pointer">
                                <i className="bi bi-chevron-compact-right"></i>
                            </div>
                        </Swiper>
                    </div>
                    <div className="lg:col-span-2">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <Rating rating={avgRating} size="text-base" />
                                <span className="text-sm text-purple-700">({product.reviews.length})</span>
                            </div>
                            <h2 className="text-sm"><i className={`bi mr-2 ${!productStock ? 'bi-x-circle-fill text-red-500' : 'bi-check-circle-fill text-green-500'}`}></i>{!productStock ? 'Out of Stock' : 'In Stock'}</h2>
                        </div>
                        <h1 className="text-xl md:text-2xl mb-5 lg:text-3xl text-purple-700 line-clamp-2">{product.name}</h1>
                        <p className="text-base md:text-sm lg:text-base lg:mr-20 xl:mr-40">{product.details}</p>
                        <p className="mt-5 text-xl font-bold">
                            Price: <span className="text-purple-700 text-3xl">${product.price}</span>
                        </p>
                        <div className="mt-2">
                            <h1 className="text-xl font-semibold text-purple-700">Specifications:</h1>
                            <ul className="list-none ml-5 mt-2">
                                <li className="flex items-center">
                                    <i className="bi text-purple-700 bi-check-circle-fill mr-2"></i>
                                    <span className="text-base">0.25g</span>
                                </li>
                                <li className="flex items-center">
                                    <i className="bi text-purple-700 bi-check-circle-fill mr-2"></i>
                                    <span className="text-base">Smudge free</span>
                                </li>
                                <li className="flex items-center">
                                    <i className="bi text-purple-700 bi-check-circle-fill mr-2"></i>
                                    <span className="text-base">Water resistant kajal</span>
                                </li>
                            </ul>
                        </div>
                        <div className="mt-5">
                            <p className="text-base text-purple-600 mb-2">Select a color: <span className="text-black font-semibold">{productColor.name}</span></p>
                            {product.colors.map((color) => (
                                <button onClick={() => setProductColor(color)} key={color.name} className={`h-8 w-8 mr-2 rounded-full ${productColor.name === color.name ? 'ring-2 ring-purple-700 normal-transition' : ''}`} style={{ backgroundColor: color.hex }} />
                            ))}
                        </div>

                        <div className="mt-5">
                            <div className="flex items-center">
                                <p className="text-lg font-semibold mb-0 mr-2">Quantity</p>
                                <i className="bi bi-dash border hover:border-purple-500 px-2 text-xl py-1 rounded-md mr-1 cursor-pointer active:bg-purple-500 active:text-white normal-transition border-purple-300" onClick={() => quantity >= 2 && setQuantity(quantity - 1)}></i>
                                <span className="text-xl mx-2 w-3 text-center text-purple-700">{quantity}</span>
                                <i className="bi bi-plus border ml-1 px-2 text-xl py-1 rounded-md cursor-pointer hover:border-purple-500 active:bg-purple-500 active:text-white normal-transition border-purple-300" onClick={() => productStock && setQuantity(quantity + 1)}></i>

                            </div>
                            <button
                                onClick={() => addToCartHandler(product)}
                                className="border text-xl py-2 px-11 mt-4 rounded-md bg-purple-700 border-purple-300 hover:bg-white hover:shadow-md active:bg-purple-700 hover:text-purple-700 active:text-white normal-transition text-white"
                            >
                                Add To Cart
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-20">
                    <div className="flex items-center">
                        <h1 onClick={() => setShowProductDetails(true)} className={`lg:text-xl cursor-pointer hover:text-purple-600 text-sm font-semibold mr-10 border-b-4 pb-3 ${showProductDetails ? 'border-purple-600 text-purple-600 normal-transition' : 'border-transparent'} `}>Product Specification</h1>
                        <h1 onClick={() => setShowProductDetails(false)} className={`lg:text-xl cursor-pointer hover:text-purple-600 text-sm font-semibold mr-10 border-b-4 pb-3 ${!showProductDetails ? 'border-purple-600 text-purple-600 normal-transition' : 'border-transparent'} `}>Product Reviews</h1>
                    </div>
                    {
                        showProductDetails &&
                        <div className="w-full animate__animated animate__fadeInUp mt-5">
                            <p className="text-base">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae fugiat itaque nostrum, minima recusandae delectus inventore sed quod pariatur ipsa accusantium harum at omnis a. Maiores nesciunt iusto repellat expedita sapiente blanditiis, optio officia numquam doloremque esse modi inventore consequatur illum maxime soluta incidunt exercitationem eos facere est tempore nihil! Saepe animi commodi quo earum corrupti a ullam recusandae tempora atque quos dolores eveniet inventore, autem, qui obcaecati minima itaque minus provident culpa sunt officia velit alias. Fugit, repudiandae! Modi ullam iusto corporis non facere neque aperiam voluptatibus ut, hic tempora perferendis autem reprehenderit repellat, dicta necessitatibus voluptatum nam ratione.
                            </p>
                        </div>
                    }

                    {
                        !showProductDetails &&
                        <div className="w-full animate__animated animate__fadeInUp mt-5">
                            <div className="mt-4 sticky top-0 bg-white">
                                <h1 className="text-3xl font-semibold">Customer Reviews</h1>
                                <div className="flex items-center">
                                    <h3 className="text-3xl font-bold mb-0 mr-2">{avgRating}</h3>
                                    <Rating rating={avgRating} size="text-xl" />
                                </div>
                                <p className="text-base">Based on {product.reviews.length} reviews</p>
                            </div>

                            <div className="mt-5 overflow-auto" style={{ height: windowHeight / 2 }}>
                                {product.reviews.map((review, index) => (
                                    <div key={review.name + '-' + review.id + '-' + index} className="border-l-4 shadow-md border-purple-400 p-4 mb-10">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="h-14 w-14 flex justify-center text-2xl items-center rounded-full bg-purple-400 text-white font-semibold">{review.name.split('')[0]}</div>
                                                <div className="flex flex-col justify-start ml-3">
                                                    <h1 className="text-2xl font-semibold text-purple-600 mb-0">{review.name}</h1>
                                                    <Rating rating={avgRating} size="text-sm" />
                                                </div>
                                            </div>
                                            <h4 className="text-base mb-0 font-semibold text-purple-600">{(new Date()).toLocaleDateString()}</h4>
                                        </div>

                                        <p className="mt-3 text-lg">{review.review}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                </div>



                {/* related product */}
                <Products heading="Related Products" delay="4500" data={relatedProduct} />
            </div>
        </Layout>
    );
};

export default Index;
