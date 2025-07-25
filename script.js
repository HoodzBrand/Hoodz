// Array prodotti dinamico (puoi aggiungere quanti ne vuoi)
const products = [
  {
    name: "Felpa Urban Red",
    description: "Felpa oversize con dettagli in rosso acceso.",
    price: "59€",
    images: ["img/felpa1a.jpg", "img/felpa1b.jpg"]
  },
  {
    name: "T-shirt Classic Black",
    description: "T-shirt basic nera in cotone organico.",
    price: "29€",
    images: ["img/tshirt1a.jpg", "img/tshirt1b.jpg"]
  },
  {
    name: "Felpa White Drop",
    description: "Felpa bianca con stampa HOODZ minimal.",
    price: "62€",
    images: ["img/felpa2a.jpg"]
  }
];

// Funzione per creare un singolo prodotto
function createProductHTML(product) {
  const imageSlider = product.images.map(src => `<img src="${src}" alt="${product.name}">`).join('');

  return `
    <div class="product-item">
      <div class="image-slider">
        ${imageSlider}
      </div>
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <span class="price">${product.price}</span>
    </div>
  `;
}

// Inserimento dinamico dei prodotti
const container = document.getElementById('products-container');
if (container) {
  container.innerHTML = products.map(createProductHTML).join('');
}

// Slider immagini con swipe (mobile)
document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll(".image-slider");

  sliders.forEach(slider => {
    let isDown = false;
    let startX, scrollLeft;

    slider.addEventListener("mousedown", e => {
      isDown = true;
      slider.classList.add("dragging");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener("mouseleave", () => {
      isDown = false;
      slider.classList.remove("dragging");
    });

    slider.addEventListener("mouseup", () => {
      isDown = false;
      slider.classList.remove("dragging");
    });

    slider.addEventListener("mousemove", e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    });

    // Per touch su mobile
    let startTouchX = 0;
    slider.addEventListener("touchstart", e => {
      startTouchX = e.touches[0].clientX;
    });

    slider.addEventListener("touchmove", e => {
      const x = e.touches[0].clientX;
      slider.scrollLeft += startTouchX - x;
      startTouchX = x;
    });
  });
});