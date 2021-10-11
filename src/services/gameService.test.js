import * as gameService from "./gameService"

describe("Game service", () => {
  test("should init a deck", () => {
    const defaultDeck = gameService.initDeck()
    expect(defaultDeck.length).toBe(52)
    expect(defaultDeck.filter((card) => card === "Diamonds").length).toBe(6)
    // etc
  })

  test("should draw cards", () => {
    const deck = ["Camel", "Diamonds", "Gold"]
    const drawedCard = gameService.drawCards(deck, 1)
    expect(deck.length).toBe(2)
    expect(drawedCard).toStrictEqual(["Camel"])
  })

  test("should put camels from hand to herd", () => {
    const game = {
      _players: [
        { hand: ["Camel", "Gold"], camelsCount: 0 },
        { hand: ["Gold", "Gold"], camelsCount: 0 },
      ],
    }
    gameService.putCamelsFromHandToHerd(game)
    expect(game._players[0].hand.length).toBe(1)
    expect(game._players[0].hand).toStrictEqual(["Gold"])
    expect(game._players[0].camelsCount).toBe(1)

    expect(game._players[1].hand.length).toBe(2)
    expect(game._players[1].hand).toStrictEqual(["Gold", "Gold"])
    expect(game._players[1].camelsCount).toBe(0)
  })
})