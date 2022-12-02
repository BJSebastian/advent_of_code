const settingButton = document.querySelector(".settings");
const startButton = document.querySelector(".start");
const seconds = document.querySelector(".seconds > input[type=text]");
const minutes = document.querySelector(".minutes > input[type=text]");
const ring = document.querySelector(".ring");

let startTime = 0;
let time = null;
let running = false;
let originalMinutes = 0;
let originalSeconds = 0;
let totalSeconds = 0;

startButton.addEventListener('click', () => {
	if (!running) {
		startTimer();
	}
	else {
		pauseTimer();
	}
});

settingButton.addEventListener('click', () => {
	if (running) {
		pauseTimer();
	}
	seconds.disabled = false;
	minutes.disabled = false;
});

const validateTimeInput = (e) => {
	const validatedInput = e.target.value.replace(/[^0-9]/g, '').substring(0, 2);
	e.target.value = validatedInput;
}

minutes.addEventListener('keyup', validateTimeInput);
seconds.addEventListener('keyup', validateTimeInput);

const startTimer = () => {
	running = true;
	startButton.textContent = "pause";
	startTime = Date.now();
	const secondsValue = parseInt(seconds.value);
	const minutesValue = parseInt(minutes.value);
	totalSeconds = secondsValue + minutesValue * 60;
	timer = setInterval(() => {
		const currentTime = Date.now();
		const diff = currentTime - startTime;
		const secondsLeft = totalSeconds - Math.floor(diff/1000);
		const minutesLeft = Math.floor(secondsLeft/60);
		seconds.value = padNumber(secondsLeft);
		minutes.value = padNumber(minutesLeft);

		if (secondsLeft === 0 && minutesLeft === 0) {
			finishTimer();
		}
	}, (1000));
}

const pauseTimer = () => {	
	running = false;
	startButton.textContent = "start";
	clearInterval(timer);
}

const finishTimer = () => {
	clearInterval(timer);
	ring.classList.add("ending");
	setTimeout(() => {
		alert("Time's up!");
		resetTimer();
	}, 0);
}

const resetTimer = () => {
	clearInterval(timer);
	seconds.value = originalSeconds;
	minutes.value = originalMinutes;
	startButton.textContent = "Start";
	ring.classList.remove("ending");
	running = false;
}

const padNumber = (number) => {
	if (number < 10) {
		return "0" + number;
	}
}

const setOriginalTime = () => {
	originalSeconds = padNumber(parseInt(seconds.value));
	originalMinutes = padNumber(parseInt(minutes.value));
}

setOriginalTime();
resetTimer();
