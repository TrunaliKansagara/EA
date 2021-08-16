import React from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { Screen, Text,Header } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { TextStyle } from "react-native"
import { SvgUri } from "react-native-svg"
const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const TITLE:TextStyle={
  fontWeight:"bold",
  color:color.palette.black
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
  justifyContent:"center",
  marginHorizontal:spacing[6],
}
const ROWS:ViewStyle={
  flexDirection:"row",
  flexWrap:"wrap",
  alignItems:"center"
}
export const CountryDetailScreen = observer(function CountryDetailScreen() {
  // Pull in one of our MST stores
  const {countryStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  
  const onLeftIconPress=()=>{
    navigation.goBack()
  }

  const renderRows=(title:string,value:string)=>{
    return(
      <View style={ROWS}>
        <Text text={title+ " : "} preset={"bold"} />
        <Text text={value} />
      </View>
    )
  }
  return (
    <Screen style={ROOT} preset="scroll">
      <Header leftIcon={"back"} headerText={"Country Detail"} titleStyle={TITLE} onLeftPress={onLeftIconPress} />
   <View style={CONTAINER}>
     {renderRows("Capital",countryStore.countryData.capital)}
     <View style={ROWS}>
    <Text text={"Flag : "} preset={"bold"} />
    <SvgUri uri={countryStore.countryData.flag}  height={50} width={50}/>
     </View>
     </View>

    </Screen>
  )
})
