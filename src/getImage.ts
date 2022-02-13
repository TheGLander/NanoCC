import fs from "./fs"

const cache: Record<string, () => Image> = {}

function getImage(name: string): Image {
	if (!cache[name]) cache[name] = eval(fs.read("cc-" + name + ".mimg"))
	return cache[name]()
}

export default getImage
