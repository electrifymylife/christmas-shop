'use strict'

/* VARIABLES */
const burger = document.querySelector('.header__burger');
const body = document.querySelector('body');
const headerMenu = document.querySelector('.header__menu');
const headerMenuItems = document.querySelectorAll('.header__menu a');
const modalOverlay = document.querySelector('.gifts__modal');
const modalCloseBtn = document.querySelector('.gifts__modal-btn-close');
const modalImage = document.querySelector('.gifts__modal-img img');
const modalTag = document.querySelector('.gifts__modal-tag');
const modalTitle = document.querySelector('.gifts__modal-title');
const modalDesc = document.querySelector('.gifts__modal-desc');
const modalSuperpowersList = document.querySelector('.gifts__modal-superpowers-list');

/* HEADER */
burger.addEventListener('click', () => {
  if (burger.classList.contains('header__burger')) {
    burger.classList.remove('header__burger');
    burger.classList.add('header__cross');
    headerMenu.classList.add('active');
    headerMenuItems.forEach((item) => {
      item.classList.add('action-large')
    });
    body.style.overflow = 'hidden';
  } else {
    burger.classList.remove('header__cross');
    burger.classList.add('header__burger');
    headerMenu.classList.remove('active');
    headerMenuItems.forEach((item) => {
      item.classList.remove('action-large')
    });
    body.style.overflow = 'unset';
  }
});
headerMenuItems.forEach((item) => {
  item.addEventListener('click', () => {
    burger.classList.remove('header__cross');
    burger.classList.add('header__burger');
    headerMenu.classList.remove('active');
    body.style.overflow = 'unset';
  });
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    burger.classList.remove('header__cross');
    burger.classList.add('header__burger');
    headerMenu.classList.remove('active');
    body.style.overflow = 'unset';
    headerMenuItems.forEach((item) => {
      item.classList.remove('action-large')
    });
  }
})

/* MODAL */
modalCloseBtn.addEventListener('click', () => {
  if (modalOverlay.classList.contains('active')) {
    modalOverlay.classList.remove('active');
    document.body.removeAttribute('style');
  } else {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
});
window.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.classList.remove('active');
    document.body.removeAttribute('style');
  }
});