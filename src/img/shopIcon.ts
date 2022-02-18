function shopIcon() {
	return {
		width: 40,
		height: 40,
		bpp: 1,
		buffer: require("heatshrink").decompress(
			atob(
				"//w/4ACAgfw4EwAg3ACwM/Ah/wgAdDAgYOBhgTDAgUAh8Mh4EHAIIEFGJZcBAgpKMngEFNAXAh4EEPgUAgYEFAAMA4YEG/g4DAggYGAho2CAg38X4YEB"
			)
		),
	}
}

export default shopIcon
