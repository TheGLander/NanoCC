import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./const"
import { drawTabs, selectedTab, shownTabText } from "./tabs/tabBase"

interface Particle {
	x: number
	y: number
	str: string
	life: number
	size: number
}

export const particles: Particle[] = []

export function drawEverything(): void {
	g.clear()

	selectedTab.draw(g)
	drawTabs(g)
	g.setFontAlign(0, 0, 0)
	if (shownTabText) {
		g.setFont("4x6", 3)
		g.drawString(shownTabText, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2)
	}

	for (const particle of particles.concat()) {
		g.setFont("4x6", particle.size)
		g.drawString(particle.str, particle.x, particle.y)
		particle.y -= 5
		particle.life--
		if (particle.life < 0) particles.splice(particles.indexOf(particle), 1)
	}
}

setInterval(drawEverything, 1000 / 20)
