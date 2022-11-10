const sliderLine = document.querySelector('.slider-line'),
	sliders = document.querySelectorAll('.slider-item'),
	prevButton = document.querySelector('.btn-prev'),
	nextButton = document.querySelector('.btn-next'),
	dots = document.querySelectorAll('.dot')
let position = 0,
	dotIndex = 0

const nextSlide = () => {
	if (position < (dots.length - 1) * 720) {
		position += 720

		dotIndex++
		console.log(dotIndex)
	} else {
		position = 0
		dotIndex = 0
	}
	// sliderLine.style.left = -position + 'px'
	sliderLine.style.transform = `translateX(${-position}px)`
	currentSlide(dotIndex)
	clearInterval(myTimer)
	myTimer = setInterval(nextSlide, 3000)
}

const prevSlide = () => {
	if (position > 0) {
		position -= 720
		dotIndex--
	} else {
		position = (dots.length - 1) * 720
		dotIndex = dots.length - 1
	}
	sliderLine.style.transform = `translateX(${-position}px)`
	currentSlide(dotIndex)
	clearInterval(myTimer)
	myTimer = setInterval(prevSlide, 3000)
}

const currentSlide = (index) => {
	for (let dot of dots) {
		dot.classList.remove('active')
	}
	dots[index].classList.add('active')
}

nextButton.addEventListener('click', nextSlide)
prevButton.addEventListener('click', prevSlide)

document.addEventListener('keydown', (event) => {
	if (event.code == 'Space' || event.code == 'ArrowRight') nextSlide()
	if (event.code == 'ArrowLeft') prevSlide()
})

dots.forEach((dot, index) => {
	dot.addEventListener('click', () => {
		position = 720 * index
		sliderLine.style.left = -position + 'px'
		dotIndex = index
		currentSlide(dotIndex)
	})
})

let myTimer = setInterval(nextSlide, 3000)
