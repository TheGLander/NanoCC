let beepRunning = false

export function beep(seconds: number, power: number) {
	if (beepRunning) {
		console.log("Warn: Beep already executing")
		return
	}
	beepRunning = true
	Bangle.beep(seconds * 1000, power).then(() => (beepRunning = false))
}

let buzzRunning = false

export function buzz(seconds: number, power: number) {
	if (buzzRunning) {
		console.log("Warn: Buzz already executing")
		return
	}
	buzzRunning = true
	Bangle.buzz(seconds * 1000, power).then(() => (buzzRunning = false))
}
