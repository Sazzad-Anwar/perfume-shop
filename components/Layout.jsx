import Link from "next/link";
import Nav from "./Nav";

const Layout = ({ children }) => {
  return (
    <div>
      <Nav />
      {children}
      <footer className="h-full bg-gradient-to-r from-purple-800 to-purple-300 text-white">
        <div className="container mx-auto pt-6">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div>
              <h1 className="mb-3 text-xl font-semibold text-white">
                Featured
              </h1>
              <ul className="list-none">
                <li className="my-">
                  <Link href="/">
                    <a className="normal-transition text-base font-semibold text-white hover:text-gray-300">
                      About 100% pure
                    </a>
                  </Link>
                </li>
                <li className="my-">
                  <Link href="/">
                    <a className="normal-transition text-base font-semibold text-white hover:text-gray-300">
                      Careers
                    </a>
                  </Link>
                </li>
                <li className="my-">
                  <Link href="/">
                    <a className="normal-transition text-base font-semibold text-white hover:text-gray-300">
                      Press
                    </a>
                  </Link>
                </li>
                <li className="my-">
                  <Link href="/">
                    <a className="normal-transition text-base font-semibold text-white hover:text-gray-300">
                      Store Location
                    </a>
                  </Link>
                </li>
                <li className="my-">
                  <Link href="/">
                    <a className="normal-transition text-base font-semibold text-white hover:text-gray-300">
                      Wholesale
                    </a>
                  </Link>
                </li>
                <li className="my-">
                  <Link href="/">
                    <a className="normal-transition text-base font-semibold text-white hover:text-gray-300">
                      Student Discount
                    </a>
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h1 className="mb-3 text-xl font-semibold text-white">Company</h1>
              <ul className="list-none">
                <li className="my-">
                  <Link href="/">
                    <a className="normal-transition text-base font-semibold text-white hover:text-gray-300">
                      Help & FAQ
                    </a>
                  </Link>
                </li>
                <li className="my-">
                  <Link href="/">
                    <a className="normal-transition text-base font-semibold text-white hover:text-gray-300">
                      Returns & Exchanges
                    </a>
                  </Link>
                </li>
                <li className="my-">
                  <Link href="/">
                    <a className="normal-transition text-base font-semibold text-white hover:text-gray-300">
                      Press
                    </a>
                  </Link>
                </li>
                <li className="my-">
                  <Link href="/">
                    <a className="normal-transition text-base font-semibold text-white hover:text-gray-300">
                      Accessibility
                    </a>
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h1 className="mb-3 text-xl font-semibold text-white">
                Subscribe
              </h1>
              <ul className="list-none">
                <li className="my-">
                  <div className="flex h-12 w-full items-center bg-white lg:w-96">
                    <input
                      type="email"
                      placeholder="Email"
                      className="h-full w-2/3 py-2 px-3 focus:outline-none"
                    />
                    <button className="normal-transition flex h-full w-1/3 items-center justify-center bg-purple-800 text-white hover:bg-gray-500">
                      <span>Send</span>
                    </button>
                  </div>
                </li>
                <li className="my-3 flex items-center justify-between lg:mr-auto lg:w-52">
                  <a
                    href="https://faceboook.com"
                    className="normal-transition text-base text-white hover:text-purple-800"
                  >
                    <i className="bi bi-facebook text-3xl"></i>
                  </a>
                  <a
                    href="https://faceboook.com"
                    className="normal-transition text-base text-white hover:text-purple-800"
                  >
                    <i className="bi bi-instagram text-3xl"></i>
                  </a>
                  <a
                    href="https://faceboook.com"
                    className="normal-transition text-base text-white hover:text-purple-800"
                  >
                    <i className="bi bi-twitter text-3xl"></i>
                  </a>
                  <a
                    href="https://faceboook.com"
                    className="normal-transition text-base text-white hover:text-purple-800"
                  >
                    <i className="bi bi-youtube text-3xl"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="h-full bg-gray-800 py-3">
          <div className="container mx-auto">
            <div className="flex flex-col items-center justify-between lg:flex-row">
              <p className="mb-0 text-sm text-white">
                © 2022, All rights reserved
              </p>
              <p className="mb-0 text-sm text-white">
                Developed By Zayan It Solutions
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
