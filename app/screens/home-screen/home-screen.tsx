import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { Button, Screen, Text, TextField } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, spacing } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const COINTAINER: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
  justifyContent: "center",
  marginHorizontal: spacing[4],
}
const INPUT: TextStyle = {
  backgroundColor: color.palette.offWhite,
  color: color.palette.black,
}
const SUBMIT: ViewStyle = {
  paddingVertical: spacing[4],
  marginHorizontal: spacing[4],
}
const SUBMIT_TEXT: TextStyle = {
  fontWeight: "bold",
  textTransform: "uppercase",
  fontSize: 14,
}

export const HomeScreen = observer(function HomeScreen() {
  // Pull in one of our MST stores
  const { countryStore } = useStores()
  const { fetchCountryDetail, countryName, changeCountryName } = countryStore

  // Pull in navigation via hook
  const navigation = useNavigation()

  const onSubmit=async()=>{
    let status=await fetchCountryDetail()
    if(status){
      navigation.navigate("countryDetail")
      }
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <View style={COINTAINER}>
        <TextField
          placeholder={"Enter country name"}
          inputStyle={INPUT}
          value={countryName}
          onChangeText={(value) => {
            changeCountryName(value)
          }}
        />
        <Button
          disabled={countryName ? false : true}
          text={"submit"}
          style={[SUBMIT, { backgroundColor: countryName ? color.primary : color.dim }]}
          textStyle={SUBMIT_TEXT}
          onPress={onSubmit}
        />
      </View>
    </Screen>
  )
})
