import "../styles/globals.css";
import Header from "../layouts/header";
import Footer from "../layouts/footer";

export default function App({ Component, pageProps }) {

  return (
    <>
      <Component {...pageProps} />
      <Footer/>
    </>
  );
}
