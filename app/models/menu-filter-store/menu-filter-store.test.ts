import { MenuFilterStoreModel } from "./menu-filter-store"

test("can be created", () => {
  const instance = MenuFilterStoreModel.create({})

  expect(instance).toBeTruthy()
})
