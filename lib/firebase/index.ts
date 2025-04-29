import { initializeApp, getApps, getApp } from 'firebase/app'
import { getMessaging, getToken, isSupported } from 'firebase/messaging'

const firebaseConfig = {
	apiKey: 'AIzaSyBKMPZXeLQcekxwFtpaoTnzJ1DOQLuDcfw',
	authDomain: 'fir-messaging-fd3fe.firebaseapp.com',
	projectId: 'fir-messaging-fd3fe',
	storageBucket: 'fir-messaging-fd3fe.firebasestorage.app',
	messagingSenderId: '112526251070',
	appId: '1:112526251070:web:27ebb17df58bbeff3aad6f',
	measurementId: 'G-R0YC08ZZF8',
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

const messaging = async () => {
	const supported = await isSupported()
	return supported ? getMessaging(app) : null
}

export const fetchToken = async () => {
	try {
		const fcmMessaging = await messaging()
		if (fcmMessaging) {
			const token = await getToken(fcmMessaging, {
				vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
			})
			return token
		}
		return null
	} catch (err) {
		console.error('An error occurred while fetching the token:', err)
		return null
	}
}

export { app, messaging }
