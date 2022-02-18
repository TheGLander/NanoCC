let nextId = 0

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
	buy(): boolean {
		const price = this.basePrice * logic.priceIncrease ** this.amount
		if (logic.cookies < price) return false
		logic.cookies -= price
		this.amount++
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
