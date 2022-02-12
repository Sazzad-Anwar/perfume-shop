import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ProfileMenu = ({ user }) => {

    const router = useRouter();
    let activeRouteHandler = (route) => {
        if (router.pathname === route) {
            return true;
        }
        return false;
    }
    const [isMobileWidth, setIsMobileWidth] = useState(false);

    useEffect(() => {
        if (window.innerWidth <= 768) {
            setIsMobileWidth(true);
        } else {
            setIsMobileWidth(false);
        }

        document.addEventListener("resize", () => {
            if (window.innerWidth <= 768) {
                setIsMobileWidth(true);
            } else {
                setIsMobileWidth(false);
            }
        });

    }, [])

    let profileRoutes = [
        {
            link: '/profile',
            name: 'Profile',
            isActiveRoute: activeRouteHandler('/profile'),
            icon: 'bi bi-person-fill',
            isActive: true,
        },
        {
            link: '/orders',
            name: 'Orders',
            isActiveRoute: activeRouteHandler('/orders'),
            icon: 'bi bi-archive-fill',
            isActive: true,
        },
        {
            link: '/delivery-address',
            name: 'Delivery Address',
            isActiveRoute: activeRouteHandler('/delivery-address'),
            icon: 'bi bi-geo',
            isActive: true,
        },
    ]

    return (
        <div className="rounded-md shadow border overflow-hidden flex flex-row md:flex-col items-center md:items-start">
            <div className="py-4 px-6 flex items-center">
                <Image className="rounded-full" src={user.avatar} height={isMobileWidth ? 40 : 80} width={isMobileWidth ? 40 : 80} alt={user.first_name} />
                <div className="ml-4 hidden lg:block">
                    <h1 className="text-xl lg:text-2xl font-semibold text-purple-800 mb-0">{user.first_name} {user.last_name}</h1>
                    <h2 className="text-base text-gray-400">{user.email}</h2>
                </div>
            </div>

            <ul className="list-none mb-0 w-full flex flex-row md:flex-col items-center md:items-start">
                {profileRoutes.map((route) => {
                    if (route.isActive) {
                        return (
                            <li key={route.name} className="w-full">
                                <Link href={route.link}>
                                    <a className={`flex flex-col md:flex-row group justify-between items-center py-4 px-6 ${route.isActiveRoute ? 'bg-purple-800' : ''} hover:bg-purple-800 normal-transition border-none md:border-b border-purple-400`}>
                                        <div className="flex items-center">
                                            <i className={`${route.icon} text-xl ${route.isActiveRoute ? 'border-white text-white' : 'text-purple-800 group-hover:text-white normal-transition'} rounded-full px-1  `}></i>
                                            <span className={`text-lg hidden md:block ${route.isActiveRoute ? 'text-white' : 'text-purple-800 group-hover:text-white normal-transition'}  ml-2 font-semibold `}>{route.name}</span>
                                        </div>
                                        <i className={`bi ${route.isActiveRoute ? 'text-white' : 'text-purple-800 group-hover:text-white normal-transition'} text-xl ${!isMobileWidth ? "bi-chevron-compact-right" : ""} `}></i>
                                    </a>
                                </Link>
                            </li>
                        )
                    }
                    return null;
                })}
            </ul>
        </div>

    )
}

export default ProfileMenu