'use strict'

import { loadGifts } from "../modules/loadGifts.js";
import { modalFiller } from "../modules/modalFiller.js";

/* VARIABLES */
const gifts = await loadGifts;
const giftsLength = await loadGifts.then(gifts => gifts.length);
const bestGiftsList = document.querySelector('.best-gifts__list');
const bestGiftsItems = bestGiftsList.querySelectorAll('.best-gifts__item');
const bestGiftsImages = bestGiftsList.querySelectorAll('.best-gifts__item-img img');
const besfGiftsTags = bestGiftsList.querySelectorAll('.best-gifts__item-tag');
const bestGiftsTitles = bestGiftsList.querySelectorAll('.best-gifts__item-title');
const slider = document.querySelector('.slider__list');
const slides = document.querySelectorAll('.slider__slide');
const btnNext = document.querySelector('.btn-slider-next');
const btnPrev = document.querySelector('.btn-slider-prev');
const timerDays = document.querySelector('.cta__timer-days');
const timerHours = document.querySelector('.cta__timer-hours');
const timerMinutes = document.querySelector('.cta__timer-minutes');
const timerSeconds = document.querySelector('.cta__timer-seconds');

/* QUERIES */
const mediaQueryMax = window.matchMedia('(max-width: 768px)');

/* FUNCTIONS */
const randomCardIndex = () => {
  return Math.trunc(Math.random() * giftsLength) + 1;
};
const randomCard = () => {
  const randomCardItems = [];
  for (let i = 0; i < bestGiftsItems.length; i++) {
    randomCardItems.push(randomCardIndex());
  }
  return randomCardItems;
};
const bestGiftGenerator = (cardsTotal) => {
  let checkerSet = [...new Set(randomCard())];
  const cardFiller = () => {
    for (let i = 0; i < cardsTotal; i++) {
      if (gifts[checkerSet[i]]) {
        bestGiftsItems[i].id = checkerSet[i];
        bestGiftsImages[i].src = `./src/imgs/gift-${gifts[checkerSet[i]].category.toLowerCase().replace(' ', '-')}.png`;
        bestGiftsImages[i].alt = `Gift ${gifts[checkerSet[i]].category.toLowerCase()}`;
        besfGiftsTags[i].textContent = gifts[checkerSet[i]].category;
        besfGiftsTags[i].classList.value = '';
        besfGiftsTags[i].classList.add('best-gifts__item-tag', `best-gifts__item-tag--${gifts[checkerSet[i]].category.toLowerCase().slice(4)}`);
        bestGiftsTitles[i].textContent = gifts[checkerSet[i]].name;
      } else {
        console.log('restart cardfiller')
        checkerSet = [...new Set(randomCard())];
        cardFiller();
      }
    }
  };

  if (checkerSet.length < cardsTotal) {
    console.log(`checker worked: ${checkerSet}`)
    console.log('restart')
    bestGiftGenerator(cardsTotal);
  } else {
    console.log(`actual: ${checkerSet}`)
    cardFiller();
  }
};

/* BEST GIFTS ELEMENT */
bestGiftGenerator(bestGiftsItems.length);
modalFiller(bestGiftsList, 'home');

/* SLIDER ELEMENT */
btnPrev.classList.add('disabled');
let initialPosition = slides[0].offsetLeft;
let activeSlide = 0;
let step = (slider.scrollWidth - slider.clientWidth) / 3;
if (mediaQueryMax.matches) {
  step = (slider.scrollWidth - slider.clientWidth) / 6;
}
mediaQueryMax.addEventListener('change', (e) => {
  if (e.matches) {
    step = (slider.scrollWidth - slider.clientWidth) / 6;
  }
});
window.addEventListener('resize', () => {
  slider.style.transform = `translate3d(0,0,0)`;
  initialPosition = slides[0].offsetLeft;
  activeSlide = 0;
  btnNext.classList.contains('disabled') && btnNext.classList.remove('disabled');
  btnPrev.classList.add('disabled');
  step = (slider.scrollWidth - slider.clientWidth) / 3;
  if (mediaQueryMax.matches) {
    step = (slider.scrollWidth - slider.clientWidth) / 6;
  }
});
btnNext.addEventListener('click', () => {
  btnPrev.classList.contains('disabled') && btnPrev.classList.remove('disabled');
  slider.style.transform = `translate3d(-${(initialPosition + step)}px, 0, 0)`;
  initialPosition = initialPosition + step;
  activeSlide++;
  if (activeSlide === 3) {
    btnNext.classList.add('disabled');
  } else {
    btnNext.classList.remove('disabled');
  }
  if (mediaQueryMax.matches) {
    if (activeSlide === 6) {
      btnNext.classList.add('disabled');
    } else {
      btnNext.classList.remove('disabled');
    }
  }
});
btnPrev.addEventListener('click', () => {
  btnNext.classList.contains('disabled') && btnNext.classList.remove('disabled');
  slider.style.transform = `translate3d(-${(initialPosition - step)}px, 0, 0)`;
  initialPosition = initialPosition - step;
  activeSlide--;
  if (activeSlide === 0) {
    btnPrev.classList.add('disabled');
  } else {
    btnPrev.classList.remove('disabled');
  }
});

/* TIMER ELEMENT */
const deadline = '2025-01-01T00:00:00Z';
let interval;
interval = setInterval(() => {
  const time = new Date(deadline) - Date.now();
  if (time > 0) {
    timerDays.textContent = Math.floor(time / (1000 * 60 * 60 * 24));
    timerHours.textContent = Math.floor((time / (1000 * 60 * 60)) % 24);
    timerMinutes.textContent = Math.floor((time / 1000 / 60) % 60);
    timerSeconds.textContent = Math.floor((time / 1000) % 60);
  } else {
    timerDays.textContent = 0;
    timerHours.textContent = 0;
    timerMinutes.textContent = 0;
    timerSeconds.textContent = 0;
    clearInterval(interval);
  }
}, 1000);

