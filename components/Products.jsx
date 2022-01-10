import Image from 'next/image';
import SwiperCore, { Autoplay, EffectFade, Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import fetcher from "./Fetcher"
import useSWR from 'swr'

const Products = ({ heading, delay }) => {

    const { data, error } = useSWR('/api/v1/products', fetcher);

    return (
        <section className='my-16'>
            <div className="container mx-auto">
                <h1 className='text-xl lg:text-3xl font-semibold text-center mb-5 relative after:content[""] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:h-1 after:w-10 after:bg-purple-800'>{heading}</h1>
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={30}
                    autoplay={{
                        delay,
                        "disableOnInteraction": false
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

                    {data?.data && data.data.map(product => (
                        <SwiperSlide key={product.name + product.id} className="flex justify-center items-center">
                            <div className='relative h-80 w-52 bg-purple-100 border-purple-800'>
                                <div className="flex justify-center items-center px-3 py-3">
                                    <Image src={product.images[0]} layout='intrinsic' height={150} width={150} alt={product.name} />
                                </div>
                                <div className="text-center px-3 pt-3">
                                    <div className="flex items-center justify-center">
                                        {product.rating && [...Array(product.rating)].map((_, i) => (
                                            <i key={'star-fill-' + product.id + i} className="bi bi-star-fill text-purple-800"></i>
                                        ))}
                                        {
                                            product.rating && [...Array(5 - product.rating)].map((_, i) => (
                                                <i key={'star-blank' + product.id + i} className="bi bi-star text-purple-800"></i>
                                            ))
                                        }
                                    </div>
                                    <h4 className='text-base line-clamp-2'>Coffee Bean Caffeine Eye Cream</h4>
                                    <p className='text-base font-bold text-purple-800'>$ 16.00</p>
                                </div>
                                <button className='flex justify-center items-center w-full hover:bg-purple-600 text-white normal-transition bg-purple-800 px-4 py-2 absolute bottom-0'>
                                    Add to basket
                                </button>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    )
}

export default Products
