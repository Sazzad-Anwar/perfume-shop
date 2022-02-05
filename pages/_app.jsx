import '../styles/globals.css'
import 'antd/dist/antd.css';
import { SessionProvider } from 'next-auth/react'
import 'animate.css';
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css/effect-fade"
import GlobalContextProvider from '../Context/GlobalContext';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <GlobalContextProvider>
        <Component {...pageProps} />
      </GlobalContextProvider>
    </SessionProvider>
  )
}

export default MyApp
