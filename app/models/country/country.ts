import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { Alert } from "react-native"
import { Api } from "../../services/api"

/**
 * Model description here for TypeScript hints.
 */
const api=new Api()
api.setup()
export const CountryModel = types
  .model("Country")
  .props({
    countryData:types.optional(types.frozen(),null),
    isLoading:types.optional(types.boolean,false),
    countryName:types.optional(types.string,"")
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    fetchCountryDetail:flow(function* fetchCountryDetail(){
      try {
        self.isLoading=true
        const response=yield api.getCountryDetail(self.countryName)
        if(response.kind==="ok"){
          console.log("response===",response);
          let data=response.country
          for (let index = 0; index < data.length; index++) {
            if(data[index].name===self.countryName){
              self.countryData=data[index]
            }else{
              self.countryData=data[0]
            }
            
          }
          self.isLoading=false
          return true
        }else{
          self.isLoading=false;
          self.countryData=null;
          Alert.alert("Data not found")
          return false

        }
      } catch (error) {
        
      }
    }),
    changeCountryName(countryName:String){
self.countryName=countryName
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type CountryType = Instance<typeof CountryModel>
export interface Country extends CountryType {}
type CountrySnapshotType = SnapshotOut<typeof CountryModel>
export interface CountrySnapshot extends CountrySnapshotType {}
