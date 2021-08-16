import { RandomModel, Random } from "./random"

test("can be created", () => {
  const instance: Random = RandomModel.create({})

  expect(instance).toBeTruthy()
})