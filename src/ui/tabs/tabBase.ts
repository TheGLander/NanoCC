import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../const"
import { drawEverything } from "../draw"

const tabs: Tab[] = []
export let selectedTab: Tab

export class Tab {
	constructor(
		public name: string,
		public icon: () => Image,
		public draw: (this: Tab, g: Graphics) => void
	) {
		tabs.push(this)
	}
}

const TABS_Y = SCREEN_HEIGHT - 25

export function drawTabs(g: Graphics): void {
	const offset = SCREEN_WIDTH / tabs.length
	g.setFontAlign(-1, -1, 0)
	g.setFont("4x6", 5)
	g.setColor(g.theme.bg)
	g.fillRect(0, TABS_Y, SCREEN_WIDTH, SCREEN_HEIGHT)

	let i = 0
	for (const tab of tabs) {
		if (tab === selectedTab) {
			g.setColor(g.theme.bgH)
			g.fillRect(i * offset, TABS_Y, (i + 1) * offset, SCREEN_HEIGHT)
		}
		//if (tab === selectedTab) g.setColor(g.theme.fgH)
		//else g.setColor(g.theme.fg)
		const img = tab.icon()
		if (tab === selectedTab)
			img.palette = new Uint16Array([g.theme.fgH, g.theme.bgH])
		else img.palette = new Uint16Array([g.theme.fg, g.theme.bg])
		const imgScale = 25 / img.height
		g.drawImage(
			img,
			i * offset + offset / 2 - (img.width * imgScale) / 2,
			TABS_Y,
			{
				scale: imgScale,
			}
		)

		i++
	}
	g.setColor(g.theme.fg)
}

declare var process: NodeJS.Process & {
	env: { HWVERSION: number }
}

Bangle.on("touch", (_button, xy) => {
	if (xy!.y < TABS_Y) return
	const tab = tabs[Math.floor((xy!.x / SCREEN_HEIGHT) * tabs.length)]
	if (!tab) return
	selectTab(tab)
})

let tabNameTimeout = 0
export let shownTabText: string | null = null

export function selectTab(tab: Tab) {
	const firstTime = !selectedTab
	if (tab === selectedTab) return

	selectedTab = tab

	if (!firstTime) {
		shownTabText = tab.name

		if (tabNameTimeout) clearTimeout(tabNameTimeout)

		tabNameTimeout = setTimeout(() => {
			shownTabText = null
			drawEverything()
		}, 250) as unknown as number
	}
	drawEverything()
}
