import { BankerStoreModel } from "./banker-store"

test("can be created", () => {
  const instance = BankerStoreModel.create({})

  expect(instance).toBeTruthy()
})
