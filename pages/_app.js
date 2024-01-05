import "@/styles/globals.css";
import { Provider } from "react-redux";
import links from "../reducers/links";
import user from "../reducers/user";
import { Poppins } from "next/font/google";

import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";

import { combineReducers, configureStore } from "@reduxjs/toolkit";

const reducers = combineReducers({ user });

const persistConfig = { key: "zoka", storage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// const store = configureStore({
//   reducer: { links, user },
// });
const persistor = persistStore(store);

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <main className={poppins.className}>
          <Component {...pageProps} />
        </main>
      </PersistGate>
    </Provider>
  );
}
