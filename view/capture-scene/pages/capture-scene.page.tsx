'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { toast } from 'sonner'

function CaptureScenePageView() {
	const [stream, setStream] = useState<MediaStream | null>(null)
	const videoRef = useRef<HTMLVideoElement>(null)

	const [capturedImage, setCapturedImage] = useState<string | null>(null)
	const canvasRef = useRef<HTMLCanvasElement>(null)

	const handleStartCamera = async () => {
		try {
			const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true })
			setStream(mediaStream)

			if (videoRef.current) {
				videoRef.current.srcObject = mediaStream
			}
		} catch (error) {
			toast.warning('Faild to turn camera on', { position: 'bottom-center' })
			console.log('Faild to turn camera on', error)
		}
	}

	const handleStopCamera = () => {
		if (stream) {
			stream.getTracks().forEach((track) => track.stop())
			setStream(null)
		}
	}

	const handleCapture = () => {
		if (!videoRef.current) return

		const video = videoRef.current
		const canvas = canvasRef.current

		if (!canvas) return
		canvas.width = video.videoWidth
		canvas.height = video.videoHeight

		const cxt = canvas.getContext('2d')

		if (!cxt) return

		cxt.drawImage(video, 0, 0, canvas.width, canvas.height)

		const imageDataUrl = canvas.toDataURL('image/png')

		console.log(canvas)

		setCapturedImage(imageDataUrl)
	}

	const handleResetImage = () => {
		if (capturedImage) {
			URL.revokeObjectURL(capturedImage)
		}
		setCapturedImage(null)
	}

	return (
		<div className="p-6 flex flex-col items-center gap-4">
			<div className="flex gap-3">
				{!stream ? (
					<Button onClick={handleStartCamera}>Bật Camera</Button>
				) : (
					<Button onClick={handleStopCamera} variant="destructive">
						Tắt Camera
					</Button>
				)}
				{stream && (
					<Button onClick={handleCapture} disabled={!stream}>
						Capture ảnh
					</Button>
				)}
				{capturedImage && (
					<Button onClick={handleResetImage} disabled={!capturedImage} variant="outline">
						Reset ảnh
					</Button>
				)}
			</div>
			<video ref={videoRef} autoPlay playsInline className="mt-4 w-80 rounded border border-gray-300" />

			<canvas ref={canvasRef} className="hidden" />

			{capturedImage && (
				<div className="mt-4 flex flex-col items-center">
					<h2 className="mb-2 font-semibold">Ảnh đã chụp</h2>
					<Image
						src={capturedImage}
						alt="Captured"
						width={350}
						height={350}
						className="w-80 rounded border border-gray-300"
					/>
					<a href={capturedImage} download="capture.png" className="mt-2 text-blue-600 underline">
						Tải ảnh về
					</a>
				</div>
			)}
		</div>
	)
}

export default CaptureScenePageView
