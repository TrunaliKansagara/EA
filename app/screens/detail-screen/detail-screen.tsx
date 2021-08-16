import React from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { Screen, Text, Header } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { TextStyle } from "react-native"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  marginHorizontal: spacing[4],
}
const ROWS: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
}
const TITLE: TextStyle = {}
const VALUE: TextStyle = {}

export const DetailScreen = observer(function DetailScreen() {
  // Pull in one of our MST stores
  const { randomStore } = useStores()

  const { astData } = randomStore
  console.log(astData.nasa_jpl_url)

  const renderRows = (title: string, value: any) => {
    return (
      <View style={ROWS}>
        <Text text={title + " : "} preset={"bold"} />
        <Text text={value} />
      </View>
    )
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <Header leftIcon={"back"} headerText={"Detail"} />
      <View style={CONTAINER}>
        {renderRows("name", astData.name)}
        {renderRows("nasa ipl url", astData.nasa_jpl_url)}
        {renderRows(
          "is_potentially_hazardous_asteroid",
          astData.is_potentially_hazardous_asteroid.toString(),
        )}
      </View>
    </Screen>
  )
})
