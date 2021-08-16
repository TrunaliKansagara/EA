import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { CountryModel } from "../country/country"
import { RandomModel } from "../random/random"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
    countryStore:types.optional(CountryModel,{}),
    randomStore:types.optional(RandomModel,{})

})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
