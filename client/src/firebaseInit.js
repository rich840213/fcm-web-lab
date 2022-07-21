import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// 網路推播憑證
const PUBLIC_KEY = process.env.REACT_APP_VAPID_KEY;

const config = {
  apiKey: "FROM FIREBASE CONSOLE",
  authDomain: "PROJECT_ID.firebaseapp.com",
  databaseURL: "https://PROJECT_ID.firebaseio.com",
  projectId: "FROM FIREBASE CONSOLE",
  storageBucket: "PROJECT_ID.appspot.com",
  messagingSenderId: "FROM FIREBASE CONSOLE",
  appId: "FROM FIREBASE CONSOLE",
};

const messaging = getMessaging(initializeApp(config));

export const getRegistrationToken = async () => {
  try {
    return await getToken(messaging, { vapidKey: PUBLIC_KEY });
  } catch (error) {
    console.log("An error occurred while retrieving token. ", error);
    return "An error occurred while retrieving token. ";
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
