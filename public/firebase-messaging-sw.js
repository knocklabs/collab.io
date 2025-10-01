console.log("[Firebase SW] Service Worker Loaded");
importScripts(
  "https://www.gstatic.com/firebasejs/12.2.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/12.2.1/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyBjldZWvvn7nE2kERTFQxT3z3K52_xpNZI",
  authDomain: "knock-demo.firebaseapp.com",
  projectId: "knock-demo",
  storageBucket: "knock-demo.firebasestorage.app",
  messagingSenderId: "505274785219",
  appId: "1:505274785219:web:f813092edd0cb929ee7176",
};

console.log("[Firebase SW] Firebase Config:", firebaseConfig);

const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app);

messaging.onBackgroundMessage(async (payload) => {
  console.log("background message");
  console.log(payload);

  const { notification, data } = payload;
  //data options
  //   const notificationOptions = {
  //     body: `${data?.body} background`,
  //     icon: data?.icon || "/assets/logo.png", // Default icon
  //     data: { url: data?.url || "/" }, // Store URL in notification data
  //   };

  //notification options
  const notificationOptions = {
    body: `${notification?.body} background`,
    icon: data?.icon || "/assets/logo.png", // Default icon
    data: { url: data?.url || "/" }, // Store URL in notification data
  };

  self.registration.showNotification(payload.data.title, notificationOptions);
});

self.addEventListener("install", (event) => {
  console.log("[Firebase SW] Installing...");
  event.waitUntil(self.skipWaiting()); // Force the new SW to activate immediately
});

self.addEventListener("activate", (event) => {
  console.log("[Firebase SW] Activating...");
  event.waitUntil(
    self.clients.claim() // Take control over all open pages
  );
});

self.addEventListener("notificationclick", (event) => {
  console.log("[Firebase SW] Notification Clicked:", event);
  event.notification.close();

  const url = event.notification.data?.url;
  if (url) {
    event.waitUntil(
      clients
        .matchAll({ type: "window", includeUncontrolled: true })
        .then((clientList) => {
          for (const client of clientList) {
            if (client.url === url && "focus" in client) {
              return client.focus();
            }
          }
          if (clients.openWindow) {
            return clients.openWindow(url);
          }
        })
    );
  }
});
