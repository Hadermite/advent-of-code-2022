import fs from "fs"
import path from "path"

type Rucksack = {
	items: string[]
}

function main() {
	const rucksacks: Rucksack[] = fs
		.readFileSync(path.join(__dirname, "input.txt"), { encoding: "utf-8" })
		.split("\n")
		.map(row => ({ items: row.split("") }))

	const groupBadges = divideIntoGroups(rucksacks).map(getGroupBadge)

	const prioritySum = groupBadges.reduce((value, current) => value + getPriorityByItem(current), 0)

	console.log(prioritySum)
}

function divideIntoGroups(rucksacks: Rucksack[]): Rucksack[][] {
	let groups: Rucksack[][] = []
	for (let i = 0; i < rucksacks.length; i += 3) {
		groups.push([rucksacks[i], rucksacks[i + 1], rucksacks[i + 2]])
	}
	return groups
}

function getGroupBadge(group: Rucksack[]): string {
	const first = group[0]
	const others = group.slice(1)

	return first.items.find(item => others.every(other => other.items.includes(item)))!
}

function getPriorityByItem(item: string) {
	return "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(item) + 1
}

main()
