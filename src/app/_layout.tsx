import { useEffect, useState } from "react"
import { Slot, SplashScreen, Stack } from "expo-router"
import { KeyboardProvider } from "react-native-keyboard-controller"

import { useInitialRootStore } from "@/models"
import { useFonts } from "@expo-google-fonts/space-grotesk"
import { customFontsToLoad } from "@/theme"
import { initI18n } from "@/i18n"
import { loadDateFnsLocale } from "@/utils/formatDate"
import { useThemeProvider } from "@/utils/useAppTheme"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { StripeProvider } from "@stripe/stripe-react-native"

SplashScreen.preventAutoHideAsync()

if (__DEV__) {
  // Load Reactotron configuration in development. We don't want to
  // include this in our production bundle, so we are using `if (__DEV__)`
  // to only execute this in development.
  require("src/devtools/ReactotronConfig.ts")
}
const publishableKey =
  "pk_test_51ON08wGASSadc3NRBOxpF21Mpage2IF4c1P4maYY8jOy3sckBj6upyx5ooad81I5nuX6FPTfJOL94nB8WcrTjkkL00PnkizbpB"
export { ErrorBoundary } from "@/components/ErrorBoundary/ErrorBoundary"

export default function Root() {
  // Wait for stores to load and render our layout inside of it so we have access
  // to auth info etc
  const { rehydrated } = useInitialRootStore()

  const [fontsLoaded, fontError] = useFonts(customFontsToLoad)
  const [isI18nInitialized, setIsI18nInitialized] = useState(false)
  const { themeScheme, setThemeContextOverride, ThemeProvider } = useThemeProvider()
  const safeAreaInsets = useSafeAreaInsets()
  useEffect(() => {
    initI18n()
      .then(() => setIsI18nInitialized(true))
      .then(() => loadDateFnsLocale())
  }, [])

  const loaded = fontsLoaded && isI18nInitialized && rehydrated

  useEffect(() => {
    if (fontError) throw fontError
  }, [fontError])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <StripeProvider
      publishableKey={publishableKey}
      merchantIdentifier="com.ayurvedicv4" // required for Apple Pay
      urlScheme="https" // required for 3D Secure and bank redirects
    >
      <ThemeProvider value={{ themeScheme, setThemeContextOverride }}>
        <KeyboardProvider>
          <Slot />
        </KeyboardProvider>
      </ThemeProvider>
    </StripeProvider>
  )
}
