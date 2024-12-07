import {
  FlatList,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
  StyleSheet,
  Image,
  ActivityIndicator,
  ImageStyle,
} from "react-native"
import { observer } from "mobx-react-lite"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ThemedStyle } from "@/theme"
import { Text } from "@/components/Text"
import products from "@/utils/mockProducts"
import { useEffect, useState } from "react"

export interface ProductFlatlistProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */

export const ProductFlatlist = observer(function ProductFlatlist(props: ProductFlatlistProps) {
  const { style } = props
  const [isLoading, setIsLoading] = useState(true)
  const { themed } = useAppTheme()
  useEffect(() => {
    prefetchImages()
  }, [])

  const prefetchImages = async () => {
    try {
      const imagePromises = products.map((product) =>
        Image.prefetch(`https://ayurvedic.cz/static/product-images/${product.image_url}`),
      )
      await Promise.all(imagePromises)
    } catch (error) {
      console.error("Failed to prefetch images:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const renderItem = ({ item }) => (
    <View style={themed($itemContainer)}>
      <Image
        source={{ uri: `https://ayurvedic.cz/static/product-images/${item.image_url}` }}
        style={$productImage}
        resizeMode="contain"
        onError={(e) => console.error("Image loading error:", e.nativeEvent.error)}
      />
      <View style={$textContainer}>
        <Text>{item.name}</Text>
        <Text>{item.price}CZK</Text>
        <Text>{item.description}</Text>
      </View>
    </View>
  )

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" style={themed($loader)} />
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      initialNumToRender={5}
      maxToRenderPerBatch={5}
      windowSize={3}
      removeClippedSubviews={true}
    />
  )
})

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  justifyContent: "center",
})

// Item container
const $itemContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  padding: spacing.medium, // Increased padding
  borderBottomWidth: 1,
  borderBottomColor: colors.border,
  alignItems: "center", // Center items vertically
})

// Product image
const $productImage: ImageStyle = {
  width: 120, // Increased width
  height: 120, // Increased height to maintain aspect ratio
  marginRight: 12, // Add spacing between image and text
  borderRadius: 8, // Optional: rounded corners
}

// Text container
const $textContainer: ViewStyle = {
  flexShrink: 1,
}

const $productDescription: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  color: colors.textDim,
  fontFamily: typography.primary.normal,
})

const $loader: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
})
