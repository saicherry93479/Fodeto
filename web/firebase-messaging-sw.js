importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

firebase.initializeApp({
    apiKey: "AIzaSyCnEsm6b0K0a6NyWZydWRmP1cWSRabRhgE",
    authDomain: "ct-shop-5ab1f.firebaseapp.com",
    projectId: "ct-shop-5ab1f",
    storageBucket: "ct-shop-5ab1f.appspot.com",
    messagingSenderId: "126039789967",
    appId: "1:126039789967:web:d103c4c1b2644a2884fbfa",
    measurementId: "G-GQ901JGYTG"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
        })
        .then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            const title = payload.notification.title;
            const options = {
                body: payload.notification.score
              };
            return registration.showNotification(title, options);
        });
    return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
    console.log('notification received: ', event)
});