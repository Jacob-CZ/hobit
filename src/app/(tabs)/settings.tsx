import { Platform, ScrollView, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Screen, Text } from "@/components"
import { Drawer } from "react-native-drawer-layout"
import { useAppTheme } from "@/utils/useAppTheme"
import { useCallback, useState } from "react"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"
import { $styles, ThemedStyle } from "@/theme"
import { DrawerIconButton } from "@/components/DrawerIconButton"
import Animated, { SlideInLeft, SlideInUp } from "react-native-reanimated"
import { useFocusEffect } from "expo-router"
import { HoldItem } from "react-native-hold-menu"
const isAndroid = Platform.OS === "android"
const MenuItems = [
  { text: "Actions", icon: "home", isTitle: true, onPress: () => {} },
  { text: "Action 1", icon: "edit", onPress: () => {} },
  { text: "Action 2", icon: "map-pin", withSeparator: true, onPress: () => {} },
  { text: "Action 3", icon: "trash", isDestructive: true, onPress: () => {} },
]
export default observer(() => {
  const [open, setOpen] = useState(false)

  const { themed, theme } = useAppTheme()
  const $drawerInsets = useSafeAreaInsetsStyle(["top"])
  const toggleDrawer = useCallback(() => {
    if (!open) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [open])
  return (
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      drawerType="back"
      renderDrawerContent={() => <View style={themed([$drawer, $drawerInsets])}></View>}
    >
      <Screen
        preset="fixed"
        safeAreaEdges={["top"]}
        {...(isAndroid ? { KeyboardAvoidingViewProps: { behavior: undefined } } : {})}
      >
        <DrawerIconButton onPress={toggleDrawer} />
        <Text>index</Text>
        <Text>index</Text>
        <Text>index</Text>
        <Button onPress={() => {}}>index</Button>
        <Button onPress={() => {}}>index</Button>
        <Button onPress={() => {}}>index</Button>
        <Button onPress={() => {}}>index</Button>
      </Screen>
    </Drawer>
  )
})
const $drawer: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.background,
  flex: 1,
})
const $drawerButton: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.background,
  padding: 16,
  position: "absolute",
})
