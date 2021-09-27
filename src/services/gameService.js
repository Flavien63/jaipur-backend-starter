import * as databaseService from "./databaseService"
import { shuffle } from "lodash"

// Return a shuffled starting deck except 3 camels
function initDeck() {
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
function drawCards(deck, count = 1) {
  const drawCards = []
  for (let i = 0; i < count; i++) {
    drawCards.push(deck.pop())
  }
  return drawCards
}

// Transfer camels from players hand (_players[i].hand) to their herd (_players[i].camelsCount)
function putCamelsFromHandToHerd(game) {
  const curr = game.currentPlayerIndex
  for (let i = 0; i < game._players[curr].hand.length; i++) {
    if (game._players[curr].hand[i] === "Camel")
      game._players[curr].camelsCount++
  }
  game._players[curr].hand = game._players[curr].hand.filter(
    (user) => user !== "Camel"
  )
}

// Create a game object
export function createGame(name) {
  const game = {
    // identifiant de la partie
    id: 1,
    name: "Je vais gagner",
    // pioche
    _deck: initDeck(),
    // marché
    market: ["camel", "camel", "camel"],
    _players: [
      {
        // main
        hand: [],
        // nombre de chameaux
        camelsCount: 0,
        // Score actuel
        score: 0,
      },
      {
        hand: [],
        camelsCount: 0,
        score: 0,
      },
    ],
    // joueur courant (0 ou 1)
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

  game.id = databaseService.getGames().length + 1
  game.market.concat(drawCards(game._deck, 2))
  game._players[0].concat(drawCards(game._deck, 5))
  putCamelsFromHandToHerd(game)
  game.currentPlayerIndex = 1
  game._players[1].concat(drawCards(game._deck, 5))
  putCamelsFromHandToHerd(game)
  game.currentPlayerIndex = 0

  return game
}
