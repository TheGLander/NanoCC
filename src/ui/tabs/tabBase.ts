import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../const"

const tabs: Tab[] = []
let selectedTab: Tab

export class Tab {
	constructor(
		public name: string,
		public iconName: string,
		public draw: (this: Tab) => void
	) {
		tabs.push(this)
	}
}

const TABS_Y = SCREEN_HEIGHT - 25

export function initTabs(): void {
	g.clear()
	selectedTab = tabs[0]
	drawTabs()
	selectedTab.draw()
}

export function drawTabs(): void {
	const offset = SCREEN_WIDTH / tabs.length
	g.setColor(g.theme.bg)
	g.fillRect(0, TABS_Y, SCREEN_WIDTH, SCREEN_HEIGHT)

	let i = 0
	for (const tab of tabs) {
		if (tab === selectedTab) {
			g.setColor(g.theme.bgH)
			g.fillRect(i * offset, TABS_Y, (i + 1) * offset, SCREEN_HEIGHT)
		}
		if (tab === selectedTab) g.setColor(g.theme.fgH)
		else g.setColor(g.theme.fg)
		g.drawString(tab.iconName, i * offset, TABS_Y)
		i++
	}
	g.flip()
}

declare var process: NodeJS.Process & {
	env: { HWVERSION: number }
}

const isB2 = process.env.HWVERSION === 2

if (!isB2) {
	setWatch(
		() => {
			selectedTab =
				tabs[(tabs.indexOf(selectedTab) - 1 + tabs.length) % tabs.length]
			g.clear()
			selectedTab.draw()
			drawTabs()
		},
		BTN1,
		{ repeat: true }
	)

	setWatch(
		() => {
			selectedTab = tabs[(tabs.indexOf(selectedTab) + 1) % tabs.length]
			g.clear()
			selectedTab.draw()
			drawTabs()
		},
		new Pin(0),
		{ repeat: true }
	)
} else {
	Bangle.on("touch", (_button, xy) => {
		if (xy.y < TABS_Y) return
		const tab = tabs[Math.floor((xy.x / SCREEN_HEIGHT) * tabs.length)]
		if (!tab) return
		g.clear()
		selectedTab = tab
		selectedTab.draw()
		drawTabs()
	})
}
