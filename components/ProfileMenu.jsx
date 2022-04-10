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
  };
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
  }, []);

  let profileRoutes = [
    {
      link: "/profile",
      name: "Profile",
      isActiveRoute: activeRouteHandler("/profile"),
      icon: "bi bi-person-fill",
      isActive: true,
    },
    {
      link: "/orders",
      name: "Orders",
      isActiveRoute: activeRouteHandler("/orders"),
      icon: "bi bi-archive-fill",
      isActive: true,
    },
    {
      link: "/delivery-address",
      name: "Delivery Address",
      isActiveRoute: activeRouteHandler("/delivery-address"),
      icon: "bi bi-geo",
      isActive: true,
    },
  ];

  return (
    <div className="flex flex-row items-center overflow-hidden rounded-md border shadow md:flex-col md:items-start">
      <div className="flex items-center py-4 px-6">
        <Image
          className="rounded-full"
          src={user.avatar}
          height={isMobileWidth ? 40 : 80}
          width={isMobileWidth ? 40 : 80}
          alt={user.first_name}
        />
        <div className="ml-4 hidden lg:block">
          <h1 className="mb-0 text-xl font-semibold text-purple-800 lg:text-2xl">
            {user.first_name} {user.last_name}
          </h1>
          <h2 className="text-base text-gray-400">{user.email}</h2>
        </div>
      </div>

      <ul className="mb-0 flex w-full list-none flex-row items-center md:flex-col md:items-start">
        {profileRoutes.map((route) => {
          if (route.isActive) {
            return (
              <li key={route.name} className="w-full">
                <Link href={route.link}>
                  <a
                    className={`group flex flex-col items-center justify-between py-4 px-6 md:flex-row ${
                      route.isActiveRoute ? "bg-purple-800" : ""
                    } normal-transition border-none border-purple-400 hover:bg-purple-800 md:border-b`}
                  >
                    <div className="flex items-center">
                      <i
                        className={`${route.icon} text-xl ${
                          route.isActiveRoute
                            ? "border-white text-white"
                            : "normal-transition text-purple-800 group-hover:text-white"
                        } rounded-full px-1  `}
                      ></i>
                      <span
                        className={`hidden text-lg md:block ${
                          route.isActiveRoute
                            ? "text-white"
                            : "normal-transition text-purple-800 group-hover:text-white"
                        }  ml-2 font-semibold `}
                      >
                        {route.name}
                      </span>
                    </div>
                    <i
                      className={`bi ${
                        route.isActiveRoute
                          ? "text-white"
                          : "normal-transition text-purple-800 group-hover:text-white"
                      } text-xl ${
                        !isMobileWidth ? "bi-chevron-compact-right" : ""
                      } `}
                    ></i>
                  </a>
                </Link>
              </li>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
};

export default ProfileMenu;
