
import '../styles/globals.css';
import Navbar from '../components/Navbar';
import OfflineNotice from '../components/OfflineNotice';

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <Navbar />
            <OfflineNotice />
            <Component {...pageProps} />
        </>
    );
}
