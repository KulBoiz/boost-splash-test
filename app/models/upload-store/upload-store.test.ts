import { UploadStoreModel } from "./upload-store"

test("can be created", () => {
  const instance = UploadStoreModel.create({})

  expect(instance).toBeTruthy()
})
