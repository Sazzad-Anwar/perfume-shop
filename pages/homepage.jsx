import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { HiOutlineShoppingBag, HiOutlineArrowNarrowRight, HiOutlineMail } from 'react-icons/hi'
import { BsPersonCircle, BsPlus } from 'react-icons/bs'
import { FiSearch } from 'react-icons/fi'
import { BsArrowRight, BsChevronRight, BsTelephone } from 'react-icons/bs'
import { AiOutlineWhatsApp, AiOutlineInstagram } from 'react-icons/ai'
import { FaFacebookF } from 'react-icons/fa'
import { Swiper, SwiperSlide } from "swiper/react";
import {
    Autoplay,
    EffectFade,
    EffectCoverflow,
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
} from "swiper";
import { AiOutlineMan, AiOutlineWoman } from 'react-icons/ai'
import Image from 'next/image';
import Link from 'next/link';

export default function Index() {
    const [isScrolledDown, setIsScrolledDown] = useState(true)

    const heroSlider = [
        {
            img: 'https://admin.protul.co/images/Essencer/Y0996460_E05_ZHC.jpeg',
            id: 1,
            caption: {
                title: 'The new ELIXIR',
                subtitle: 'Shop the largest & latest collection of Essencer, Bangladesh.'
            }
        },
        {
            img: 'https://admin.protul.co/images/Essencer/Attar_Web_Banner_1_zoheb-middle13257289-063b-4590-89ef-2ead46895a73.jpeg',
            id: 2,
            caption: {
                title: `TOM FORD's Best Sellers`,
                subtitle: `Exotic Rose Wood and Cardamom, blended with exuberant Chinese Pepper, envelop the wearer in warmth.`
            }
        },
        {
            img: "https://admin.protul.co/images/Essencer/5ae6f4e5186042fce09c343500cc9385.jpeg",
            id: 3,
            caption: {
                title: `The Prestige Collection`,
                subtitle: `Discover the range of six opulent perfumes, exploring precious notes of Bergamot, Rose de Mai, Patchouli, Cedarwood in some of our most Exotic perfumes.`
            }
        },
        {
            img: 'https://admin.protul.co/images/Essencer/6MjUObwg.jpeg',
            id: 4,
            caption: {
                title: `A New Fragrance by TOM FORD`,
                subtitle: `IT MAKES ONE FEEL DIFFERENT, BEAUTIFUL AND DESIRED`
            }
        },
        {
            img: 'https://admin.protul.co/images/Essencer/tomford_bplp_ombreleather_aug21.webp',
            id: 5,
            caption: {
                title: `A New Fragrance by TOM FORD`,
                subtitle: `IT MAKES ONE FEEL DIFFERENT, BEAUTIFUL AND DESIRED`
            }
        },
        {
            img: 'https://admin.protul.co/images/Essencer/niche-fragrances.jpeg',
            id: 6,
            caption: {
                title: `The Prestige Collection`,
                subtitle: `Discover the range of six opulent perfumes, exploring precious notes of Bergamot, Rose de Mai, Patchouli, Cedarwood in some of our most Exotic perfumes.`
            }
        }
    ]

    const menMenu = [
        {
            link: '/',
            name: `Men's Perfume`
        },
        {
            link: '/',
            name: `Top rated`
        },
        {
            link: '/',
            name: `Day`
        },
        {
            link: '/',
            name: `Night`
        },
        {
            link: '/',
            name: `Brand`
        },
        {
            link: '/',
            name: `All`
        },
    ]
    const womenMenu = [
        {
            link: '/',
            name: `Women's Perfume`
        },
        {
            link: '/',
            name: `Top rated`
        },
        {
            link: '/',
            name: `Day`
        },
        {
            link: '/',
            name: `Night`
        },
        {
            link: '/',
            name: `Brand`
        },
        {
            link: '/',
            name: `All`
        },
    ]

    const category = [
        {
            image: 'https://admin.protul.co/images/Essencer/candle-generic-14407a5bd-04eb-493a-a9ef-f7ba85f77622.jpeg',
            name: 'Candles'
        },
        {
            image: 'https://admin.protul.co/images/Essencer/perfume-generic51998e5d-406c-4d6a-8a30-3c78173d1163.jpeg',
            name: 'Perfumes'
        },
        {
            image: 'https://admin.protul.co/images/Essencer/candle-generic-14407a5bd-04eb-493a-a9ef-f7ba85f77622.jpeg',
            name: 'Candles1'
        },
        {
            image: 'https://admin.protul.co/images/Essencer/perfume-generic51998e5d-406c-4d6a-8a30-3c78173d1163.jpeg',
            name: 'Perfumes2'
        }
    ]

    const scent_accord = [
        {
            name: "Floral",
            image: "https://admin.protul.co/images/Essencer/Floral.jpg"
        },
        {
            name: "Aromatic",
            image: "https://admin.protul.co/images/Essencer/Aromatic.jpg"
        },
        {
            name: "White Floral",
            image: "https://admin.protul.co/images/Essencer/White-Flower-2.jpg"
        },
        {
            name: "Citrus",
            image: "https://admin.protul.co/images/Essencer/Citrus.jpg"
        },
        {
            name: "Sweet",
            image: "https://admin.protul.co/images/Essencer/Sweet.jpg"
        },
        {
            name: "Soapy",
            image: "https://admin.protul.co/images/Essencer/Soapy.jpg"
        },
        {
            name: "Animalic",
            image: "https://admin.protul.co/images/Essencer/Animalic.jpg"
        },
        {
            name: "Green",
            image: "https://admin.protul.co/images/Essencer/Green.jpg"
        },
        {
            name: 'Warm Spicy',
            image: "https://admin.protul.co/images/Essencer/Warm-Spicy.jpg"
        },
        {
            name: "Woody",
            image: "https://admin.protul.co/images/Essencer/Wood.jpg"
        }
    ]

    const products = [
        {
            name: 'Joop Wolfgang Joop for Men EDT 50ml',
            image: 'https://admin.protul.co/images/Essencer/0.5585852556422466joop.jpg',
            price: 'BDT 800'
        },
        {
            name: 'Dolce & Gabbana Light Blue Forever for Men EDP 100ml',
            image: 'https://admin.protul.co/images/Essencer/Light-Blue-Forever-pour-Homme.jpg',
            price: 'BDT 800'
        },
        {
            name: `Nina Ricci Memoire D'homme for Men EDT 100ml`,
            image: 'https://admin.protul.co/images/Essencer/Memoire-D-homme04eeb86c-436c-46eb-9a17-4e7268dab7e8.jpg',
            price: 'BDT 800'
        },
        {
            name: `Lalique Amethyst for Women EDP 100ml`,
            image: 'https://admin.protul.co/images/Essencer/0.3850490819878549Amethyst-Lalique.jpg',
            price: 'BDT 800'
        },
        {
            name: `Nicolai Incense Oud for Men and Women EDP 30ml`,
            image: 'https://admin.protul.co/images/Essencer/Incense-Oud765fbb76-12ea-468b-a61c-ee158dd63ae5.jpg',
            price: 'BDT 800'
        },
        {
            name: `Saint Laurent L'Homme for Men EDT 100ml`,
            image: 'https://admin.protul.co/images/Essencer/0.3243514840602262L-Homme-Yves-Saint-Laurent.jpg',
            price: 'BDT 800'
        },
        {
            name: `Bvlgari Man Extreme for Men EDT 100ml`,
            image: 'https://admin.protul.co/images/Essencer/man-extreme.jpg',
            price: 'BDT 800'
        },
        {
            name: `Orto Parisi Megamare for Men and Women Parfum 50ml`,
            image: 'https://admin.protul.co/images/Essencer/0.7878221693155869ORTO-PARISI-MEGAMARE.jpg',
            price: 'BDT 800'
        },
    ]

    useEffect(() => {

        const handleScroll = () => {
            const isTop = window.scrollY < 50
            if (isTop !== isScrolledDown) {
                setIsScrolledDown(isTop)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [isScrolledDown])

    return (
        <>
            <Head>
                <title>New HomePage</title>

            </Head>
            <div className='relative overflow-x-hidden'>
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    centeredSlides={true}
                    navigation={false}
                    autoplay={{
                        delay: 3400,
                        disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                    // onSwiper={(swiper) => console.log(swiper)}
                    // onSlideChange={() => console.log('slide change')}
                    className="mySwiper relative h-screen w-screen"
                >
                    {heroSlider.map(slider => (
                        <SwiperSlide key={slider.id}>
                            {({ isActive }) => (
                                <>
                                    <Image
                                        layout='fill'
                                        objectFit='cover'
                                        className="absolute inset-0 h-full w-full"
                                        src={slider.img}
                                        alt="hero"
                                    />
                                    {isActive &&
                                        <div className='absolute bottom-10 left-0 right-0 container mx-auto animate__animated animate__fadeInUp'>
                                            <h1 className='font-medium mb-2 text-4xl text-white'>{slider.caption.title}</h1>
                                            <p className='font-semibold text-base text-white'>{slider.caption.subtitle}</p>
                                        </div>
                                    }
                                </>
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>
                <header className='py-6 fixed w-full top-0 bg-transparent bg-opacity-90 backdrop-brightness-50 backdrop-blur-3xl z-10'>
                    <nav className='container mx-auto grid grid-cols-2 lg:grid-cols-3'>
                        <div className='hidden lg:block' />
                        <div className='text-center overflow-hidden'>
                            {isScrolledDown ?
                                <h1 className='animate__animated animate__fadeInUp text-3xl text-white mb-0'>ESSENCER</h1>
                                :
                                <div className='animate__animated animate__fadeInUp w-full rounded-full p-2 flex justify-between items-center bg-white'>
                                    <input type="text" className='focus:outline-none text-gray-600 text-base mx-4 w-full' placeholder='Type any keywords' />
                                    <div className='active:scale-90 normal-transition cursor-pointer px-2 flex justify-center items-center py-2 bg-black rounded-full'>
                                        <FiSearch size={15} className="text-white mb-0" />
                                    </div>
                                </div>
                            }
                        </div>
                        <div className='flex items-center justify-end'>
                            <div className='cursor-pointer px-2 py-2 mr-3 backdrop-blur-md rounded-full group hover:bg-gray-900 flex justify-center items-center normal-transition'>
                                <HiOutlineShoppingBag className=' text-white group-hover:text-white' size={25} />
                            </div>
                            <Link href="/login">
                                <a className='border rounded-full flex justify-between items-center px-3 py-2 hover:bg-gray-900 normal-transition hover:border-gray-900'>
                                    <p className='text-sm uppercase mb-0 mr-2 text-white'>SIGN IN</p>
                                    <BsPersonCircle className='text-white' size={20} />
                                </a>
                            </Link>
                        </div>
                    </nav>
                </header>
                {isScrolledDown &&
                    <div className='flex flex-col bg-opacity-90 backdrop-brightness-50 justify-center backdrop-blur-3xl items-center fixed top-[88px] w-auto left-1/2 -translate-x-1/2  z-20 rounded-bl-3xl rounded-br-3xl py-2 menu'>
                        <div className='menuTypes items-center flex pb-2'>
                            <AiOutlineMan className='text-white cursor-pointer mx-10' size={30} />
                            <AiOutlineWoman className='text-white cursor-pointer mx-10 z-10' size={30} />
                        </div>
                        <div>
                            <div className='animate__animated animate__fadeIn justify-center items-center hidden w-screen group-hover:flex'>
                                <ul className='flex justify-center flex-col items-center'>
                                    {menMenu.map(menu => (
                                        <li key={menu.name} className='mb-5'>
                                            <Link href={menu.link}>
                                                <a className='text-lg font-thin text-white hover:underline normal-transition'>{menu.name}</a>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className='hidden group-hover:flex w-screen justify-center items-center'>
                                <ul className='flex justify-center flex-col items-center'>
                                    {womenMenu.map(menu => (
                                        <li key={menu.name} className='mb-5'>
                                            <Link href={menu.link}>
                                                <a className='text-lg font-thin text-white hover:underline normal-transition'>{menu.name}</a>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                }

            </div>
            <main className='my-20 container mx-auto'>
                <div className='flex flex-col lg:flex-row justify-between items-center'>
                    <div>
                        <h1 className='text-2xl text-center lg:text-left lg:text-3xl xl:text-4xl font-semibold mb-2'>Category</h1>
                        <h3 className='text-gray-600 text-xl'>Search by your preference</h3>
                    </div>
                    <div>
                        <Link href="/">
                            <a className='flex items-center rounded-full border py-2 text-gray-600 hover:bg-gray-200 normal-transition px-5'>
                                <span className='text-base mr-4'>
                                    Load more
                                </span>
                                <HiOutlineArrowNarrowRight size={20} />
                            </a>
                        </Link>
                    </div>
                </div>
                <section className='mt-7 overflow-x-hidden'>
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={20}
                        centeredSlides={true}
                        navigation={false}
                        loop={true}
                        effect={"slide"}
                        autoplay={{
                            delay: 2400,
                            disableOnInteraction: false,
                        }}
                        pagination={{ clickable: true }}
                        scrollbar={{ draggable: true }}
                        // onSwiper={(swiper) => console.log(swiper)}
                        // onSlideChange={() => console.log('slide change')}
                        breakpoints={{
                            768: {
                                width: 768,
                                slidesPerView: 1
                            },
                            991: {
                                width: 991,
                                slidesPerView: 2
                            },
                            1024: {
                                width: 1024,
                                slidesPerView: 3
                            },
                            1200: {
                                width: 1200,
                                slidesPerView: 4
                            }
                        }}
                        className="mySwiper relative"
                    >
                        {category.map(slider => (
                            <SwiperSlide key={slider.name} className="relative h-[345px]">
                                <Image
                                    layout='intrinsic'
                                    width={568}
                                    height={345}
                                    objectFit='cover'
                                    className="absolute inset-0 h-full w-full rounded-xl"
                                    src={slider.image}
                                    alt="hero"
                                />
                                <div className='animate__animated animate__fadeInUp'>
                                    <p className='font-semibold text-base text-center text-gray-500 mt-5'>{slider.name}</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </section>

                <section className='py-10'>
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-7">
                        <div className="col-span-3 rounded-2xl overflow-hidden relative w-full h-[450px]">
                            <Image
                                src={"https://admin.protul.co/images/Essencer/Thumbnail.jpeg"}
                                layout='fill'
                                className='absolute inset-0 h-full w-full rounded-xl'
                                objectFit='cover'
                                alt="banner"
                            />
                            <div className='absolute inset-0 backdrop-brightness-50' />
                            <div className='absolute inset-0 p-5 lg:p-6 xl:p-7 2xl:p-10'>
                                <h1 className='text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-white'>The Largest Perfumery of Bangladesh</h1>
                                <p className='text-base lg:text-lg text-white'>
                                    Indulge yourself with our collection of both exotic & affordable perfumes. We have the largest range of fragrances in our arsenal. Can&apos;t find your favorite perfume? Pre-order and get delivery within 15 days!
                                </p>
                            </div>
                            <div className='absolute bottom-10 right-5 lg:right-6 xl:right-7 2xl:right-10'>
                                <Link href="/">
                                    <a className='text-white text-lg flex place-items-center'>
                                        <span className='mr-3'>View all perfume</span>
                                        <div className='p-2 bg-white rounded-full flex justify-center items-center'>
                                            <BsArrowRight color='black' size={20} />
                                        </div>
                                    </a>
                                </Link>
                            </div>
                        </div>
                        <div className='col-span-2'>
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                                <div className='h-full w-full overflow-hidden border rounded-xl'>
                                    <div className='relative h-[140px]'>
                                        <Image
                                            src={"https://admin.protul.co/images/Essencer/Y0996374_C400100117_E01_ZHC.jpeg"}
                                            layout='fill'
                                            className='absolute inset-0'
                                            objectFit='cover'
                                            alt='product'
                                        />
                                    </div>
                                    <div className='h-1/3 flex justify-between items-center px-4 py-2'>
                                        <div>
                                            <h1 className='text-xl font-semibold pb-0 mb-0 text-gray-500'>Gift Sets</h1>
                                            <p className='text-base font-medium text-gray-400 my-0'>
                                                1 items
                                            </p>
                                        </div>
                                        <div className='p-2 bg-white rounded-full border shadow-sm flex justify-center items-center'>
                                            <BsChevronRight color='black' size={15} />
                                        </div>
                                    </div>
                                </div>
                                <div className='h-full w-full overflow-hidden border rounded-xl'>
                                    <div className='relative h-[140px]'>
                                        <Image
                                            src={"https://admin.protul.co/images/Essencer/Y0996374_C400100117_E01_ZHC.jpeg"}
                                            layout='fill'
                                            className='absolute inset-0'
                                            objectFit='cover'
                                            alt='product'
                                        />
                                    </div>
                                    <div className='h-1/3 flex justify-between items-center px-4 py-2'>
                                        <div>
                                            <h1 className='text-xl font-semibold pb-0 mb-0 text-gray-500'>Gift Sets</h1>
                                            <p className='text-base font-medium text-gray-400 my-0'>
                                                1 items
                                            </p>
                                        </div>
                                        <div className='p-2 bg-white rounded-full border shadow-sm flex justify-center items-center'>
                                            <BsChevronRight color='black' size={15} />
                                        </div>
                                    </div>
                                </div>
                                <div className='h-full w-full overflow-hidden border rounded-xl'>
                                    <div className='relative h-[140px]'>
                                        <Image
                                            src={"https://admin.protul.co/images/Essencer/Y0996374_C400100117_E01_ZHC.jpeg"}
                                            layout='fill'
                                            className='absolute inset-0'
                                            objectFit='cover'
                                            alt='product'
                                        />
                                    </div>
                                    <div className='h-1/3 flex justify-between items-center px-4 py-2'>
                                        <div>
                                            <h1 className='text-xl font-semibold pb-0 mb-0 text-gray-500'>Gift Sets</h1>
                                            <p className='text-base font-medium text-gray-400 my-0'>
                                                1 items
                                            </p>
                                        </div>
                                        <div className='p-2 bg-white rounded-full border shadow-sm flex justify-center items-center'>
                                            <BsChevronRight color='black' size={15} />
                                        </div>
                                    </div>
                                </div>
                                <div className='h-full w-full overflow-hidden border rounded-xl'>
                                    <div className='relative h-[140px]'>
                                        <Image
                                            src={"https://admin.protul.co/images/Essencer/Y0996374_C400100117_E01_ZHC.jpeg"}
                                            layout='fill'
                                            className='absolute inset-0'
                                            objectFit='cover'
                                            alt='product'
                                        />
                                    </div>
                                    <div className='h-1/3 flex justify-between items-center px-4 py-2'>
                                        <div>
                                            <h1 className='text-xl font-semibold pb-0 mb-0 text-gray-500'>Gift Sets</h1>
                                            <p className='text-base font-medium text-gray-400 my-0'>
                                                1 items
                                            </p>
                                        </div>
                                        <div className='p-2 bg-white rounded-full border shadow-sm flex justify-center items-center'>
                                            <BsChevronRight color='black' size={15} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-10">
                    <div className='container mx-auto'>
                        <div className='flex flex-col lg:flex-row justify-between items-center'>
                            <div>
                                <h1 className='text-2xl text-center lg:text-3xl xl:text-4xl font-semibold mb-2'>Scent Accords</h1>
                                <h3 className='text-gray-600 text-base lg:text-xl'>Discover your signature essence</h3>
                            </div>
                            <div>
                                <Link href="/">
                                    <a className='flex items-center rounded-full border py-2 text-gray-600 hover:bg-gray-200 normal-transition px-5'>
                                        <span className='text-base mr-4'>
                                            Load more
                                        </span>
                                        <HiOutlineArrowNarrowRight size={20} />
                                    </a>
                                </Link>
                            </div>
                        </div>
                        <div className='py-5 overflow-x-hidden'>
                            <Swiper
                                modules={[Autoplay]}
                                spaceBetween={20}
                                centeredSlides={true}
                                navigation={false}
                                loop={true}
                                effect={"slide"}
                                autoplay={{
                                    delay: 2400,
                                    disableOnInteraction: false,
                                }}
                                breakpoints={{
                                    768: {
                                        width: 768,
                                        slidesPerView: 1
                                    },
                                    991: {
                                        width: 991,
                                        slidesPerView: 2
                                    },
                                    1024: {
                                        width: 1024,
                                        slidesPerView: 4
                                    },
                                    1200: {
                                        width: 1200,
                                        slidesPerView: 5
                                    }
                                }}
                                pagination={{ clickable: true }}
                                scrollbar={{ draggable: true }}
                                // onSwiper={(swiper) => console.log(swiper)}
                                // onSlideChange={() => console.log('slide change')}
                                className="mySwiper relative"
                            >
                                {scent_accord.map(slider => (
                                    <SwiperSlide key={slider.name} className="group relative rounded-2xl border overflow-hidden">
                                        <Link href="/">
                                            <a>
                                                <div className='relative h-[284px] w-full flex justify-center items-center'>
                                                    <Image
                                                        layout='fill'
                                                        objectFit='cover'
                                                        className="absolute inset-0 h-full w-full "
                                                        src={slider.image}
                                                        alt="hero"
                                                    />
                                                </div>
                                                <div className='absolute inset-0 w-full h-full z-10 bg-black opacity-0 group-hover:opacity-10 normal-transition' />
                                                <div className='text-center mt-3'>
                                                    <p className='font-semibold text-base text-center text-gray-500 mt-5'>{slider.name}</p>
                                                </div>
                                            </a>
                                        </Link>

                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </section>

                <section className="py-10">
                    <div className='container mx-auto'>
                        <div className='flex flex-col lg:flex-row justify-between items-center'>
                            <div>
                                <h1 className='text-xl lg:text-3xl xl:text-4xl font-semibold mb-2'>Popular Fragrance</h1>
                                <h3 className='text-gray-600 text-xl'>Genuine perfumes rated by genuine people</h3>
                                <div className='flex items-center'>

                                </div>
                            </div>
                            <div>
                                <Link href="/">
                                    <a className='flex items-center rounded-full border py-2 text-gray-600 hover:bg-gray-200 normal-transition px-5'>
                                        <span className='text-base mr-4'>
                                            Load more
                                        </span>
                                        <HiOutlineArrowNarrowRight size={20} />
                                    </a>
                                </Link>
                            </div>
                        </div>
                        <div className='py-5 overflow-x-hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-9'>
                            {products.map(product => (
                                <div key={product.name} className="group relative rounded-2xl overflow-hidden pb-5">
                                    <Link href="/">
                                        <a>
                                            <div className='relative h-[254px] w-full flex justify-center items-center'>
                                                <Image
                                                    layout='fill'
                                                    objectFit='contain'
                                                    className="absolute inset-0 h-full w-auto "
                                                    src={product.image}
                                                    alt="hero"
                                                />
                                            </div>
                                            <div className='text-center mt-3'>
                                                <p className='font-semibold text-base text-center text-gray-500 mt-5'>{product.name}</p>
                                                <div className='flex justify-center items-center'>
                                                    <div className='group-hover:shadow-lg border border-transparent  group-hover:border group-hover:border-gray-100 group-hover:rounded-full flex items-center overflow-hidden'>
                                                        <p className='font-semibold text-base text-center py-1 px-3 text-black mb-0'>{product.price}</p>
                                                        <button className='hidden group-hover:flex animate__animated animate__fadeInRight group-hover:visible normal-transition rounded-full invisible bg-gray-100 text-base text-black ml-3  items-center py-1 px-3'>Add to bag <BsPlus /> </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </Link>

                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <footer className='bg-black'>
                <div className='container mx-auto'>
                    <div className='grid grid-cols-1 lg:grid-cols-4 pt-[50px] pb-10'>
                        <ul>
                            <li className='flex items-center group mb-5'>
                                <BsTelephone color='#fff' size={18} />
                                <a href="callTo:123456789" className='text-gray-500 text-base group-hover:text-white group-hover:pl-2 normal-transition ml-3'>Phone</a>
                            </li>
                            <li className='flex items-center group mb-5'>
                                <AiOutlineWhatsApp color='#fff' size={18} />
                                <a href="callTo:123456789" className='text-gray-500 text-base group-hover:text-white group-hover:pl-2 normal-transition ml-3'>WhatsApp</a>
                            </li>
                            <li className='flex items-center group mb-5'>
                                <FaFacebookF color='#fff' size={18} />
                                <a href="callTo:123456789" className='text-gray-500 text-base group-hover:text-white group-hover:pl-2 normal-transition ml-3'>Facebook</a>
                            </li>
                            <li className='flex items-center group mb-5'>
                                <AiOutlineInstagram color='#fff' size={18} />
                                <a href="callTo:123456789" className='text-gray-500 text-base group-hover:text-white group-hover:pl-2 normal-transition ml-3'>Instagram</a>
                            </li>
                            <li className='flex items-center group mb-5'>
                                <HiOutlineMail color='#fff' size={18} />
                                <a href="callTo:123456789" className='text-gray-500 text-base group-hover:text-white group-hover:pl-2 normal-transition ml-3'>Instagram</a>
                            </li>
                        </ul>

                        <ul>
                            <li className='mb-5 group'>
                                <p className='text-white text-base font-semibold ml-3'>ABOUT</p>
                            </li>
                            <li className='mb-5 group'>
                                <Link href="/">
                                    <a className='text-gray-500 text-base group-hover:text-white group-hover:pl-2 normal-transition ml-3'>
                                        About ESSENCER
                                    </a>
                                </Link>
                            </li>
                            <li className='mb-5 group'>
                                <Link href="/">
                                    <a className='text-gray-500 text-base group-hover:text-white group-hover:pl-2 normal-transition ml-3'>
                                        Authenticity
                                    </a>
                                </Link>
                            </li>
                            <li className='mb-5 group'>
                                <Link href="/">
                                    <a className='text-gray-500 text-base group-hover:text-white group-hover:pl-2 normal-transition ml-3'>
                                        Ethical Sourcing
                                    </a>
                                </Link>
                            </li>
                            <li className='mb-5 group'>
                                <Link href="/">
                                    <a className='text-gray-500 text-base group-hover:text-white group-hover:pl-2 normal-transition ml-3'>
                                        Become an Affiliate
                                    </a>
                                </Link>
                            </li>
                        </ul>

                        <ul>
                            <li className='mb-5 group'>
                                <p className='text-white text-base font-semibold ml-3'>COMMUNITY</p>
                            </li>
                            <li className='mb-5 group'>
                                <Link href="/">
                                    <a className='text-gray-500 text-base group-hover:text-white group-hover:pl-2 normal-transition ml-3'>
                                        FAQ
                                    </a>
                                </Link>
                            </li>
                            <li className='mb-5 group'>
                                <Link href="/">
                                    <a className='text-gray-500 text-base group-hover:text-white group-hover:pl-2 normal-transition ml-3'>
                                        Accessibility
                                    </a>
                                </Link>
                            </li>
                            <li className='mb-5 group'>
                                <Link href="/">
                                    <a className='text-gray-500 text-base group-hover:text-white group-hover:pl-2 normal-transition ml-3'>
                                        ESSENCER Associates
                                    </a>
                                </Link>
                            </li>
                            <li className='mb-5 group'>
                                <Link href="/">
                                    <a className='text-gray-500 text-base group-hover:text-white group-hover:pl-2 normal-transition ml-3'>
                                        Gift Cards
                                    </a>
                                </Link>
                            </li>
                        </ul>

                        <ul>
                            <li className='mb-5 group'>
                                <p className='text-white text-base font-semibold ml-3'>CUSTOMER SERVICE</p>
                            </li>
                            <li className='mb-5 group'>
                                <Link href="/">
                                    <a className='text-gray-500 text-base group-hover:text-white group-hover:pl-2 normal-transition ml-3'>
                                        Order Tracking
                                    </a>
                                </Link>
                            </li>
                            <li className='mb-5 group'>
                                <Link href="/">
                                    <a className='text-gray-500 text-base group-hover:text-white group-hover:pl-2 normal-transition ml-3'>
                                        Delivery & Returns
                                    </a>
                                </Link>
                            </li>
                            <li className='mb-5 group'>
                                <Link href="/">
                                    <a className='text-gray-500 text-base group-hover:text-white group-hover:pl-2 normal-transition ml-3'>
                                        Cancellation Options
                                    </a>
                                </Link>
                            </li>
                            <li className='mb-5 group'>
                                <Link href="/">
                                    <a className='text-gray-500 text-base group-hover:text-white group-hover:pl-2 normal-transition ml-3'>
                                        Contact Us
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className='border-t border-gray-800 py-3'>
                        <p className="text-center text-gray-500 text-sm mb-0">
                            © 2022 ESSENCER Bangladesh. All Rights Reserved
                        </p>
                    </div>
                </div>
            </footer>
        </>
    )
}
