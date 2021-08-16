import React from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, TextStyle, View, ViewStyle } from "react-native"
import { Button, Header, Screen, Text, TextField } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, spacing } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
  justifyContent: "center",
  marginHorizontal: spacing[4],
}
const INPUT: TextStyle = {
  backgroundColor: color.palette.offWhite,
  color: color.palette.black,
  padding: spacing[2],
}
const SUBMIT: ViewStyle = {
  paddingVertical: spacing[4],
  margin: spacing[2],
}
const SUBMIT_TEXT: TextStyle = {
  fontSize: 14,
  fontWeight: "bold",
  textTransform: "uppercase",
}

export const RandomAstInputScreen = observer(function RandomAstInputScreen() {
  // Pull in one of our MST stores
  const { randomStore } = useStores()
  const { ID, changeID, fetchRandomID, isLoading, isAstData, fetchAstData } = randomStore

  // Pull in navigation via hook
  const navigation = useNavigation()

  const onRandomID = async () => {
    await fetchRandomID()
  }

  const onSubmit = async () => {
    let status = await fetchAstData()
    if (status) {
      navigation.navigate("detail")
    }
  }
  return (
    <Screen style={ROOT} preset="scroll">
      <Header />
      <View style={CONTAINER}>
        <TextField
          placeholder={"Enter id"}
          inputStyle={INPUT}
          value={ID}
          onChangeText={(text) => {
            changeID(text)
          }}
        />
        <Button
          disabled={ID ? false : true}
          text={"submit"}
          style={[SUBMIT, { backgroundColor: ID ? color.primary : color.dim }]}
          textStyle={SUBMIT_TEXT}
          onPress={onSubmit}
        >
          {isAstData && <ActivityIndicator size={"small"} color={color.palette.white} />}
        </Button>
        <Button onPress={onRandomID} text={"random id"} style={SUBMIT} textStyle={SUBMIT_TEXT}>
          {isLoading && <ActivityIndicator size={"small"} color={color.palette.white} />}
        </Button>
      </View>
    </Screen>
  )
})
