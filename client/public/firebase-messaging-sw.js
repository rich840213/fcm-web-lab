// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts(
  "https://www.gstatic.com/firebasejs/9.9.0/firebase-app-compat.js"
);
// eslint-disable-next-line no-undef
importScripts(
  "https://www.gstatic.com/firebasejs/9.9.0/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing the generated config
const config = {
  apiKey: "FROM FIREBASE CONSOLE",
  authDomain: "PROJECT_ID.firebaseapp.com",
  databaseURL: "https://PROJECT_ID.firebaseio.com",
  projectId: "FROM FIREBASE CONSOLE",
  storageBucket: "PROJECT_ID.appspot.com",
  messagingSenderId: "FROM FIREBASE CONSOLE",
  appId: "FROM FIREBASE CONSOLE",
};

// eslint-disable-next-line no-undef
firebase.initializeApp(config);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();
messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo192.png",
  };

  // eslint-disable-next-line no-restricted-globals
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
