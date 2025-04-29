'use client'

import useFirebaseMessage from '@/hooks/useFirebaseMessageToken'
import React from 'react'

function FirebaseNoti() {
	const { token, notificationPermissionStatus } = useFirebaseMessage()
	return <div>FirebaseNoti</div>
}

export default FirebaseNoti
