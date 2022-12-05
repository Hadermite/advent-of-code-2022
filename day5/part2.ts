import fs from "fs"
import path from "path"

type Stacks = string[][]
type Movement = { fromIndex: number; toIndex: number; count: number }

function main() {
	const parts = fs.readFileSync(path.join(__dirname, "input.txt"), { encoding: "utf-8" }).split("\n\n")
	const stacks = parseStacks(parts[0])
	const movements = parts[1].split("\n").map(parseMovement)
	for (const movement of movements) {
		executeMovement(movement, stacks)
	}
	const topStacks = stacks.map(stack => stack[stack.length - 1])
	console.log(topStacks.join(""))
}

function parseStacks(text: string): Stacks {
	const stacksRows = text.split("\n").slice(0, -1).reverse()
	let stacks: Stacks = []
	for (let i = 0; i < stacksRows[0].length; i += 4) {
		const rows = stacksRows.map(row => row.substring(i + 1, i + 2)).filter(crate => crate !== " ")
		stacks.push(rows)
	}
	return stacks
}

function parseMovement(movement: string): Movement {
	const regex = /move (?<count>\d+) from (?<fromIndex>\d+) to (?<toIndex>\d+)/
	const result = regex.exec(movement)!
	return {
		fromIndex: parseInt(result.groups!.fromIndex) - 1,
		toIndex: parseInt(result.groups!.toIndex) - 1,
		count: parseInt(result.groups!.count),
	}
}

function executeMovement(movement: Movement, stacks: Stacks) {
	for (let i = movement.count - 1; i >= 0; i--) {
		const fromStack = stacks[movement.fromIndex]
		const [crate] = fromStack.splice(fromStack.length - i - 1, 1)
		stacks[movement.toIndex].push(crate)
	}
}

main()
