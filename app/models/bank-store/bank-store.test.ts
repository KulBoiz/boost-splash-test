import { BankStoreModel } from "./bank-store"

test("can be created", () => {
  const instance = BankStoreModel.create({})

  expect(instance).toBeTruthy()
})
