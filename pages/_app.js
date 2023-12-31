import "@/styles/globals.css";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import links from "../reducers/links";
import user from "../reducers/user";

const store = configureStore({
  reducer: { links, user },
});

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
