import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import NavLink from "./NavLink"
import { signOut, useSession } from 'next-auth/react';
import fetcher from "./Fetcher"
import useSWR from 'swr'
import Category from "./Category"

const Nav = () => {

    const authentication = useSession();
    const router = useRouter();
    const [searchOpen, setSearchOpen] = useState(false);
    const searchRef = useRef(null)
    const headerHeight = useRef(null);
    const [navOpen, setNavOpen] = useState(false);
    const [isMobileHeight, setIsMobileHeight] = useState(false);
    const [stickyNav, setStickyNav] = useState(false);

    const { data, error } = useSWR('/api/v1/categories', fetcher);

    console.log(data)

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
            if (window.scrollY > headerHeight.current.offsetHeight) {
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

    }, [searchOpen, headerHeight])

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
                            <span className="text-sm lg:text-3xl block text-white font-bold">PERFUME BANGLADESH</span>
                            <span className="hidden lg:block text-base text-white font-medium">A House of Authentic Fragrance</span>
                        </h1>
                    </div>
                    <div className="justify-self-end flex items-center text-white">
                        <div className="mr-10 hidden lg:block">
                            <h1 className="text-base font-semibold">Hello, Enthusiast</h1>
                            <div className="flex items-center">
                                <Link href="/login">
                                    <a className="text-xs hover:text-purple-800 uppercase normal-transition font-medium">Log In</a>
                                </Link>
                                <span className='text-xs uppercase mx-1'>OR</span>
                                <Link href="/register">
                                    <a className="text-xs hover:text-purple-800 uppercase normal-transition font-medium">Register</a>
                                </Link>
                            </div>
                        </div>
                        <div className="relative cursor-pointer">
                            <span className="h-5 w-5 text-xs rounded-full bg-purple-800 font-semibold absolute -top-1 -right-1 flex justify-center items-center text-white">
                                0
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
                        'absolute top-0 bottom-0 -left-full animate__animated animate__slideInRight bg-white z-10'}` :
                        'list-none flex lg:flex-row'}>
                        {data?.data && data?.data.map(category => (
                            <li key={category.id} className="py-2 lg:py-0 px-2 group">
                                <NavLink className="py-2 font-medium uppercase border-b border-transparent hover:text-purple-500 lg:hover:text-gray-300 hover:border-white normal-transition" href={`/categories/${category.name.toLowerCase()}`}>
                                    <p>{category.name}</p>
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
                    </ul>
                </nav>
            </header>
            {isMobileHeight && <div style={{ height: headerHeight.current?.offsetHeight }} />}
        </div>
    )
}

export default Nav
