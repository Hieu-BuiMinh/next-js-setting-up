import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

export default function HomePage() {
	const t = useTranslations('HomePage')
	return (
		<div>
			<h1>{t('title')}</h1>
			<Link href="/about">{t('about')}</Link>
			<Link href="/capture-scene">Capture scene</Link>
		</div>
	)
}
