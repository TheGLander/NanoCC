import { beep, buzz } from "./audio"
import espruinoImage from "./espruinoImage"
import fs from "./fs"
import waitForKey from "./waitForKey"

let num: number

if (fs.list().includes("exampleN.txt")) num = parseInt(fs.read("exampleN.txt"))
else num = 0

setWatch(
	() => {
		beep(1, 600)
	},
	BTN4,
	{ edge: "rising", debounce: 5, repeat: true }
)

const coolNumberFunction = () => {
	delete mainMenu["Cool number " + num]
	num++
	fs.write("exampleN.txt", num.toString())
	mainMenu["Cool number " + num] = coolNumberFunction
	E.showMenu(mainMenu)
}

const mainMenu = {
	"": { title: "Test" },
	Buzz: () => {
		buzz(2.5, 1000)
	},
	"Rate I": {
		value: 0,
		min: 0,
		max: 100,
		format: (val: number) => {
			let ret = ""
			for (let i = 0; i < val; i += 20) ret += val - i === 10 ? "i" : "I"
			return ret
		},
		step: 10,
	},
	"Submit I": async () => {
		const response = await E.showPrompt("Really submit I?")
		if (response) {
			await E.showAlert("I submitted!") // Not really...
			E.showMenu(mainMenu)
		} else E.showMenu(mainMenu)
	},
	"Show Image": async () => {
		E.showMenu(undefined)
		g.clear()
		g.drawImage(
			espruinoImage,
			120 - (espruinoImage.width * 3.5) / 2,
			120 - (espruinoImage.height * 3.5) / 2,
			{ scale: 3.5 }
		)
		await waitForKey(BTN2)
		E.showMenu(mainMenu)
	},
}

mainMenu["Cool number " + num] = coolNumberFunction

E.showMenu(mainMenu)
