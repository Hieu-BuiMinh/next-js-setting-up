import { LangProvider } from '@/components/commons/providers/lang-provider'
import { ThemeProvider } from '@/components/commons/providers/theme-provider'

function AppProvider({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
			<LangProvider>{children}</LangProvider>
		</ThemeProvider>
	)
}

export default AppProvider

