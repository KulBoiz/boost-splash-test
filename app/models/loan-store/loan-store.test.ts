import { LoanStoreModel } from "./loan-store"

test("can be created", () => {
  const instance = LoanStoreModel.create({})

  expect(instance).toBeTruthy()
})
