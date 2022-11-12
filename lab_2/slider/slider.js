const sliderLine = document.querySelector('.slider-line')
const width = sliderLine.parentElement.getBoundingClientRect().width
const prevButton = document.querySelector('.btn-prev')
const nextButton = document.querySelector('.btn-next')
const dots = document.querySelectorAll('.dot')
let dotIndex = parseInt(localStorage.dotIndex) || 0
let position = parseInt(localStorage.position) || 0
let direction = 'next'

const moveSlide = (event) => {
	if (event) {
		direction = event.target === nextButton ? 'next' : 'prev'
	}
	dotIndex += direction === 'next' ? 1 : -1
	if (dotIndex > dots.length - 1) dotIndex = 0
	if (dotIndex < 0) dotIndex = dots.length - 1
	position += direction === 'next' ? -width : width
	if (position <= -width * dots.length) position = 0
	if (position > 0) position = -width * (dots.length - 1)
	currentSlide(dotIndex)
	clearInterval(myTimer)
	myTimer = setInterval(moveSlide, 3000)
}

const currentSlide = (index) => {
	for (let dot of dots) {
		dot.classList.remove('active')
	}
	dots[index].classList.add('active')

	sliderLine.style.transform = `translateX(${position}px)`
	localStorage.setItem('dotIndex', index)
	localStorage.setItem('position', sliderLine.style.transform.match(/-?\d+/))
}

nextButton.addEventListener('click', moveSlide)
prevButton.addEventListener('click', moveSlide)

document.addEventListener('keydown', (event) => {
	if (event.code == 'Space' || event.code == 'ArrowRight') {
		direction = 'next'
		moveSlide()
	}
	if (event.code == 'ArrowLeft') {
		direction = 'prev'
		moveSlide()
	}
})

currentSlide(dotIndex)
let myTimer = setInterval(moveSlide, 3000)
