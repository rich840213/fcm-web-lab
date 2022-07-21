import React, { useEffect, useState } from "react";

import ReactNotificationComponent from "./components/Notifications/ReactNotification";

import { getRegistrationToken, onMessageListener } from "./firebaseInit";

import "./App.css";

const requestNotificationPermission = () => {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
    return;
  }

  // Let's check whether notification permissions have already been granted
  if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    new Notification("Notification permission granted");
    return;
  }

  // Otherwise, we need to ask the user for permission
  if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        new Notification("Notification permission granted");
      }
    });
  }
};

function App() {
  const [token, setToken] = useState("");
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });

  useEffect(() => {
    getRegistrationToken()
      .then((token) => setToken(token))
      .catch((err) => {
        setToken("");
        console.log("getRegistrationToken failed: ", err);
      });
  }, []);

  onMessageListener()
    .then((payload) => {
      setShow(true);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
      console.log("message: ", payload);
    })
    .catch((err) => console.log("onMessageListener failed: ", err));

  return (
    <div className="App">
      Registration Token (將此 token 貼到 server 中的 registrationToken):
      <br />
      {token}
      {show ? (
        <ReactNotificationComponent
          title={notification.title}
          body={notification.body}
        />
      ) : (
        <></>
      )}
      <br />
      <button onClick={requestNotificationPermission}>
        Get Notification Permission
      </button>
    </div>
  );
}

export default App;
