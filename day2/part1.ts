import fs from "fs"
import path from "path"

const moveScores = {
	rock: 1,
	paper: 2,
	scissors: 3,
}

type Move = keyof typeof moveScores

type Round = { me: Move; opponent: Move }

function main() {
	const moves = fs.readFileSync(path.join(__dirname, "input.txt"), { encoding: "utf-8" }).split("\n").map(rowToRound)
	const totalScore = moves.reduce((value, current) => value + getRoundScore(current), 0)
	console.log(totalScore)
}

function rowToRound(row: string): Round {
	const parts = row.split(" ")
	return {
		me: parts[1] === "X" ? "rock" : parts[1] === "Y" ? "paper" : "scissors",
		opponent: parts[0] === "A" ? "rock" : parts[0] === "B" ? "paper" : "scissors",
	}
}

function getRoundScore(round: Round): number {
	const result = getRoundResult(round)

	const moveScore = moveScores[round.me]

	switch (result) {
		case "loss":
			return moveScore
		case "tie":
			return moveScore + 3
		case "win":
			return moveScore + 6
	}
}

function getRoundResult(round: Round): "win" | "tie" | "loss" {
	if (round.me === round.opponent) return "tie"
	switch (round.me) {
		case "rock":
			return round.opponent === "scissors" ? "win" : "loss"
		case "paper":
			return round.opponent === "rock" ? "win" : "loss"
		case "scissors":
			return round.opponent === "paper" ? "win" : "loss"
	}
}

main()
