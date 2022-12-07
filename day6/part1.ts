import fs from "fs"
import path from "path"

function main() {
	const signal = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8")
	const startOfPacketIndex = findStartOfPacketIndex(signal)
	console.log(startOfPacketIndex)
}

function findStartOfPacketIndex(signal: string): number {
	for (let i = 0; i < signal.length - 3; i++) {
		const characters = [signal[i], signal[i + 1], signal[i + 2], signal[i + 3]]
		if (characters.length === new Set(characters).size) {
			return i + 4
		}
	}

	throw new Error("No packet start found!")
}

main()
