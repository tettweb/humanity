const html = document.documentElement
const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

const frameCount = 1176
const currentFrame = index =>
	`sequence/${index.toString().padStart(4, '0')}.jpg`

const preloadImages = () => {
	for (let i = 0; i < frameCount; i++) {
		const img = new Image()
		img.src = currentFrame(i)
	}
}

const img = new Image()
img.src = currentFrame(0)
canvas.width = 720
canvas.height = 1280
img.onload = () => {
	context.drawImage(img, 0, 0)
}

const updateImage = index => {
	img.src = currentFrame(index)
	context.drawImage(img, 0, 0)
}

window.addEventListener('scroll', () => {
	const scrollTop = html.scrollTop
	const maxScrollTop = html.scrollHeight - window.innerHeight
	const scrollProgress = scrollTop / maxScrollTop
	const frameIndex = Math.min(
		frameCount - 1,
		Math.ceil(scrollProgress * frameCount),
	)

	requestAnimationFrame(() => updateImage(frameIndex + 1))
})

preloadImages()
