import { HomeStoreModel } from "./home-store"

test("can be created", () => {
  const instance = HomeStoreModel.create({})

  expect(instance).toBeTruthy()
})
