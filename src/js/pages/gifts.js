'use strict'

import { loadGifts } from "../modules/loadGifts.js";
import { modalFiller } from "../modules/modalFiller.js";

/* VARIABLES */
const gifts = await loadGifts;
const catGiftsList = document.querySelector('.gifts__list');
const catGiftsItems = [];
const btnFilter = document.querySelector('.gifts__filter');
const btnFilterTabs = document.querySelectorAll('.btn-tab');
const btnScrollTop = document.querySelector('.btn-up');

/* CATALOG */
const catalogGenerator = () => {
  catGiftsList.innerHTML = '';
  gifts.map((gift, index) => {
    const li = document.createElement('li');
    const divImg = document.createElement('div');
    const divInfo = document.createElement('div');
    const img = document.createElement('img');
    const h4 = document.createElement('h4');
    const h3 = document.createElement('h3');

    catGiftsList.append(li);
    li.append(divImg, divInfo);
    divImg.append(img);
    divInfo.append(h4, h3);

    li.classList.add('gifts__item');
    divImg.classList.add('gifts__item-img');
    divInfo.classList.add('gifts__item-info');
    h4.classList.add('gifts__item-tag', `gifts__item-tag--${gift.category.toLowerCase().slice(4)}`);
    h3.classList.add('gifts__item-title');

    li.id = `${index}`;
    img.src = `../imgs/gift-${gift.category.toLowerCase().replace(' ', '-')}.png`;
    h4.textContent = gift.category;
    h3.textContent = gift.name;

    catGiftsItems.push(li);
  });
};
catalogGenerator();
modalFiller(catGiftsItems, 'gifts');

/* FILTER ELEMENT */
btnFilter.addEventListener('click', e => {
  const tabTarget = e.target.closest('.btn-tab');

  if (!tabTarget) return;

  btnFilterTabs.forEach(tab => tab.classList.remove('active'));
  tabTarget.classList.add('active');
  catGiftsItems.forEach(item => {
    if (e.target.dataset.tab === 'all' || item.querySelector(`.gifts__item-tag--${tabTarget.dataset.tab}`)) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
});

/* SCROLL TO TOP */
window.addEventListener('scroll', () => {
  window.scrollY > 300 ? btnScrollTop.classList.add('active') : btnScrollTop.classList.remove('active');
});
btnScrollTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
