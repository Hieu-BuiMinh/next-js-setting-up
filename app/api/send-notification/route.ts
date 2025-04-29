import admin from 'firebase-admin'
import { Message } from 'firebase-admin/messaging'

if (!admin.apps.length) {
	try {
		const serviceAccount: admin.ServiceAccount = {
			// type: 'service_account',
			// project_id: process.env.FIREBASE_PROJECT_ID ||'',
			// private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID||'',
			// private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')||'', // Thay thế \n bằng ký tự xuống dòng thực sự
			// client_email: process.env.FIREBASE_CLIENT_EMAIL||'',
			// client_id: process.env.FIREBASE_CLIENT_ID||'',
			// auth_uri: process.env.FIREBASE_AUTH_URI||'',
			// token_uri: process.env.FIREBASE_TOKEN_URI||'',
			// auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL||'',
			// client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL||'',
			projectId: process.env.FIREBASE_PROJECT_ID || '',
			clientEmail: process.env.FIREBASE_CLIENT_EMAIL || '',
			privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') || '',
		}

		admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
		})
	} catch (error) {
		console.log('Firebase admin app already initialized', error)
	}
}

export async function POST(request: Request) {
	const { token, title, message, link } = await request.json()

	const payload: Message = {
		token,
		notification: {
			title,
			body: message,
			imageUrl: '',
		},
		webpush: link && {
			fcmOptions: { link },
		},
	}

	try {
		await admin.messaging().send(payload)
	} catch (error) {
		console.error('Error sending message:', error)
	}
}
