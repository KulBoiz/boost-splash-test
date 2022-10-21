import { EkycStoreModel } from "./ekyc-store"

test("can be created", () => {
  const instance = EkycStoreModel.create({})

  expect(instance).toBeTruthy()
})
