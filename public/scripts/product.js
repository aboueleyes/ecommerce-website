var button = document.getElementById('cart');
var product = button.dataset.product;
button.addEventListener('click', getPostingButtonClickHandler(product));

function getPostingButtonClickHandler(url) {
  return async function post() {
    this.classList.add('posting');
    this.setAttribute('disabled', true);
    try {
      await fetch(url, { method: 'POST' });
    } finally {
      this.classList.remove('posting');
      this.removeAttribute('disabled');
    }
  };
}
