import { loadGifts } from "./loadGifts.js";
const gifts = await loadGifts;
const itemHandler = (item, page) => {
  const pageUrl = page === 'home' ? './src' : '..';
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = '15px';
  modalImage.src = `${pageUrl}/imgs/gift-${gifts[item.id].category.toLowerCase().replace(' ', '-')}.png`;
  modalTag.classList.value = '';
  modalTag.classList.add('gifts__modal-tag', 'gifts__item-tag', `gifts__item-tag--${gifts[item.id].category.toLowerCase().slice(4)}`);
  modalTag.textContent = gifts[item.id].category;
  modalTitle.textContent = gifts[item.id].name;
  modalDesc.textContent = gifts[item.id].description;

  modalSuperpowersList.innerHTML = '';

  for (const [name, rateNum] of Object.entries(gifts[item.id].superpowers)) {
    const superpowerItem = document.createElement('li');
    const superPowerName = document.createElement('span');
    const superPowerRate = document.createElement('div');
    const superPowerRateNum = document.createElement('span');
    const superpowerRateNumVisuals = document.createElement('ul');

    superpowerItem.classList.add('gifts__modal-superpowers-item');
    superPowerName.classList.add('gifts__modal-superpower-name');
    superPowerRate.classList.add('gifts__modal-superpower-rate');
    superPowerRateNum.classList.add('gifts__modal-superpower-rate-num');
    superpowerRateNumVisuals.classList.add('gifts__modal-superpower-rate-num-visuals');

    modalSuperpowersList.append(superpowerItem);
    superpowerItem.append(superPowerName);
    superpowerItem.append(superPowerRate);
    superPowerRate.append(superPowerRateNum);
    superPowerRate.append(superpowerRateNumVisuals);

    superPowerName.textContent = name[0].toUpperCase() + name.slice(1);
    superPowerRateNum.textContent = rateNum;

    for (let i = 0; i < 5; i++) {
      const superpowerRateNumVisualsItem = document.createElement('li');
      superpowerRateNumVisuals.append(superpowerRateNumVisualsItem);
    }

    for (let i = 0; i < rateNum[1]; i++) {
      superpowerRateNumVisuals.children[i].classList.add('colored');
    }
  }
};
export const modalFiller = (list, page) => {
  list.addEventListener('click', e => {
    const targetItem = e.target.closest('li');
    if (!targetItem) return;
    itemHandler(targetItem, page);
  })
};