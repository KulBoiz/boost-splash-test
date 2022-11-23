import { AssetStoreModel } from "./asset-store"

test("can be created", () => {
  const instance = AssetStoreModel.create({})

  expect(instance).toBeTruthy()
})
