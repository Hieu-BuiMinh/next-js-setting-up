'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'

export function ModeToggle() {
	const { setTheme, theme } = useTheme()

	const handleSwichTheme = () => {
		if (theme === 'dark') {
			setTheme('light')
		} else {
			setTheme('dark')
		}
	}

	return (
		<Button onClick={handleSwichTheme} className="size-7" variant="ghost" size="icon">
			<Sun className="size-[1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
			<Moon className="absolute size-[1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
		</Button>
	)
}
