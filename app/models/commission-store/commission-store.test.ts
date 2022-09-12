import { CommissionStoreModel } from "./commission-store"

test("can be created", () => {
  const instance = CommissionStoreModel.create({})

  expect(instance).toBeTruthy()
})
