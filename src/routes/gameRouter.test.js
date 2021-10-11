import request from "supertest"
import app from "../app"
import lodash from "lodash"

// Prevent database service to write tests game to filesystem
jest.mock("fs")

// Prevent shuffle for tests
jest.mock("lodash")
lodash.shuffle.mockImplementation((array) => array)

describe("Game router", () => {
  test("should create a game", async () => {
    const expectedGame = {
      id: 1,
      name: "test",
      market: ["Camel", "Camel", "Camel", "Diamonds", "Diamonds"],
      _deck: [
        "Silver",
        "Silver",
        "Silver",
        "Silver",
        "Silver",
        "Silver",
        "Cloth",
        "Cloth",
        "Cloth",
        "Cloth",
        "Cloth",
        "Cloth",
        "Cloth",
        "Cloth",
        "Spice",
        "Spice",
        "Spice",
        "Spice",
        "Spice",
        "Spice",
        "Spice",
        "Spice",
        "Leather",
        "Leather",
        "Leather",
        "Leather",
        "Leather",
        "Leather",
        "Leather",
        "Leather",
        "Leather",
        "Leather",
        "Camel",
        "Camel",
        "Camel",
        "Camel",
        "Camel",
        "Camel",
        "Camel",
        "Camel",
      ],
      _players: [
        {
          hand: ["Diamonds", "Diamonds", "Diamonds", "Diamonds", "gold"],
          camelsCount: 0,
          score: 0,
        },
        {
          hand: ["gold", "gold", "gold", "gold", "gold"],
          camelsCount: 0,
          score: 0,
        },
      ],
      currentPlayerIndex: 0,
      tokens: {
        diamonds: [7, 7, 5, 5, 5],
        gold: [6, 6, 5, 5, 5],
        silver: [5, 5, 5, 5, 5],
        cloth: [5, 3, 3, 2, 2, 1, 1],
        spice: [5, 3, 3, 2, 2, 1, 1],
        leather: [4, 3, 2, 1, 1, 1, 1, 1, 1],
      },
      _bonusTokens: {
        3: [2, 1, 2, 3, 1, 2, 3],
        4: [4, 6, 6, 4, 5, 5],
        5: [8, 10, 9, 8, 10],
      },
      isDone: false,
    }

    const response = await request(app).post("/games").send({ name: "test" })
    expect(response.statusCode).toBe(201)
    expect(response.body).toStrictEqual(expectedGame)
  })
})