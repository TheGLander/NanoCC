let nextId = 0

export class Building {
	baseCps = 0
	basePrice = 0
	id = 0
	amount = 0
	constructor(public logic: Logic, public name: string) {
		this.id = nextId
		nextId++
		this.baseCps = this.id ** (this.id * 0.5 + 2)
		let digits =
			10 ** Math.ceil(Math.log(Math.ceil(this.baseCps)) / Math.LN10) / 100 + 1
		this.baseCps = Math.round(this.baseCps / digits) * digits

		this.basePrice =
			(this.id + 9 + (this.id < 5 ? 0 : 5 * (this.id - 5) ** 1.75)) *
			10 ** this.id *
			Math.max(1, this.id - 14)
		this.basePrice *= 10 ** Math.max(0, this.id - 15)
		digits =
			10 ** Math.ceil(Math.log(Math.ceil(this.basePrice)) / Math.LN10) / 100
		this.basePrice = Math.round(this.basePrice / digits) * digits
	}
	buy(): boolean {
		const price = this.basePrice * this.logic.priceIncrease ** this.amount
		if (this.logic.cookies < price) return false
		this.logic.cookies -= price
		this.amount++
		return true
	}
}

export class Logic {
	cookies = 0
	priceIncrease = 1.15
}

export const logic = new Logic()
