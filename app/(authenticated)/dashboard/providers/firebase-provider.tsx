"use client";
import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { getMessaging, Messaging, onMessage } from "firebase/messaging";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjldZWvvn7nE2kERTFQxT3z3K52_xpNZI",
  authDomain: "knock-demo.firebaseapp.com",
  projectId: "knock-demo",
  storageBucket: "knock-demo.firebasestorage.app",
  messagingSenderId: "505274785219",
  appId: "1:505274785219:web:f813092edd0cb929ee7176",
};

interface FirebaseContextType {
  messaging: Messaging | undefined;
  serviceWorkerRegistration: ServiceWorkerRegistration | undefined;
}

export const FirebaseContext = createContext<FirebaseContextType | undefined>(
  undefined
);

const FirebaseProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);
  const [messaging, setMessaging] = useState<Messaging | undefined>(undefined);
  const [serviceWorkerRegistration, setServiceWorkerRegistration] = useState<
    ServiceWorkerRegistration | undefined
  >(undefined);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const initializeFirebase = async () => {
      try {
        if (
          isClient &&
          "serviceWorker" in navigator &&
          "Notification" in window
        ) {
          // Initialize Firebase
          const app = initializeApp(firebaseConfig);
          const messagingInstance = getMessaging(app);
          console.log("Firebase messaging initialized:", messagingInstance);
          setMessaging(messagingInstance);

          // Register service worker
          let registration = await navigator.serviceWorker.getRegistration("/");
          if (!registration) {
            console.log("Registering service worker...");
            registration = await navigator.serviceWorker.register(
              "/firebase-messaging-sw.js",
              {
                scope: "/",
              }
            );
          }

          await navigator.serviceWorker.ready;
          console.log("Service worker ready:", registration);
          setServiceWorkerRegistration(registration);

          // Set up foreground message handler
          const unsubscribe = onMessage(messagingInstance, async (payload) => {
            console.log("Foreground message received:", payload);
            if (Notification.permission === "granted" && payload.notification) {
              const url = payload.data?.url || "/";
              await registration!.showNotification(
                payload?.notification?.title || "",
                {
                  body: payload.notification?.body,
                  icon: "/assets/logo.png",
                  data: { url },
                }
              );
            }
          });

          return () => unsubscribe();
        } else {
          console.log("Firebase not supported in this environment");
        }
      } catch (error) {
        console.error("Error initializing Firebase:", error);
        alert(`Error initializing Firebase: ${error}`);
      }
    };

    initializeFirebase();
  }, [isClient]);

  if (!isClient) {
    return <>{children}</>;
  }

  return (
    <FirebaseContext.Provider value={{ messaging, serviceWorkerRegistration }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
