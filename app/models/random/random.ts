import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { Alert } from "react-native"
import { Api } from "../../services/api"
import { findRandomItem } from "../../utils/constant"

/**
 * Model description here for TypeScript hints.
 */
const api = new Api()
api.setup()
export const RandomModel = types
  .model("Random")
  .props({
    ID: types.optional(types.string, ""),
    isLoading: types.optional(types.boolean, false),
    astData: types.optional(types.frozen(), []),
    isAstData: types.optional(types.boolean, false),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    changeID(ID: string) {
      self.ID = ID
    },
    fetchRandomID: flow(function* fetchRandomID() {
      try {
        self.isLoading = true
        const response = yield api.getRandomID()

        if (response.kind === "ok") {
          let data = findRandomItem(response.randomId.near_earth_objects)
          console.log("response===", data.id)
          self.ID = data.id
          self.isLoading = false
        } else {
          self.isLoading = false
          Alert.alert("ID not found")
        }
      } catch (error) {
        self.isLoading = false
      }
    }),
    fetchAstData: flow(function* fetchAstData() {
      try {
        self.isAstData = false
        const response = yield api.getAstData(self.ID)
        if (response.kind === "ok") {
          self.astData = response.astData
          self.isAstData = false
          return true
        } else {
          self.astData = null
          self.isAstData = false
          return false
        }
      } catch (error) {
        self.astData = false
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type RandomType = Instance<typeof RandomModel>
export interface Random extends RandomType {}
type RandomSnapshotType = SnapshotOut<typeof RandomModel>
export interface RandomSnapshot extends RandomSnapshotType {}
