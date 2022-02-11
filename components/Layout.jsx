import Link from "next/link"
import Nav from "./Nav"

const Layout = ({ children }) => {
    return (
        <div>
            <Nav />
            {children}
            <footer className="bg-gradient-to-r from-purple-800 to-purple-300 h-full text-white">
                <div className="container mx-auto pt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div>
                            <h1 className="text-xl font-semibold mb-3 text-white">Featured</h1>
                            <ul className="list-none">
                                <li className="my-">
                                    <Link href="/">
                                        <a className="text-base text-white font-semibold hover:text-gray-300 normal-transition">About 100% pure</a>
                                    </Link>
                                </li>
                                <li className="my-">
                                    <Link href="/">
                                        <a className="text-base text-white font-semibold hover:text-gray-300 normal-transition">Careers</a>
                                    </Link>
                                </li>
                                <li className="my-">
                                    <Link href="/">
                                        <a className="text-base text-white font-semibold hover:text-gray-300 normal-transition">Press</a>
                                    </Link>
                                </li>
                                <li className="my-">
                                    <Link href="/">
                                        <a className="text-base text-white font-semibold hover:text-gray-300 normal-transition">Store Location</a>
                                    </Link>
                                </li>
                                <li className="my-">
                                    <Link href="/">
                                        <a className="text-base text-white font-semibold hover:text-gray-300 normal-transition">Wholesale</a>
                                    </Link>
                                </li>
                                <li className="my-">
                                    <Link href="/">
                                        <a className="text-base text-white font-semibold hover:text-gray-300 normal-transition">Student Discount</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h1 className="text-xl font-semibold text-white mb-3">Company</h1>
                            <ul className="list-none">
                                <li className="my-">
                                    <Link href="/">
                                        <a className="text-base text-white font-semibold hover:text-gray-300 normal-transition">Help & FAQ</a>
                                    </Link>
                                </li>
                                <li className="my-">
                                    <Link href="/">
                                        <a className="text-base text-white font-semibold hover:text-gray-300 normal-transition">Returns & Exchanges</a>
                                    </Link>
                                </li>
                                <li className="my-">
                                    <Link href="/">
                                        <a className="text-base text-white font-semibold hover:text-gray-300 normal-transition">Press</a>
                                    </Link>
                                </li>
                                <li className="my-">
                                    <Link href="/">
                                        <a className="text-base text-white font-semibold hover:text-gray-300 normal-transition">Accessibility</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h1 className="text-xl font-semibold text-white mb-3">Subscribe</h1>
                            <ul className="list-none">
                                <li className="my-">
                                    <div className="flex items-center h-12 w-full lg:w-96 bg-white">
                                        <input type="email" placeholder="Email" className="focus:outline-none h-full w-2/3 py-2 px-3" />
                                        <button className="w-1/3 h-full flex justify-center items-center bg-purple-800 hover:bg-gray-500 normal-transition text-white">
                                            <span>Send</span>
                                        </button>
                                    </div>
                                </li>
                                <li className="my-3 flex justify-between items-center lg:w-52 lg:mr-auto">
                                    <a href="https://faceboook.com" className="text-base text-white hover:text-purple-800 normal-transition">
                                        <i className="bi bi-facebook text-3xl"></i>
                                    </a>
                                    <a href="https://faceboook.com" className="text-base text-white hover:text-purple-800 normal-transition">
                                        <i className="bi bi-instagram text-3xl"></i>
                                    </a>
                                    <a href="https://faceboook.com" className="text-base text-white hover:text-purple-800 normal-transition">
                                        <i className="bi bi-twitter text-3xl"></i>
                                    </a>
                                    <a href="https://faceboook.com" className="text-base text-white hover:text-purple-800 normal-transition">
                                        <i className="bi bi-youtube text-3xl"></i>
                                    </a>
                                </li>

                            </ul>
                        </div>
                    </div>

                </div>

                <div className="bg-gray-800 py-3 h-full">
                    <div className="container mx-auto">
                        <div className="flex flex-col lg:flex-row justify-between items-center">
                            <p className="text-white text-sm">© 2022, All rights reserved</p>
                            <p className="text-white text-sm">Developed By Zayan It Solutions</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Layout
