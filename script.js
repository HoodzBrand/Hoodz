// ✅ Gestione Mega Menu (valido per tutte le pagine)
const trigger = document.getElementById("collezioni");
const mega = document.getElementById("megaMenu");

function isMobile() {
  return window.innerWidth <= 768;
}

if (trigger && mega) {
  let mobileOpen = false;

  trigger.addEventListener("click", (e) => {
    if (isMobile()) {
      e.preventDefault();
      mega.classList.toggle("show");
      mobileOpen = !mobileOpen;
    }
  });

  trigger.addEventListener("mouseenter", () => {
    if (!isMobile()) {
      mega.classList.add("show");
    }
  });

  trigger.addEventListener("mouseleave", () => {
    if (!isMobile()) {
      setTimeout(() => {
        if (!mega.matches(":hover")) {
          mega.classList.remove("show");
        }
      }, 200);
    }
  });

  mega.addEventListener("mouseleave", () => {
    if (!isMobile()) {
      mega.classList.remove("show");
    }
  });

  mega.addEventListener("mouseenter", () => {
    if (!isMobile()) {
      mega.classList.add("show");
    }
  });
}

// ✅ Caricamento Prodotti dinamico SOLO su collezioni.html
if (window.location.pathname.includes("collezioni.html")) {
  const urlParams = new URLSearchParams(window.location.search);
  const categoria = urlParams.get("categoria");
  const sottocategoria = urlParams.get("sottocategoria");
  const collezione = urlParams.get("collezione");

  const prodotti = {
    uomo: {
   tshirt: [
  {
    name: "Maglia Black Logo",
    description: "T-shirt nera con logo HOODZ centrale.",
    price: "39€",
    images: ["img-collezioni/uomo/tshirt/tshirt1.jpg"]
  },
  {
    name: "Maglia Red Basic",
    description: "T-shirt bianca con etichetta rossa ricamata.",
    price: "42€",
    images: ["img-collezioni/uomo/tshirt/tshirt2.jpg"]
  },
  {
    name: "Maglia Oversize Shadow",
    description: "T-shirt oversize grigia con stampa ombreggiata.",
    price: "44€",
    images: ["img-collezioni/uomo/tshirt/tshirt3.jpg"]
  }
],
      felpe: [
        {
          name: "Felpa Urban Red",
          description: "Felpa oversize con dettagli in rosso acceso.",
          price: "59€",
          images: ["img/felpa1a.jpg"]
        }
      ]
    },
    donna: {
      tshirt: [],
      felpe: [],
      top: []
    },
    accessori: {
      cappelli: [],
      calze: []
    }
  };

  const container = document.getElementById("productContainer");

  if (container && prodotti[categoria] && prodotti[categoria][sottocategoria]) {
    const lista = prodotti[categoria][sottocategoria];

    if (lista.length === 0) {
      container.innerHTML = "<p style='text-align:center;'>Nessun prodotto disponibile per questa categoria. La nuova collezione sarà presto online.</p>";
    } else {
      lista.forEach(product => {
        const item = document.createElement("div");
        item.className = "product-card";

        let imagesHTML = "";
        product.images.forEach(src => {
          imagesHTML += `<img src="${src}" alt="${product.name}" />`;
        });

        item.innerHTML = `
          <div class="image-slider">
            ${imagesHTML}
          </div>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <span class="price">${product.price}</span>
        `;

        container.appendChild(item);
      });
    }
  } else if (container) {
    container.innerHTML = "<p style='text-align:center;'>Nessun prodotto disponibile per questa categoria. La nuova collezione sarà presto online.</p>";
  }
}
