import { AgentStoreModel } from "./agent-store"

test("can be created", () => {
  const instance = AgentStoreModel.create({})

  expect(instance).toBeTruthy()
})
