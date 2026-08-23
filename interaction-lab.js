const optionButtons = [...document.querySelectorAll("[data-option]")];
const optionPanels = [...document.querySelectorAll("[data-panel]")];

function selectOption(option) {
  optionButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.option === option));
  optionPanels.forEach((panel) => {
    const active = panel.dataset.panel === option;
    panel.hidden = !active;
    panel.classList.toggle("is-active", active);
  });
}

optionButtons.forEach((button) => button.addEventListener("click", () => selectOption(button.dataset.option)));

const cabinetDemo = document.querySelector("#cabinetDemo");
document.querySelectorAll("[data-demo]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-demo]").forEach((item) => item.classList.remove("is-demo"));
    button.classList.add("is-demo");
    cabinetDemo.classList.remove("is-demoing");
    requestAnimationFrame(() => cabinetDemo.classList.add("is-demoing"));
  });
});

const tutorialCards = [...document.querySelectorAll(".tutorial-card")];
const dots = [...document.querySelectorAll("[data-slide]")];
const nextSlide = document.querySelector("#nextSlide");
const royalCta = document.querySelector("#royalCta");
const slideNumber = document.querySelector("#slideNumber");
const tutorialTrack = document.querySelector("#tutorialTrack");
let currentSlide = 0;
let pointerStart = null;

function setSlide(index) {
  currentSlide = Math.max(0, Math.min(tutorialCards.length - 1, index));
  tutorialCards.forEach((card, cardIndex) => card.classList.toggle("is-current", cardIndex === currentSlide));
  dots.forEach((dot, dotIndex) => dot.classList.toggle("is-active", dotIndex === currentSlide));
  slideNumber.textContent = String(currentSlide + 1).padStart(2, "0");
  const final = currentSlide === tutorialCards.length - 1;
  nextSlide.hidden = final;
  royalCta.hidden = !final;
}

dots.forEach((dot) => dot.addEventListener("click", () => setSlide(Number(dot.dataset.slide))));
nextSlide.addEventListener("click", () => setSlide(currentSlide + 1));
tutorialTrack.addEventListener("pointerdown", (event) => { pointerStart = event.clientX; });
tutorialTrack.addEventListener("pointerup", (event) => {
  if (pointerStart === null) return;
  const delta = event.clientX - pointerStart;
  pointerStart = null;
  if (delta < -35) setSlide(currentSlide + 1);
  if (delta > 35) setSlide(currentSlide - 1);
});

setSlide(0);
