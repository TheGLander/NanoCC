import getImage from "../../getImage"
import { logic } from "../../logic/logic"
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../const"
import { particles } from "../draw"
import { selectedTab, Tab } from "./tabBase"

const cookieTab = new Tab("Cookie", "CKI", g => {
	const perfectCookie = getImage("pcookie")
	g.drawImage(
		perfectCookie,
		(SCREEN_WIDTH - perfectCookie.width * 2) / 2,
		(SCREEN_HEIGHT - perfectCookie.height * 2) / 2,
		{ scale: 2 }
	)
	g.setFontAlign(0, 0, 0)
	g.setFont("4x6", 2)
	g.drawString(
		`${logic.cookies} cookie${logic.cookies === 1 ? "" : "s"}`,
		SCREEN_WIDTH / 2,
		10
	)
})

export default cookieTab

Bangle.on("touch", (_btn, xy) => {
	if (selectedTab !== cookieTab) return
	if (!xy)
		xy = { x: Math.random() * SCREEN_WIDTH, y: Math.random() * SCREEN_HEIGHT }
	const cpc = logic.clickCookie()
	particles.push({ x: xy.x, y: xy.y, str: `+${cpc}`, life: 5, size: 2 })
})
