import { InvestStoreModel } from "./invest-store"

test("can be created", () => {
  const instance = InvestStoreModel.create({})

  expect(instance).toBeTruthy()
})
