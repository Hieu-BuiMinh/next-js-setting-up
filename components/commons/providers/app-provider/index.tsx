import FirebaseNoti from '@/components/commons/firebase-notification'
import { LangProvider } from '@/components/commons/providers/lang-provider'
import { ThemeProvider } from '@/components/commons/providers/theme-provider'
import { Toaster } from 'sonner'

function AppProvider({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
			<LangProvider>{children}</LangProvider>
			<Toaster />
			<FirebaseNoti />
		</ThemeProvider>
	)
}

export default AppProvider

