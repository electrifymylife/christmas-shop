'use strict'

import { loadGifts } from "../modules/loadGifts.js";
import { modalFiller } from "../modules/modalFiller.js";

/* VARIABLES */
const gifts = await loadGifts;
const catGiftsList = document.querySelector('.gifts__list');
const catGiftsItems = [];
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
const tabHandler = (e) => {
  let tabTarget = e.currentTarget;
  if (tabTarget.classList.contains('active')) {
    tabTarget.classList.remove('active');
  } else {
    btnFilterTabs.forEach((tab) => {
      tab.classList.remove('active');
    });
    tabTarget.classList.add('active');
  }
  catGiftsItems.forEach((gift) => {
    gift.style.display = 'none';
    if (tabTarget.classList.contains('show-all')) {
      gift.style.display = 'flex';
    } else if (tabTarget.classList.contains('show-work') && gift.children[1].children[0].textContent === 'For Work') {
      gift.style.display = 'flex';
    } else if (tabTarget.classList.contains('show-health') && gift.children[1].children[0].textContent === 'For Health') {
      gift.style.display = 'flex';
    } else if (tabTarget.classList.contains('show-harmony') && gift.children[1].children[0].textContent === 'For Harmony') {
      gift.style.display = 'flex';
    }
  });
};
btnFilterTabs.forEach((tab) => {
  tab.addEventListener('click', tabHandler);
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
