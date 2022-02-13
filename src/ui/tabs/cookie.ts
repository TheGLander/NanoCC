import getImage from "../../getImage"
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../const"
import { Tab } from "./tabBase"

new Tab("Cookie", "CKI", () => {
	const perfectCookie = getImage("pcookie")
	g.drawImage(
		perfectCookie,
		(SCREEN_WIDTH - perfectCookie.width * 2) / 2,
		(SCREEN_HEIGHT - perfectCookie.height * 2) / 2,
		{ scale: 2 }
	)
})
