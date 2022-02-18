import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./const"
import { drawTabs, selectedTab, shownTabText } from "./tabs/tabBase"

interface Particle {
	x: number
	y: number
	str: string
	life: number
}

export const particles: Particle[] = []

export function drawEverything(): void {
	g.clear()
	selectedTab.draw(g)
	drawTabs(g)
	if (shownTabText) {
		g.setFontAlign(0, 0, 0)
		g.setFont("4x6", 3)
		g.drawString(shownTabText, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2)
	}
	g.setFontAlign(-1, -1, 0)
	g.setFont("4x6", 2)
	for (const particle of particles.concat()) {
		g.drawString(particle.str, particle.x, particle.y)
		particle.y -= 5
		particle.life--
		if (particle.life < 0) particles.splice(particles.indexOf(particle), 1)
	}
}

setInterval(drawEverything, 1000 / 20)
