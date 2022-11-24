import { VietQrStoreModel } from "./VietQrStore"

test("can be created", () => {
  const instance = VietQrStoreModel.create({})

  expect(instance).toBeTruthy()
})
