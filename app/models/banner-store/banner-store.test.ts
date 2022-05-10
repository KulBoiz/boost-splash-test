import { BannerStoreModel } from "./banner-store"

test("can be created", () => {
  const instance = BannerStoreModel.create({})

  expect(instance).toBeTruthy()
})
