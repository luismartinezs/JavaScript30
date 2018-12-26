/* Our elements and controls */
const player = document.querySelector(".player");
const video = document.querySelector(".viewer");
const toggler = document.querySelector(".toggle");
const skippers = Array.from(document.querySelectorAll("[data-skip]"));
const sliders = Array.from(document.querySelectorAll("[type='range']"));
const progressBar = document.querySelector(".progress__filled");
const progressArea = document.querySelector(".progress");
const fullScreenBtn = document.querySelector("button.full-screen");

let isHoldingDownMouse = false;
let fullScreen = false;

/* Functions */
function togglePlay() {
  const toggle = video.paused ? "play" : "pause";
  video[toggle]();
}

function updateToggler() {
  let icon = this.paused ? "►" : "❚ ❚";
  toggler.textContent = icon;
}

function skip() {
  let seconds = parseFloat(this.dataset.skip);
  video.currentTime += seconds;
}

function handleSlider() {
  video[this.name] = this.value;
}

function setProgress() {
  progressBar.style.flexBasis = `${(video.currentTime / video.duration) *
    100}%`;
}

function handleProgress(e) {
  progressBar.style.flexBasis = `${(e.offsetX / progressArea.clientWidth) *
    100}%`;
  setVideoTime();
}

function setVideoTime() {
  video.currentTime =
    (progressBar.offsetWidth / progressArea.offsetWidth) * video.duration;
}

function toggleFullScreen() {
  console.log("go full screen");
  player.classList.toggle("player__full-screen");
}

/* event listeners */
video.addEventListener("click", togglePlay);
toggler.addEventListener("click", togglePlay);
video.addEventListener("play", updateToggler);
video.addEventListener("pause", updateToggler);
skippers.forEach(elem => elem.addEventListener("click", skip));
sliders.forEach(elem => elem.addEventListener("change", handleSlider));
sliders.forEach(elem => elem.addEventListener("mousemove", handleSlider));
video.addEventListener("timeupdate", setProgress);
progressArea.addEventListener("click", handleProgress);
progressArea.addEventListener("mousemove", function(event) {
  isHoldingDownMouse && handleProgress(event);
});
progressArea.addEventListener("mousedown", () => (isHoldingDownMouse = true));
progressArea.addEventListener("mouseup", () => (isHoldingDownMouse = false));
fullScreenBtn.addEventListener("click", toggleFullScreen);
