import fs from "fs"
import path from "path"

function main() {
	const input = fs.readFileSync(path.join(__dirname, "input.txt"), { encoding: "utf-8" })
	const elves = input
		.split("\n\n")
		.map(elve => elve.split("\n").reduce((value, current) => value + parseInt(current), 0))

	const mostCalories = Math.max(...elves)

	console.log(mostCalories)
}

main()
