// /public/firebase-messaging-sw.js
// https://www.youtube.com/watch?v=W-rlFj0d0RQ
// https://github.dev/sonnysangha/firebase-cloud-messaging-web-push-notifications-with-nextjs-14-tutorial

importScripts('https://www.gstatic.com/firebasejs/10.10.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.10.0/firebase-messaging-compat.js')

firebase.initializeApp({
	apiKey: 'AIzaSyBKMPZXeLQcekxwFtpaoTnzJ1DOQLuDcfw',
	authDomain: 'fir-messaging-fd3fe.firebaseapp.com',
	projectId: 'fir-messaging-fd3fe',
	storageBucket: 'fir-messaging-fd3fe.firebasestorage.app',
	messagingSenderId: '112526251070',
	appId: '1:112526251070:web:27ebb17df58bbeff3aad6f',
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
	console.log('[firebase-messaging-sw.js] Received background message ', payload)
	const { title, body } = payload.notification
	const link = payload?.data?.link || payload?.fcmOptions?.link
	const notificationOptions = {
		body: body,
		icon: '',
		data: { url: link },
	}

	self.registration.showNotification(title, notificationOptions)
})

self.addEventListener('notificationclick', function (event) {
	console.log('[firebase-messaging-sw.js] Notification click received.')

	event.notification.close()

	// This checks if the client is already open and if it is, it focuses on the tab. If it is not open, it opens a new tab with the URL passed in the notification payload
	event.waitUntil(
		clients
			// https://developer.mozilla.org/en-US/docs/Web/API/Clients/matchAll
			.matchAll({ type: 'window', includeUncontrolled: true })
			.then(function (clientList) {
				const url = event.notification.data.url

				if (!url) return

				// If relative URL is passed in firebase console or API route handler, it may open a new window as the client.url is the full URL i.e. https://example.com/ and the url is /about whereas if we passed in the full URL, it will focus on the existing tab i.e. https://example.com/about
				for (const client of clientList) {
					if (client.url === url && 'focus' in client) {
						return client.focus()
					}
				}

				if (clients.openWindow) {
					console.log('OPENWINDOW ON CLIENT')
					return clients.openWindow(url)
				}
			})
	)
})
