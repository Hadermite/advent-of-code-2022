import fs from "fs"
import path from "path"

type Rucksack = {
	compartment1: string[]
	compartment2: string[]
}

function main() {
	const rucksacks = fs
		.readFileSync(path.join(__dirname, "input.txt"), { encoding: "utf-8" })
		.split("\n")
		.map(rowToRucksack)

	const prioritySum = rucksacks.reduce((value, current) => {
		const duplicatedItems = getDuplicatedItems(current)
		return value + duplicatedItems.map(getPriorityByItem).reduce((value, current) => value + current, 0)
	}, 0)

	console.log(prioritySum)
}

function rowToRucksack(row: string): Rucksack {
	return {
		compartment1: row.substring(0, row.length / 2).split(""),
		compartment2: row.substring(row.length / 2).split(""),
	}
}

function getDuplicatedItems(rucksack: Rucksack): string[] {
	return [...new Set(rucksack.compartment1.filter(item => rucksack.compartment2.includes(item)))]
}

function getPriorityByItem(item: string) {
	return "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(item) + 1
}

main()
