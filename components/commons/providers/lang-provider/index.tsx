import { NextIntlClientProvider } from 'next-intl'
import * as React from 'react'

export function LangProvider({ children }: { children: React.ReactNode }) {
	return <NextIntlClientProvider>{children}</NextIntlClientProvider>
}

