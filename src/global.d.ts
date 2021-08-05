declare interface Image {
	width: number
	height: number
	bpp?: number
	buffer: ArrayBuffer | string
	transparent?: number
	palette?: Uint16Array
}

declare class Graphics {
	drawImage(
		image: Image | string,
		x: number,
		y: number,
		options?: { rotate?: number; scale?: number }
	): Graphics
	reset(): void
	setFontAlign(x: -1 | 0 | 1, y: -1 | 0 | 1, rotation: 0 | 1 | 2 | 3): Graphics
	setFont(name?: "4x6" | "Vector12", size?: number): Graphics
}
declare const g: Graphics
declare const BTN1: Pin
declare const BTN2: Pin
declare const BTN3: Pin
declare const BTN4: Pin
declare const BTN5: Pin
declare class Bangle {
	constructor()
	static setLCDPower: (isOn: boolean) => void
	static setLCDTimeout: (isOn: number) => void
	static setPollInterval: (interval: number) => void
	static setLCDPalette: (palette: unknown) => void
	static setGestureOptions: (options: unknown) => void
	static isLCDOn: () => boolean
	static isCharging: () => boolean
	static lcdWr: (cmd: number, data: unknown) => void
	static dbg: () => unknown
	static accelWr: (reg: number, data: number) => void
	static accelRd: (reg: number, cnt: number) => unknown
	static project: (latlong: unknown) => unknown
	static buzz: (time: number, strength: number) => Promise<unknown>
	static off: () => void
	static setLCDBrightness: (brightness: number) => void
	static setLCDMode: (mode: unknown) => void
	static getLCDMode: () => unknown
	static setLCDOffset: (y: number) => void
	static setOptions: (options: unknown) => void
	static getCompass: () => unknown
	static getAccel: () => unknown
	static F_BEEPSET: boolean
	static compassWr: (reg: number, data: number) => void
	static ioWr: (mask: number, isOn: number) => void
	static beep: (time: number, freq: number) => Promise<unknown>
	static getLogo: () => unknown
	static loadWidgets: () => void
	static drawWidgets: () => void
	static showLauncher: () => void
}

interface Widget {
	/**
	 * tl (top left), tr (top right), bl (bottom left), br (bottom right)
	 */
	area: "tl" | "tr" | "bl" | "br"
	/**
	 * Width of the widget
	 */
	width: number
	draw: (self: Widget & { x: number; y: number }) => void
}

declare const WIDGETS: Record<string, Widget>

declare namespace KindaStorage {
	function eraseAll(): void
	function erase(name: string): void
	function read(name: string, offset?: number, length?: number): string
	function readJSON(name: string, noExceptions?: boolean): unknown
	function readArrayBuffer(name: string): ArrayBuffer
	function writeJSON(name: string, data: any): boolean
	function write(
		name: string,
		data: string,
		offset?: number,
		size?: number
	): boolean
	function list(regex?: RegExp): string[]
	function compact(): void
	function debug(): void
	function getFree(): number
}

declare module "Storage" {
	export default KindaStorage
}

declare interface MenuOptions {
	/** optional, the menu's title */
	title?: string
	/** optional, first selected menu item's index */
	selected?: number
	/** optional, height of the font being used (default is 6) */
	fontHeight?: number
	/** optional, y offset of menu */
	y?: number
	/** optional, x offset of menu */
	x?: number
	/** optional, x coordinate of right of menu */
	x2?: number
	/** optional, y coordinate of right of menu */
	y2?: number
	/** optional, background colour */
	cB?: number
	/** optional, foreground colour */
	cF?: number
	/** optional, background colour of highlighted item */
	cHB?: number
	/** optional, foreground colour of highlighted item */
	cHF?: number
	/**
	 * optional; function called before menu is drawn
	 * (you could for instance set the font in here)
	 */
	predraw?: (gfx: Graphics) => void
	/**
	 * optional, function called after menu is drawn,
	 * before it's sent to the screen.
	 * less is true if there are menu items off the top of the screen
	 * more is true if there are menu items off the bottom of the screen debugger eval code:1:9
	 */
	preflip?: (gfx: Graphics, less: boolean, more: boolean) => void
}

declare interface MenuOption<T extends number | boolean = number | boolean> {
	value: T
	step?: number
	min?: number
	max?: number
	onchange?: (val: T) => void
	format?: (val: T) => string
}

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never }
type XOR<T, U> = T | U extends object
	? (Without<T, U> & U) | (Without<U, T> & T)
	: T | U

declare type Menu = { ""?: MenuOptions } & {
	[key in string]: XOR<MenuOptions, MenuOption> | (() => void)
}

declare interface PromptOptions<T> {
	title?: string
	buttons?: Record<string, T>
}

declare namespace E {
	function showMenu(menu?: Menu): void
	function showAlert(message?: string, title?: string): Promise<void>
	function showMessage(message?: string, title?: string): void
	function showPrompt<T = boolean>(
		message?: string,
		options?: PromptOptions<T>
	): Promise<T>
}

interface SetWatchParameters<D extends Pin | undefined> {
	repeat?: boolean
	edge?: "falling" | "rising" | "both"
	debounce?: number
	irq?: boolean
	data?: D
}
interface SetWatchCallbackArg<D extends Pin | undefined> {
	state: boolean
	time: number
	lastTime: number
	data: D
}

type SetWatchCallback<D extends Pin | undefined> = (
	arg: SetWatchCallbackArg<D>
) => void

declare function setWatch(
	callback: SetWatchCallback<undefined>,
	pin: Pin,
	params: SetWatchParameters<undefined>
): number
declare function setWatch(
	callback: SetWatchCallback<Pin>,
	pin: Pin,
	params: SetWatchParameters<Pin>
): number
