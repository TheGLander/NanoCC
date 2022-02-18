import shopIcon from "../../img/shopIcon"
import { Building, logic } from "../../logic/logic"
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../const"
import { particles } from "../draw"
import { selectedTab, Tab } from "./tabBase"

let scrollPos = 0

const listHeight = SCREEN_HEIGHT - 25
const listingHeight = listHeight / 3

const shopTab = new Tab("Shop", shopIcon, g => {
	const buildingOffset = Math.floor(scrollPos / listingHeight)
	g.setFontAlign(-1, -1, 0)
	g.setFont("4x6", 3)
	for (let i = 0; i < 4; i++) {
		const building = logic.buildings[i + buildingOffset]
		if (!building) break
		if (((i % 2) + (buildingOffset % 2)) % 2 === 0) g.setColor(g.theme.bgH)
		else g.setColor(g.theme.bg)
		g.fillRect(
			0,
			listingHeight * (i + buildingOffset) - scrollPos,
			SCREEN_WIDTH,
			listingHeight * (i + buildingOffset) - scrollPos + listingHeight
		)
		g.setColor(g.theme.fg)
		g.drawString(
			building.name,
			0,
			listingHeight * (i + buildingOffset) - scrollPos
		)
		g.drawString(
			building.amount,
			g.stringWidth(building.name) + 5,
			listingHeight * (i + buildingOffset) - scrollPos
		)
		g.drawString(
			Math.ceil(building.getPrice()),
			0,
			listingHeight * (i + buildingOffset) - scrollPos + 18
		)
	}
})

Bangle.on("drag", ev => {
	if (selectedTab !== shopTab) return
	scrollPos -= ev.dy
	if (scrollPos < 0) scrollPos = 0
})

Bangle.on("touch", (_btn, xy) => {
	if (selectedTab !== shopTab || !xy) return
	if (xy.y > listHeight) return
	const buildingOffset = Math.floor(scrollPos / listingHeight)
	let selectedBuilding: Building | null = null
	for (let i = 0; i < 4; i++) {
		if (
			Math.abs(
				xy.y -
					(listingHeight * (i + buildingOffset) - scrollPos + listingHeight / 2)
			) <
			listingHeight / 2
		) {
			selectedBuilding = logic.buildings[i + buildingOffset]
			break
		}
	}
	if (!selectedBuilding) return
	if (selectedBuilding.buy())
		particles.push({
			life: 5,
			str: `+1 ${selectedBuilding.name}`,
			x: SCREEN_WIDTH / 2,
			y: SCREEN_HEIGHT / 2,
			size: 3,
		})
})
