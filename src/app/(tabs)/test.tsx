import { Alert, View } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Screen, Text } from "@/components"
import { useEffect, useState } from "react"
import { router, useFocusEffect } from "expo-router"
import { useStripe } from "@stripe/stripe-react-native"
import products from "@/utils/mockProducts"
import { ProductFlatlist } from "@/components/ProductFlatlist"
export default observer(() => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe()
  const [loading, setLoading] = useState(false)

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`https://dev.ayurvedic.digital/api/v1/paymentDemo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const { paymentIntent, ephemeralKey, customer } = await response.json()

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    }
  }

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams()

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: "Jane Doe",
      },
    })
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message)
    } else {
      setLoading(true)
    }
  }

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet()
    console.log("error", error)
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message)
    } else {
      Alert.alert("Success", "Your order is confirmed!")
      router.push("/")
    }
  }
  useEffect(() => {
    initializePaymentSheet()
  }, [])
  return (
    <Screen safeAreaEdges={["top"]}>
      <ProductFlatlist />
      <Button disabled={!loading} text="checkout" onPress={openPaymentSheet} />
    </Screen>
  )
})
