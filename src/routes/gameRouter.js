import express from "express"
import * as gameService from "../services/gameService"

const router = express.Router()

// Listen to POST /games
router.post("/", function (req, res) {
  if (!req.body.name)
    res.status(400)
  //return 400 if req.body.name doesn't exist
  else {
    const newGame = gameService.createGame(req.body.name)
    res.status(201).json(newGame)
  }
})

export default router