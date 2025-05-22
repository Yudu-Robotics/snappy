"use client";
import { Provider } from "react-redux";

import { ReactNode } from "react";
import { PersistGate } from "redux-persist/integration/react";

import { persistor, store } from "@/app/redux/store";
interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
