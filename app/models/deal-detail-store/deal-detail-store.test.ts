import { DealDetailStoreModel } from "./deal-detail-store"

test("can be created", () => {
  const instance = DealDetailStoreModel.create({})

  expect(instance).toBeTruthy()
})
