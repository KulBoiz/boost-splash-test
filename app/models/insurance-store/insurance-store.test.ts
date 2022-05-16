import { InsuranceStoreModel } from "./insurance-store"

test("can be created", () => {
  const instance = InsuranceStoreModel.create({})

  expect(instance).toBeTruthy()
})
