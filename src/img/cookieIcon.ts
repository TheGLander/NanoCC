function cookieIcon() {
	return {
		width: 34,
		height: 34,
		bpp: 1,
		buffer: require("heatshrink").decompress(
			atob(
				"//wgf///8AwIHBgAIBA4IIBAYUP/4DBBgMAhnwn/Agc8h/AB4MADgXAngCBgYJD4YjBgYfBDQIXCBgIXBF4UAngDCDQIADDIQABDIImBDQU8nkMCoQBBG4QsCCQMwGoQ5HMpB2HQ4/wA"
			)
		),
	}
}

export default cookieIcon
