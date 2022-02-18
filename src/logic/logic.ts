let nextId = 0

export interface Save {
	cookies: number
	building: number[]
	lastTime: number
}

export class Logic {
	cookies = 0
	buildings: Building[] = []
	cpc(): number {
		return 1
	}
	clickCookie(): number {
		const cpc = this.cpc()
		this.cookies += cpc
		return cpc
	}
	priceIncrease = 1.15
	cps = 0
	calculateCps(): void {
		this.cps = 0
		for (const building of this.buildings)
			this.cps += building.amount * building.baseCps
	}

	processCps(d: number): void {
		this.cookies += this.cps * (d / 1000)
	}
	makeSave(): Save {
		return {
			cookies: this.cookies,
			building: this.buildings.map(val => val.amount),
			lastTime: Date.now(),
		}
	}
	loadSave(save: Save): void {
		this.cookies = save.cookies
		save.building.forEach((val, i) => (this.buildings[i].amount = val))
		this.calculateCps()
		this.processCps(Date.now() - save.lastTime)
	}
}

export const logic = new Logic()

export class Building {
	baseCps = 0
	basePrice = 0
	id = 0
	amount = 0
	constructor(public name: string) {
		this.id = nextId
		nextId++
		this.baseCps = Math.ceil(this.id ** (this.id * 0.5 + 2) * 10) / 10
		let digits =
			10 ** Math.ceil(Math.log(Math.ceil(this.baseCps)) / Math.LN10) / 100
		this.baseCps = Math.round(this.baseCps / digits) * digits

		this.basePrice =
			(this.id + 9 + (this.id < 5 ? 0 : 5 * (this.id - 5) ** 1.75)) *
			10 ** this.id *
			Math.max(1, this.id - 14)
		this.basePrice *= 10 ** Math.max(0, this.id - 15)
		digits =
			10 ** Math.ceil(Math.log(Math.ceil(this.basePrice)) / Math.LN10) / 100
		this.basePrice = Math.round(this.basePrice / digits) * digits
		if (this.id === 0) {
			this.baseCps = 0.1
			this.basePrice = 15
		}
		logic.buildings.push(this)
	}
	getPrice(): number {
		return this.basePrice * logic.priceIncrease ** this.amount
	}
	buy(): boolean {
		const price = this.getPrice()
		if (logic.cookies < price) return false
		logic.cookies -= price
		this.amount++
		logic.calculateCps()
		return true
	}
}

new Building("Cursor")
new Building("Grandma")
new Building("Farm")
new Building("Mine")
new Building("Factory")
new Building("Bank")
new Building("Temple")
new Building("Wizard tower")
new Building("Shipment")
