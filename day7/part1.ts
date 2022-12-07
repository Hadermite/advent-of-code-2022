import fs from "fs"
import path from "path"

type Directory = {
	files: { fileName: string; size: number }[]
	directories: Record<string, Directory>
}

function main() {
	const fileSystem = parseLines(fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8").split("\n"))
	const directorySizes = getDirectorySizes(fileSystem, [])
	const smallDirectories = Object.entries(directorySizes).filter(([, size]) => size <= 100000)
	console.log(smallDirectories.reduce((value, current) => value + current[1], 0))
}

function parseLines(lines: string[]) {
	let result: Directory = { directories: {}, files: [] }
	let currentDirectory: string[] = []
	for (let line of lines) {
		if (line.startsWith("$")) {
			const command = line.substring(2).split(" ")
			if (command[0] === "cd") {
				const directory = command[1]
				if (directory === "/") {
					currentDirectory = []
				} else if (directory === "..") {
					currentDirectory.pop()
				} else {
					currentDirectory.push(command[1])
				}
			}
		} else {
			const [size, fileName] = line.split(" ")
			if (size === "dir") continue

			let cursor = result
			for (let directory of currentDirectory) {
				if (cursor.directories[directory] === undefined) {
					cursor.directories[directory] = { directories: {}, files: [] }
				}
				cursor = cursor.directories[directory]
			}

			cursor.files.push({ fileName, size: parseInt(size) })
		}
	}
	return result
}

function getDirectorySizes(directory: Directory, path: string[]): Record<string, number> {
	let result: Record<string, number> = {}
	result[`${path.join(".")}`] = getDirectorySize(directory)
	for (const [subDirectoryName, subDirectory] of Object.entries(directory.directories)) {
		result = {
			...result,
			...getDirectorySizes(subDirectory, [...path, subDirectoryName]),
		}
	}
	return result
}

function getDirectorySize(directory: Directory): number {
	const filesSize = directory.files.reduce((value, file) => value + file.size, 0)
	const directoriesSize = Object.values(directory.directories).reduce(
		(value, directory) => value + getDirectorySize(directory),
		0
	)
	return filesSize + directoriesSize
}

main()
