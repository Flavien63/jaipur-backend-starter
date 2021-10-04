import * as databaseService from "./databaseService"
import { shuffle } from "lodash"

// Return a shuffled starting deck except 3 camels
export function initDeck() {
  const deck = Array(6)
    .fill("Diamonds")
    .concat(Array(6).fill("Gold"))
    .concat(Array(6).fill("Silver"))
    .concat(Array(8).fill("Cloth"))
    .concat(Array(8).fill("Spice"))
    .concat(Array(10).fill("Leather"))
    .concat(Array(11 - 3).fill("Camel"))
  return shuffle(deck)
}

// Draw {count} cards of a deck
export function drawCards(deck, count = 1) {
  const drawedCards = []
  for (let i = 0; i < count; i++) {
    drawedCards.push(deck.shift())
  }
  return drawedCards
}

// Transfer camels from players hand (_players[i].hand) to their herd (_players[i].camelsCount)
export function putCamelsFromHandToHerd(game) {
  game._players.forEach((player) => {
    let camelIndex = player.hand.findIndex((card) => card === "camel")
    while (camelIndex !== -1) {
      player.hand.splice(camelIndex, 1)
      player.camelsCount++
      camelIndex = player.hand.findIndex((card) => card === "camel")
    }
  })
}

// Create a game object
export function createGame(name) {
  const deck = initDeck()
  const market = ["Camel", "Camel", "Camel", ...drawCards(deck, 2)]
  const game = {
    // identifiant de la partie
    id: databaseService.getGames().length + 1,
    name,
    market,
    _deck: deck,
    _players: [
      { hand: drawCards(deck, 5), camelsCount: 0, score: 0 },
      { hand: [], camelsCount: 0, score: 0 },
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
    // ne pas oublier de les mélanger au début de la partie
    _bonusTokens: {
      3: [2, 1, 2, 3, 1, 2, 3],
      4: [4, 6, 6, 4, 5, 5],
      5: [8, 10, 9, 8, 10],
    },
    // est-ce que la partie est terminée?
    isDone: false,
  }

  game._players[0].concat(drawCards(game._deck, 5))
  putCamelsFromHandToHerd(game)
  game.currentPlayerIndex = 1
  game._players[1].concat(drawCards(game._deck, 5))
  putCamelsFromHandToHerd(game)
  game.currentPlayerIndex = 0
  databaseService.saveGame(game)

  return game
}
