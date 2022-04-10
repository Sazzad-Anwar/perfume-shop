import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import Layout from "../../components/Layout";
import Link from "next/link";
import { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import { useGlobalContext } from "../../Context/GlobalContext";
import Rating from "../../components/Rating";
import Products from "../../components/Products";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { ADD_TO_CART } from "../../Context/Constants/CartConstants";
import BreadCrumb from "../../components/BreadCrumb";

export const getServerSideProps = async ({ query }) => {
  const { slug } = query;

  let { data } = await axios.get(
    `/products?name=${slug[0].split("-").join(" ")}`
  );
  let { data: relatedProduct } = await axios.get("/products");

  return {
    props: {
      product: data[0],
      images: data[0].images,
      relatedProduct,
    },
  };
};

const Index = ({ product, images, relatedProduct }) => {
  const { cart, cartDispatch } = useGlobalContext();
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
    setWindowHeight(typeof window !== "undefined" && window.innerHeight);
  }, []);

  let productStock = product.stock > quantity;

  const { data } = useSWR(`/products?name=${slug[0].split("-").join(" ")}`, {
    fallbackData: product,
  });
  let productDetails = data && data;

  let avgRating = parseFloat(
    product.reviews.reduce((acc, item) => acc + item.rating, 0) /
      product.reviews.length
  );

  const addToCartHandler = async (product) => {
    product.quantity = quantity;
    product.id = uuidv4();
    cartDispatch({ type: ADD_TO_CART, payload: product });
    await axios.post("/carts", product);
  };

  return (
    <Layout>
      <Head>
        <title>{productDetails.name}</title>
      </Head>
      <div className="container mx-auto py-5 xl:py-10">
        <BreadCrumb
          breadCrumbs={[
            {
              name: "Home",
              isLink: true,
              link: "/",
            },
            {
              name: productDetails.name,
              isLink: false,
              link: "",
            },
          ]}
        />

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <Image
              className="mx-auto"
              layout="responsive"
              height={440}
              width={440}
              src={productMainImage}
              alt={productDetails.name}
            />
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
                <SwiperSlide
                  key={image + "-" + index}
                  className={`h-14 w-14 cursor-pointer overflow-hidden rounded-full border-2 shadow-md`}
                >
                  <div className="mx-auto w-full">
                    <Image
                      onClick={() => setProductMainImage(image)}
                      height={50}
                      width={50}
                      src={image}
                      alt={image}
                    />
                  </div>
                </SwiperSlide>
              ))}
              <div
                ref={navigationPrevRef}
                className="normal-transition absolute top-1/2 left-0 z-10 flex -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-transparent px-3 py-2 text-purple-700 hover:bg-purple-500 hover:text-white"
              >
                <i className="bi bi-chevron-compact-left mb-0 pb-0"></i>
              </div>
              <div
                ref={navigationNextRef}
                className="normal-transition absolute top-1/2 right-0 z-10 flex -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-transparent px-3 py-2 text-purple-700 hover:bg-purple-500 hover:text-white"
              >
                <i className="bi bi-chevron-compact-right"></i>
              </div>
            </Swiper>
          </div>
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Rating rating={avgRating} size="text-base" />
                <span className="text-sm text-purple-700">
                  ({product.reviews.length})
                </span>
              </div>
              <h2 className="text-sm">
                <i
                  className={`bi mr-2 ${
                    !productStock
                      ? "bi-x-circle-fill text-red-500"
                      : "bi-check-circle-fill text-green-500"
                  }`}
                ></i>
                {!productStock ? "Out of Stock" : "In Stock"}
              </h2>
            </div>
            <h1 className="mb-5 text-xl text-purple-700 line-clamp-2 md:text-2xl lg:text-3xl">
              {product.name}
            </h1>
            <p className="text-base md:text-sm lg:mr-20 lg:text-base xl:mr-40">
              {product.details}
            </p>
            <p className="mt-5 text-xl font-bold">
              Price:{" "}
              <span className="text-3xl text-purple-700">${product.price}</span>
            </p>
            <div className="mt-2">
              <h1 className="text-xl font-semibold text-purple-700">
                Specifications:
              </h1>
              <ul className="ml-5 mt-2 list-none">
                <li className="flex items-center">
                  <i className="bi bi-check-circle-fill mr-2 text-purple-700"></i>
                  <span className="text-base">0.25g</span>
                </li>
                <li className="flex items-center">
                  <i className="bi bi-check-circle-fill mr-2 text-purple-700"></i>
                  <span className="text-base">Smudge free</span>
                </li>
                <li className="flex items-center">
                  <i className="bi bi-check-circle-fill mr-2 text-purple-700"></i>
                  <span className="text-base">Water resistant kajal</span>
                </li>
              </ul>
            </div>
            <div className="mt-5">
              <p className="mb-2 text-base text-purple-600">
                Select a color:{" "}
                <span className="font-semibold text-black">
                  {productColor.name}
                </span>
              </p>
              {product.colors.map((color) => (
                <button
                  onClick={() => setProductColor(color)}
                  key={color.name}
                  className={`mr-2 h-8 w-8 rounded-full ${
                    productColor.name === color.name
                      ? "normal-transition ring-2 ring-purple-700"
                      : ""
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>

            <div className="mt-5">
              <div className="flex items-center">
                <p className="mb-0 mr-2 text-lg font-semibold">Quantity</p>
                <i
                  className="bi bi-dash normal-transition mr-1 cursor-pointer rounded-md border border-purple-300 px-2 py-1 text-xl hover:border-purple-500 active:bg-purple-500 active:text-white"
                  onClick={() => quantity >= 2 && setQuantity(quantity - 1)}
                ></i>
                <span className="mx-2 w-5 text-center text-xl text-purple-700">
                  {quantity}
                </span>
                <i
                  className="bi bi-plus normal-transition ml-1 cursor-pointer rounded-md border border-purple-300 px-2 py-1 text-xl hover:border-purple-500 active:bg-purple-500 active:text-white"
                  onClick={() => productStock && setQuantity(quantity + 1)}
                ></i>
              </div>
              <button
                onClick={() => addToCartHandler(product)}
                className="normal-transition mt-4 rounded-md border border-purple-300 bg-purple-700 py-2 px-11 text-xl text-white hover:bg-white hover:text-purple-700 hover:shadow-md active:bg-purple-700 active:text-white"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="flex items-center">
            <h1
              onClick={() => setShowProductDetails(true)}
              className={`mr-10 cursor-pointer border-b-4 pb-3 text-base font-semibold hover:text-purple-600 lg:text-xl ${
                showProductDetails
                  ? "normal-transition border-purple-600 text-purple-600"
                  : "border-transparent"
              } `}
            >
              Specification
            </h1>
            <h1
              onClick={() => setShowProductDetails(false)}
              className={`mr-10 cursor-pointer border-b-4 pb-3 text-base font-semibold hover:text-purple-600 lg:text-xl ${
                !showProductDetails
                  ? "normal-transition border-purple-600 text-purple-600"
                  : "border-transparent"
              } `}
            >
              Reviews
            </h1>
          </div>
          {showProductDetails && (
            <div className="animate__animated animate__fadeInUp mt-5 w-full">
              <p className="text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                fugiat itaque nostrum, minima recusandae delectus inventore sed
                quod pariatur ipsa accusantium harum at omnis a. Maiores
                nesciunt iusto repellat expedita sapiente blanditiis, optio
                officia numquam doloremque esse modi inventore consequatur illum
                maxime soluta incidunt exercitationem eos facere est tempore
                nihil! Saepe animi commodi quo earum corrupti a ullam recusandae
                tempora atque quos dolores eveniet inventore, autem, qui
                obcaecati minima itaque minus provident culpa sunt officia velit
                alias. Fugit, repudiandae! Modi ullam iusto corporis non facere
                neque aperiam voluptatibus ut, hic tempora perferendis autem
                reprehenderit repellat, dicta necessitatibus voluptatum nam
                ratione.
              </p>
            </div>
          )}

          {!showProductDetails && (
            <div className="animate__animated animate__fadeInUp mt-5 w-full">
              <div className="sticky top-0 mt-4 bg-white">
                <h1 className="text-3xl font-semibold">Customer Reviews</h1>
                <div className="flex items-center">
                  <h3 className="mb-0 mr-2 text-3xl font-bold">{avgRating}</h3>
                  <Rating rating={avgRating} size="text-xl" />
                </div>
                <p className="text-base">
                  Based on {product.reviews.length} reviews
                </p>
              </div>

              <div
                className="mt-5 overflow-auto"
                style={{ height: windowHeight / 2 }}
              >
                {product.reviews.map((review, index) => (
                  <div
                    key={review.name + "-" + review.id + "-" + index}
                    className="mb-10 border-l-4 border-purple-400 p-4 shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-400 text-2xl font-semibold text-white">
                          {review.name.split("")[0]}
                        </div>
                        <div className="ml-3 flex flex-col justify-start">
                          <h1 className="mb-0 text-xl font-semibold text-purple-600">
                            {review.name}
                          </h1>
                          <Rating rating={avgRating} size="text-sm" />
                          <p className="mt-3  text-lg">{review.review}</p>
                        </div>
                      </div>
                      <h4 className="mb-0 text-sm font-semibold text-purple-600">
                        {new Date().toLocaleDateString()}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* related product */}
        <Products
          heading="Related Products"
          delay="4500"
          data={relatedProduct}
        />
      </div>
    </Layout>
  );
};

export default Index;
