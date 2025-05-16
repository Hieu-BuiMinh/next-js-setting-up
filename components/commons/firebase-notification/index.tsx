'use client'

import useFirebaseMessage from '@/hooks/useFirebaseMessageToken'
import React from 'react'

function FirebaseNoti() {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { token, notificationPermissionStatus } = useFirebaseMessage()
	return <div>FirebaseNoti</div>
}

export default FirebaseNoti
