import { BottomTabBarProps } from "@react-navigation/bottom-tabs"

import { TabBarNav } from "@/components/TabBarNav"
import { Tabs } from "expo-router"
import { useAppTheme } from "@/utils/useAppTheme"
import { View } from "react-native"

export default function _layout() {
  const { theme } = useAppTheme()
  return (
    <Tabs
      tabBar={(props: BottomTabBarProps) => <TabBarNav {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="test"
        options={{
          title: "Test",
        }}
      />
      <Tabs.Screen
        name="yoga"
        options={{
          title: "Yoga",
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
        }}
      />
    </Tabs>
  )
}
