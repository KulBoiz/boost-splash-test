import { AppStoreModel, AppStore } from "./app-store"

test("can be created", () => {
  const instance: AppStore = AppStoreModel.create({})

  expect(instance).toBeTruthy()
})
