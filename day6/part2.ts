import fs from "fs"
import path from "path"

function main() {
	const signal = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8")
	const startOfMessageIndex = findStartOfMessageIndex(signal)
	console.log(startOfMessageIndex)
}

function findStartOfMessageIndex(signal: string): number {
	for (let i = 0; i < signal.length - 3; i++) {
		const characters = Array.from(Array(14)).map((_, index) => signal[i + index])
		if (characters.length === new Set(characters).size) {
			return i + 14
		}
	}

	throw new Error("No message start found!")
}

main()
