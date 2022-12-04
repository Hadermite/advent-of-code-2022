import fs from "fs"
import path from "path"

type Pair = {
	sections: {
		elf1: number[]
		elf2: number[]
	}
}

function main() {
	const pairsWithFullOverlap = fs
		.readFileSync(path.join(__dirname, "input.txt"), { encoding: "utf-8" })
		.split("\n")
		.map(rowToPair)
		.filter(isAnyFilledByOther)

	console.log(pairsWithFullOverlap.length)
}

function rowToPair(row: string): Pair {
	const match = /(\d+)-(\d+),(\d+)-(\d+)/.exec(row)!
	const elf1 = { start: parseInt(match[1]), end: parseInt(match[2]) }
	const elf2 = { start: parseInt(match[3]), end: parseInt(match[4]) }
	return {
		sections: {
			elf1: Array.from(Array(elf1.end - elf1.start + 1)).map((_, index) => index + elf1.start),
			elf2: Array.from(Array(elf2.end - elf2.start + 1)).map((_, index) => index + elf2.start),
		},
	}
}

function isAnyFilledByOther(pair: Pair): boolean {
	if (pair.sections.elf1.length > pair.sections.elf2.length)
		return pair.sections.elf2.every(section => pair.sections.elf1.includes(section))
	else return pair.sections.elf1.every(section => pair.sections.elf2.includes(section))
}

main()
