import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import { Provider } from "react-redux";
import '../styles/globals.css';
import { store } from "@/redux/store";
import Search from "@/components/Search";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
