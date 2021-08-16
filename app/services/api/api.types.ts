import { GeneralApiProblem } from "./api-problem"

export interface User {
  id: number
  name: string
}

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem
export type GetCountryResult = { kind: "ok"; country: User } | GeneralApiProblem
export type GetRandomID = { kind: "ok"; randomId: any } | GeneralApiProblem
export type GetAstDataResult = { kind: "ok"; astData: any } | GeneralApiProblem
