const oneMin = document.querySelector('.one-min')
const fiveMin = document.querySelector('.five-min')
const tenMin = document.querySelector('.ten-min')

const minInput = document.getElementById('min-input')
const secInput = document.getElementById('sec-input')

const startBtn = document.querySelector('.start')
const stopBtn = document.querySelector('.stop')
const resetBtn = document.querySelector('.reset')

const alarm = new Audio('./assets/alarm.mp3')

let time = 0
let isStopped = true
let sec = 0,
	min = 0

stopBtn.disabled = true
resetBtn.disabled = false

oneMin.disabled = true
fiveMin.disabled = true
tenMin.disabled = true

minInput.readOnly = true
secInput.readOnly = true

if (!localStorage.isStarted) localStorage.setItem('isStarted', false)

if (localStorage.sec) sec = parseInt(localStorage.sec)
else localStorage.setItem('sec', 0)

if (localStorage.min) min = parseInt(localStorage.min)
else localStorage.setItem('min', 0)

const onFinish = () => {
	if (localStorage.isStarted === 'true') {
		document.body.classList.add('alarm')
		alarm.play()
		isStopped = true
		stopBtn.disabled = true
		resetBtn.disabled = false
		minInput.readOnly = false
		secInput.readOnly = false
	}
}

const inputsOnChange = (minutes, secondes) => {
	const min = parseInt(minutes)
	const sec = parseInt(secondes)

	minInput.value = min < 10 ? '0' + min : min
	secInput.value = sec < 10 ? '0' + sec : sec

	localStorage.setItem('min', min)
	localStorage.setItem('sec', sec)
}

const timer = setInterval(() => {
	if (time >= 0 && !isStopped) {
		inputsOnChange(time / 60, time % 60)
		time -= 1
	} else if (
		parseInt(localStorage.min) === 0 &&
		parseInt(localStorage.sec) === 0
	) {
		onFinish()
	}
}, 1000)

const start = () => {
	time = parseInt(secInput.value) + parseInt(minInput.value) * 60

	if (time != 0) {
		localStorage.isStarted = 'true'
		isStopped = false
		oneMin.disabled = true
		fiveMin.disabled = true
		tenMin.disabled = true
		resetBtn.disabled = true
		stopBtn.disabled = false
		minInput.readOnly = true
		secInput.readOnly = true
	}
}

const stop = () => {
	localStorage.isStarted = 'false'
	isStopped = true
	stopBtn.disabled = true
	resetBtn.disabled = false
}

const reset = () => {
	localStorage.isStarted = 'false'
	isStopped = true
	stopBtn.disabled = true
	minInput.readOnly = false
	secInput.readOnly = false
	oneMin.disabled = false
	fiveMin.disabled = false
	tenMin.disabled = false
	localStorage.min = 0
	localStorage.sec = 0
	inputsOnChange(localStorage.min, localStorage.sec)
	document.body.classList.remove('alarm')
}

const addMin = (minutes) => {
	inputsOnChange(parseInt(localStorage.min) + minutes, localStorage.sec)
}

const inputChange = () => {
	inputsOnChange(minInput.value, secInput.value)
}

inputsOnChange(min, sec)

if (localStorage.isStarted === 'true') {
	start()
}

oneMin.addEventListener('click', () => addMin(1))
fiveMin.addEventListener('click', () => addMin(5))
tenMin.addEventListener('click', () => addMin(10))

startBtn.addEventListener('click', start)
stopBtn.addEventListener('click', stop)
resetBtn.addEventListener('click', reset)
