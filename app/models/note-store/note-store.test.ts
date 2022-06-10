import { NoteStoreModel } from "./note-store"

test("can be created", () => {
  const instance = NoteStoreModel.create({})

  expect(instance).toBeTruthy()
})
