export const loadGifts = fetch('https://christmas-shop-f3a42-default-rtdb.europe-west1.firebasedatabase.app/gifts.json')
  .then(response => response.ok && response.json())
  .then(data => data);