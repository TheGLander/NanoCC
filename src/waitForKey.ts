function waitForKey(pin: Pin): Promise<void> {
	return new Promise(res => {
		setWatch(() => res(), pin, {
			repeat: false,
		})
	})
}

export default waitForKey
