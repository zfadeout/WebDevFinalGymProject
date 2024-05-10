const sliderContainer = document.querySelector('.slider-container');
const levels = document.querySelector('.levels');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

const levelWidth = levels.querySelector('th').offsetWidth;
const visibleLevels = Math.floor(levels.offsetWidth / levelWidth);
const totalLevels = levels.querySelectorAll('th').length;
let currentPosition = 0;

leftArrow.addEventListener('click', () => {
  if (currentPosition > 0) {
    currentPosition--;
    sliderContainer.style.transform = `translateX(-${currentPosition * levelWidth}px)`;
  }
});

rightArrow.addEventListener('click', () => {
  if (currentPosition < totalLevels - visibleLevels) {
    currentPosition++;
    sliderContainer.style.transform = `translateX(-${currentPosition * levelWidth}px)`;
  }
});