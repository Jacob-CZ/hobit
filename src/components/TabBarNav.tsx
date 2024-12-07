import {
  View,
  Text,
  Dimensions,
  Animated,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native"
import React from "react"
import { Stack, Tabs } from "expo-router"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import AntDesign from "@expo/vector-icons/AntDesign"
import settings from "./settings"
import Fontisto from "@expo/vector-icons/Fontisto"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { useAppTheme } from "@/utils/useAppTheme"
import { ThemedStyle } from "@/theme"
import { observer } from "mobx-react-lite"
import Octicons from "@expo/vector-icons/Octicons"

/**
 * Describe your component here
 */
const { width } = Dimensions.get("window")
const TAB_WIDTH = width / 4
export const TabBarNav = observer(function TabBarNav({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const [translateX] = React.useState(new Animated.Value(0))
  const insets = useSafeAreaInsets()
  const { theme, themed } = useAppTheme()

  React.useEffect(() => {
    Animated.spring(translateX, {
      toValue: state.index * TAB_WIDTH,
      useNativeDriver: true,
      tension: 80,
      friction: 8,
    }).start()
  }, [state.index])

  return (
    <View style={[themed($container), { marginBottom: insets.bottom }]}>
      <Animated.View
        style={[
          themed($indicator),
          {
            transform: [{ translateX }],
          },
        ]}
      />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }
        const getIcon = (routeName: any) => {
          const icons = {
            index: <AntDesign name="home" size={24} color={theme.colors.tint} />,
            settings: <AntDesign name="setting" size={24} color={theme.colors.tint} />,
            test: <Fontisto name="test-bottle" size={24} color={theme.colors.tint} />,
            yoga: <Octicons name="tasklist" size={24} color={theme.colors.tint} />,
          }
          const Icon = icons[routeName]
          return Icon || null
        }

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            style={themed($tab)}
          >
            <Animated.View
              style={[
                themed($iconContainer),
                {
                  transform: [
                    {
                      scale: translateX.interpolate({
                        inputRange: [
                          (index - 1) * TAB_WIDTH,
                          index * TAB_WIDTH,
                          (index + 1) * TAB_WIDTH,
                        ],
                        outputRange: [1, 1.2, 1],
                        extrapolate: "clamp",
                      }),
                    },
                  ],
                },
              ]}
            >
              {getIcon(route.name)}
            </Animated.View>
          </TouchableOpacity>
        )
      })}
    </View>
  )
})

const $container: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flexDirection: "row",
  backgroundColor: colors.background,
  borderTopWidth: 1,
  borderTopColor: colors.palette.neutral200,
  height: 60,
  position: "relative",
  elevation: 8,
})

const $indicator: ThemedStyle<ViewStyle> = ({ colors }) => ({
  position: "absolute",
  width: TAB_WIDTH,
  height: 3,
  backgroundColor: colors.tint,
  bottom: 0,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
})

const $iconContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.xs,
})

const $tab: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
})
