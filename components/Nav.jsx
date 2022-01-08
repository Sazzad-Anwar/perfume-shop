import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import NavLink from "./NavLink"
import { signOut, useSession } from 'next-auth/react';

const Nav = () => {

    const authentication = useSession();
    const router = useRouter();
    const [searchOpen, setSearchOpen] = useState(false);
    const searchRef = useRef(null)
    const headerHeight = useRef(null);
    const [navOpen, setNavOpen] = useState(false);
    const [isMobileHeight, setIsMobileHeight] = useState(false);
    const [stickyNav, setStickyNav] = useState(false);

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
        <>
            <header ref={headerHeight} className={isMobileHeight ? "px-[1rem] w-screen pt-3 lg:pt-8 pb-3 fixed top-0 z-20 bg-white" : "container mx-auto pt-3 lg:pt-8 pb-3"}>
                <div className="grid grid-cols-3">
                    <div className="justify-self-start flex justify-around items-center bg-white">
                        <div onBlur={() => searchRef.current.value !== '' ? '' : setSearchOpen(false)} className={` ${searchOpen ? `${isMobileHeight ? 'absolute left-0 right-0 z-10 h-10' : 'w-auto'} border rounded-full normal-transition shadow-lg` : 'h-10 w-10 border group flex justify-center items-center rounded-full normal-transition cursor-pointer bg-white overflow-hidden'} `}>
                            <div className={`${searchOpen ? 'flex justify-center items-center py-2 mx-3 h-full bg-white' : ''}`}>
                                <i onClick={() => setSearchOpen(!searchOpen)} className={searchOpen ? "bi bi-search mr-3" : "bi bi-search "}></i>
                                {searchOpen && <input ref={searchRef} type="text" className="h-full w-full focus:outline-none" />}
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <Image src="/logo.webp" height={50} width={108} layout="intrinsic" alt="logo-img" />
                    </div>
                    <div className="justify-self-end flex items-center">
                        <div className="mr-10 hidden lg:block">
                            <h1 className="text-base font-semibold">Hey, Gorgeous</h1>
                            <div className="flex items-center">
                                <Link href="/login">
                                    <a className="text-xs hover:text-red-600 uppercase">Log In</a>
                                </Link>
                                <span className='text-xs uppercase mx-1'>OR</span>
                                <Link href="/register">
                                    <a className="text-xs hover:text-red-600 uppercase">Register</a>
                                </Link>
                            </div>
                        </div>
                        <div className="relative cursor-pointer">
                            <span className="h-5 w-5 text-xs rounded-full bg-red-700 font-semibold absolute -top-1 -right-1 flex justify-center items-center text-white">
                                0
                            </span>
                            <i className="bi bi-bag text-3xl"></i>
                        </div>
                        <div onClick={() => setNavOpen(!navOpen)} className="h-12 w-12 flex justify-center items-center lg:hidden normal-transition cursor-pointer">
                            {navOpen ? <i className="bi bi-x-lg text-3xl normal-transition"></i> : <i className="bi bi-list text-3xl normal-transition"></i>}
                        </div>
                    </div>
                </div>
                <nav className={`flex justify-center ${isMobileHeight ? 'absolute left-0 right-0' : ''} items-center ${!isMobileHeight && stickyNav ? 'py-3 w-screen fixed left-0 right-0 top-0 bg-white z-20 animate__animated animate__fadeInDown shadow-lg' : 'mt-3 '} bg-white`}>
                    <ul className={isMobileHeight ? `${isMobileHeight && navOpen ?
                        'list-none flex flex-col absolute top-0 left-0 bottom-0 w-full backdrop-blur-lg z-10 py-8 bg-white opacity-100 shadow-lg animate__animated animate__slideInLeft h-screen overflow-auto' :
                        'absolute top-0 bottom-0 -left-full animate__animated animate__slideInRight bg-white z-10'}` :
                        'list-none flex lg:flex-row'}>
                        <li className="py-2 lg:py-0 px-2 group">
                            <NavLink href="/">
                                <a className="py-2">FEATURED</a>
                            </NavLink>
                            <div className="hidden group-hover:block lg:absolute lg:left-0 lg:right-0 lg:z-40">
                                <div className="container mx-auto">
                                    <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 bg-white px-1 lg:px-8 py-5 ;g:mx-48">
                                        <Link href="/">
                                            <a>
                                                <Image layout="intrinsic" className="scale-100 hover:scale-110 normal-transition" height={200} width={200} src="/mega-menu-img-1.jpg" alt="mega-menu-img-1" />
                                                <p className="text-left hover:text-pink-600 lg:text-center uppercase">New</p>
                                            </a>
                                        </Link>
                                        <Link href="/">
                                            <a>
                                                <Image layout="intrinsic" className="scale-100 hover:scale-110 normal-transition" height={200} width={200} src="/best-seller.jpg" alt="mega-menu-img-1" />
                                                <p className="text-left hover:text-pink-600 normal-transition
                                             lg:text-center uppercase">Best Seller</p>
                                            </a>
                                        </Link>
                                        <Link href="/">
                                            <a>
                                                <Image layout="intrinsic" className="scale-100 hover:scale-110 normal-transition" height={200} width={200} src="/award-winner.jpg" alt="mega-menu-img-1" />
                                                <p className="text-left hover:text-pink-600 normal-transition
                                             lg:text-center uppercase">Award Winner</p>
                                            </a>
                                        </Link>
                                        <Link href="/">
                                            <a>

                                                <Image layout="intrinsic" className="scale-100 hover:scale-110 normal-transition" height={200} width={200} src="/wellness.jpg" alt="mega-menu-img-1" />
                                                <p className="text-left hover:text-pink-600 normal-transition
                                             lg:text-center uppercase">Wellness</p>
                                            </a>
                                        </Link>
                                        <Link href="/">
                                            <a>

                                                <Image layout="intrinsic" className="scale-100 hover:scale-110 normal-transition" height={200} width={200} src="/subscribe.jpg" alt="mega-menu-img-1" />
                                                <p className="text-left hover:text-pink-600 normal-transition
                                             lg:text-center uppercase">Subscribe & Save</p>
                                            </a>
                                        </Link>
                                        <Link href="/">
                                            <a>
                                                <Image layout="intrinsic" className="scale-100 hover:scale-110 normal-transition" height={200} width={200} src="/home.jpg" alt="mega-menu-img-1" />
                                                <p className="text-left hover:text-pink-600 normal-transition
                                             lg:text-center uppercase">home</p>
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="py-2 lg:py-0 px-2">
                            <NavLink href="/">
                                <a className="py-2">FRUIT PIGMENTED MAKEUP</a>
                            </NavLink>
                        </li>
                        <li className="py-2 lg:py-0 px-2">
                            <NavLink href="/">
                                <a className="py-2">SKIN CARE</a>
                            </NavLink>
                        </li>
                        <li className="py-2 lg:py-0 px-2">
                            <NavLink href="/">
                                <a className="py-2">HAIR & BODY</a>
                            </NavLink>
                        </li>
                        <li className="py-2 lg:py-0 px-2">
                            <NavLink href="/">
                                <a className="py-2">GIFTS</a>
                            </NavLink>
                        </li>
                        <li className="py-2 lg:py-0 px-2">
                            <NavLink href="/">
                                <a className="py-2">EXPLORE</a>
                            </NavLink>
                        </li>
                        <li className="py-2 block lg:hidden lg:py-0 px-2">
                            <NavLink href="/login">
                                <a className="py-2">Login</a>
                            </NavLink>
                        </li>
                        <li className="py-2 block lg:hidden lg:py-0 px-2">
                            <NavLink href="/registration">
                                <a className="py-2">Registration</a>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
            {isMobileHeight && <div style={{ height: headerHeight.current?.offsetHeight }} />}
        </>
    )
}

export default Nav
