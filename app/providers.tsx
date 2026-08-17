"use client";
import { setLogoutHandler } from "@/apis/apiConfig";
import { persister, store } from "@/store/store";
import { PropsWithChildren, useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function Providers({ children }: PropsWithChildren) {
  // Ensure store & persistor are created exactly once on the client
  // const storeRef = useRef<ReturnType<typeof store>>(null);
  // const persistorRef = useRef<ReturnType<typeof persistStore>>(null);

  // if (!storeRef.current) {
  //   storeRef.current = store();
  //   persistorRef.current = persistStore(storeRef.current);
  // }

  useEffect(() => {
    const handleLogoutAction = () => {
      try {
        // store.dispatch(logout());
      } catch (error) {
        console.error("Error during logout:", error);
      }
    };

    setLogoutHandler(handleLogoutAction);

    return () => {
      setLogoutHandler(null);
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        {children}
      </PersistGate>
    </Provider>
  );
}
