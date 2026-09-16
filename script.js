const menuItems = [
  { name: "Crêpe Simple", category: "Crêpes", price: 300, note: "Chocolate, bueno, honey or jam" },
  { name: "Crêpe Banane", category: "Crêpes", price: 400, note: "Chocolate, bueno, banana" },
  { name: "Crêpe Banane / Fruits de saison", category: "Crêpes", price: 450, note: "Chocolate, banana and seasonal fruit" },
  { name: "Crêpe Fruits de saison", category: "Crêpes", price: 550, note: "Chocolate, bueno and fruit" },
  { name: "Crêpe Spéciale", category: "Crêpes", price: 700, note: "Chocolate, bueno, banana, strawberry and nuts" },
  { name: "Crêpe Crazy", category: "Crêpes", price: 850, note: "Loaded with fruit, chocolate and supplements" },
  { name: "Crêpe Royal", category: "Crêpes", price: 1000, note: "Fruit, chocolate and ice cream" },
  { name: "Crêpe Sauce Pistache", category: "Crêpes", price: 550 },
  { name: "Crêpe Nature", category: "Crêpes", price: 150 },
  { name: "Crêpe Nutella Moment", category: "Crêpes", price: 550 },
  { name: "Crêpe Crousti Simple", category: "Crêpes", price: 300 },
  { name: "Crêpe Crousti Pistache", category: "Crêpes", price: 450 },
  { name: "Crêpe Crousti Spécial", category: "Crêpes", price: 700 },
  { name: "Crêpe Crousti Royale", category: "Crêpes", price: 850 },

  { name: "Gaufre Simple", category: "Waffles", price: 350 },
  { name: "Gaufre Banane", category: "Waffles", price: 400 },
  { name: "Gaufre Banane / Fruits de saison", category: "Waffles", price: 450 },
  { name: "Gaufre Fruits", category: "Waffles", price: 550 },
  { name: "Gaufre Spéciale", category: "Waffles", price: 700 },
  { name: "Gaufre Crazy", category: "Waffles", price: 850 },
  { name: "Gaufre Royal", category: "Waffles", price: 1000 },
  { name: "Gaufre Sauce Pistache", category: "Waffles", price: 600 },
  { name: "Gaufre Nature", category: "Waffles", price: 200 },

  { name: "Pancake Simple", category: "Pancakes", price: 350 },
  { name: "Pancake Banane", category: "Pancakes", price: 400 },
  { name: "Pancake Banane / Fruits de saison", category: "Pancakes", price: 450 },
  { name: "Pancake Fruits", category: "Pancakes", price: 550 },
  { name: "Pancake Spécial", category: "Pancakes", price: 700 },
  { name: "Pancake Crazy", category: "Pancakes", price: 850 },
  { name: "Pancake Royal", category: "Pancakes", price: 1000 },
  { name: "Pancake Sauce Pistache", category: "Pancakes", price: 550 },
  { name: "Pancake Nature", category: "Pancakes", price: 200 },
  { name: "12 Mini Pancakes Chocolat", category: "Pancakes", price: 250 },
  { name: "24 Mini Pancakes Chocolat", category: "Pancakes", price: 500 },
  { name: "12 Mini Pancakes Pistache", category: "Pancakes", price: 450 },

  { name: "2 Boules", category: "Gelato", price: 350 },
  { name: "2 Boules + Fruits", category: "Gelato", price: 500 },
  { name: "3 Boules", category: "Gelato", price: 500 },
  { name: "3 Boules + Fruits", category: "Gelato", price: 650 },
  { name: "4 Boules", category: "Gelato", price: 600 },
  { name: "4 Boules + Fruits", category: "Gelato", price: 750 },
  { name: "Coupe Familiale · 4 personnes", category: "Gelato", price: 1200 },
  { name: "Coupe Familiale + Fruits", category: "Gelato", price: 1500 },
  { name: "Banana Split", category: "Gelato", price: 700 },
  { name: "Dame Blanche", category: "Gelato", price: 250 },
  { name: "Coupe Enfant", category: "Gelato", price: 250 },

  { name: "Milkshake Chocolat", category: "Drinks", price: 350 },
  { name: "Milkshake Oreo", category: "Drinks", price: 350 },
  { name: "Milkshake Ferrero", category: "Drinks", price: 350 },
  { name: "Milkshake Pistache", category: "Drinks", price: 450 },
  { name: "Milkshake Chocolat Banane", category: "Drinks", price: 450 },
  { name: "Lait Frappé", category: "Drinks", price: 350, note: "Fraise, banane, ananas, fruit de la forêt or framboise" },
  { name: "Ice Coffee", category: "Drinks", price: 350, note: "Noisette, caramel or chocolat" },
  { name: "Cappuccino", category: "Drinks", price: 300 },
  { name: "Chocolat Chaud", category: "Drinks", price: 250 },
  { name: "Affogato", category: "Drinks", price: 350 },

  { name: "Crunchy Chocolat", category: "Cakes", price: 700 },
  { name: "Crunchy Bueno", category: "Cakes", price: 700 },
  { name: "Crunchy Pistache", category: "Cakes", price: 800 },
  { name: "Cake Ahmed", category: "Cakes", price: 500 },
  { name: "Cake Caramisu", category: "Cakes", price: 800 },
  { name: "Matilda Cake", category: "Cakes", price: 400 },
  { name: "Red Cake Chocolat", category: "Cakes", price: 500 },
  { name: "Red Cake Pistache", category: "Cakes", price: 600 },
  { name: "Red Cake Fruits", category: "Cakes", price: 700 },

  { name: "Kunafa · Small", category: "Kunafa", price: 500 },
  { name: "Kunafa · Medium", category: "Kunafa", price: 950 },
  { name: "Kunafa · Large", category: "Kunafa", price: 1300 },
  { name: "Kunafa Pistache", category: "Kunafa", price: 700, note: "Pistachio add-on" },
  { name: "Kunafa Nutella", category: "Kunafa", price: 500, note: "Nutella add-on" },
  { name: "Kunafa Mozzarella", category: "Kunafa", price: 500, note: "Mozzarella add-on" },

  { name: "Chocolat Dubai", category: "Dubai", price: 1200 },
  { name: "Crêpe Dubai", category: "Dubai", price: 900 },
  { name: "Crêpe Crousty Dubai", category: "Dubai", price: 650 },
  { name: "Cheesecake Dubai", category: "Dubai", price: 650 },
  { name: "Brownies Dubai", category: "Dubai", price: 450 },
  { name: "Cake Dubai · Small", category: "Dubai", price: 350 },
  { name: "Cake Dubai · Large", category: "Dubai", price: 700 },

  { name: "Crème Brûlée", category: "Snacks", price: 250 },
  { name: "Fondant au Chocolat", category: "Snacks", price: 300 },
  { name: "Fondant + Boule de glace", category: "Snacks", price: 450 },
  { name: "Fondant Pistache", category: "Snacks", price: 450 },
  { name: "Fondant Lotus", category: "Snacks", price: 450 },
  { name: "Brownies", category: "Snacks", price: 250 },
  { name: "Tartelette", category: "Snacks", price: 200 },
  { name: "Cookies", category: "Snacks", price: 200 },
  { name: "Minicake", category: "Snacks", price: 700 },

  { name: "Crêpe Spaghetti", category: "Specials", price: 500 },
  { name: "Crêpe Spaghetti + Fruits", category: "Specials", price: 700 },
  { name: "Crêpes Sushi", category: "Specials", price: 700 },
  { name: "Flan Venezuelan", category: "Specials", price: 400 },
  { name: "Crêpe roulée à la japonaise", category: "Specials", price: 650 },
  { name: "Crêpe japonaise + Boule de glace", category: "Specials", price: 750 },
  { name: "Boules Zoom", category: "Specials", price: 450 },
  { name: "Crêpe Roulé", category: "Specials", price: 550 },

  { name: "Cheesecake San Sebastian · Nature", category: "Cheesecake", price: 300 },
  { name: "Cheesecake San Sebastian · Pistache", category: "Cheesecake", price: 550 },
  { name: "Cheesecake San Sebastian · Double Dose", category: "Cheesecake", price: 600 },
  { name: "Cheesecake San Sebastian · Chocolat", category: "Cheesecake", price: 400 },
  { name: "Cheesecake San Sebastian · Oreo", category: "Cheesecake", price: 400 }
];

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const state = {
  category: "All",
  search: ""
};

const menuGrid = $("[data-menu-grid]");
const tabs = $("[data-category-tabs]");
const resultCount = $("[data-result-count]");
const searchInput = $("[data-menu-search]");
const resetButton = $("[data-reset-menu]");

const categories = ["All", ...new Set(menuItems.map(item => item.category))];

function createTabs() {
  tabs.innerHTML = categories.map(category => `
    <button
      type="button"
      class="category-tab ${category === state.category ? "active" : ""}"
      role="tab"
      aria-selected="${category === state.category}"
      data-category="${category}">
      ${category}
    </button>
  `).join("");
}

function getFilteredItems() {
  const query = state.search.trim().toLowerCase();
  return menuItems.filter(item => {
    const categoryMatch = state.category === "All" || item.category === state.category;
    const searchMatch = !query || [item.name, item.category, item.note || ""].join(" ").toLowerCase().includes(query);
    return categoryMatch && searchMatch;
  });
}

function renderMenu() {
  const filtered = getFilteredItems();
  resultCount.textContent = filtered.length;

  if (!filtered.length) {
    menuGrid.innerHTML = `
      <div class="menu-empty">
        <strong>No dessert found 😭</strong>
        <span>Try another category or search term.</span>
      </div>
    `;
    return;
  }

  menuGrid.innerHTML = filtered.map((item, index) => `
    <article class="menu-item" data-index="${String(index + 1).padStart(2, "0")}">
      <div class="menu-item-top">
        <span class="category-label">${item.category}</span>
        <h3>${item.name}</h3>
        ${item.note ? `<p>${item.note}</p>` : ""}
      </div>
      <div class="menu-item-price">
        <strong>${item.price} DA</strong>
        <span>ZOOM MENU</span>
      </div>
    </article>
  `).join("");
}

tabs.addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  state.category = button.dataset.category;
  $$(".category-tab", tabs).forEach(tab => {
    const selected = tab === button;
    tab.classList.toggle("active", selected);
    tab.setAttribute("aria-selected", selected);
  });
  renderMenu();
});

searchInput.addEventListener("input", event => {
  state.search = event.target.value;
  renderMenu();
});

resetButton.addEventListener("click", () => {
  state.category = "All";
  state.search = "";
  searchInput.value = "";
  createTabs();
  renderMenu();
});

createTabs();
renderMenu();

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.13 });

$$(".reveal").forEach(element => revealObserver.observe(element));

const header = $("[data-header]");
let lastY = window.scrollY;
let ticking = false;

function updateHeader() {
  const y = window.scrollY;
  header.classList.toggle("is-scrolled", y > 12);
  const shouldHide = y > lastY && y > 260 && Math.abs(y - lastY) > 5;
  if (shouldHide) header.classList.add("is-hidden");
  if (y < lastY || y < 120) header.classList.remove("is-hidden");
  lastY = y;
  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateHeader);
    ticking = true;
  }
}, { passive: true });

const menuToggle = $("[data-menu-toggle]");
const mobileNav = $("[data-mobile-nav]");

function setMobileMenu(open) {
  menuToggle.setAttribute("aria-expanded", open);
  mobileNav.setAttribute("aria-hidden", !open);
  mobileNav.classList.toggle("is-open", open);
  document.body.style.overflow = open ? "hidden" : "";
}

menuToggle.addEventListener("click", () => {
  setMobileMenu(menuToggle.getAttribute("aria-expanded") !== "true");
});

$$("a", mobileNav).forEach(link => link.addEventListener("click", () => setMobileMenu(false)));
window.addEventListener("keydown", event => {
  if (event.key === "Escape") setMobileMenu(false);
});

const rollingZone = $(".rolling-zone");
const rollingFoods = $$("[data-roll]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function updateRollingFood() {
  if (!rollingZone || reduceMotion.matches) return;
  const rect = rollingZone.getBoundingClientRect();
  const vh = window.innerHeight;
  const progress = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));

  rollingFoods.forEach((food, index) => {
    const direction = food.dataset.roll === "left" ? 1 : -1;
    const travel = (progress - .5) * 290 * direction;
    const rotation = (progress * 300 - 130) * direction;
    const y = Math.sin(progress * Math.PI) * -34;
    food.style.transform = `translate3d(${travel}px, ${y}px, 0) rotate(${rotation}deg)`;
  });
}

window.addEventListener("scroll", () => requestAnimationFrame(updateRollingFood), { passive: true });
window.addEventListener("resize", updateRollingFood);
updateRollingFood();

const builder = $("[data-builder]");
const totalLabel = $("[data-sundae-total]");
const summaryLabel = $("[data-build-summary]");

function calculateBuild() {
  const selectedBase = $('[data-choice-group="base"].active', builder);
  const selectedSize = $('[data-choice-group="size"].active', builder);
  const extras = $$("[data-extra].active", builder);

  const total =
    Number(selectedBase?.dataset.price || 0) +
    Number(selectedSize?.dataset.price || 0) +
    extras.reduce((sum, item) => sum + Number(item.dataset.price || 0), 0);

  const labels = [
    selectedBase?.dataset.value,
    selectedSize?.dataset.value,
    ...extras.map(item => item.dataset.value)
  ].filter(Boolean);

  totalLabel.textContent = total;
  summaryLabel.textContent = labels.join(" · ");
}

builder.addEventListener("click", event => {
  const choice = event.target.closest(".choice");
  if (!choice) return;

  if (choice.hasAttribute("data-extra")) {
    choice.classList.toggle("active");
  } else {
    const group = choice.dataset.choiceGroup;
    $$('[data-choice-group="' + group + '"]', builder).forEach(item => item.classList.remove("active"));
    choice.classList.add("active");
  }

  calculateBuild();
});

$("[data-random-build]").addEventListener("click", () => {
  ["base", "size"].forEach(group => {
    const items = $$('[data-choice-group="' + group + '"]', builder);
    items.forEach(item => item.classList.remove("active"));
    items[Math.floor(Math.random() * items.length)].classList.add("active");
  });

  const extras = $$("[data-extra]", builder);
  extras.forEach(item => item.classList.remove("active"));
  [...extras]
    .sort(() => Math.random() - .5)
    .slice(0, Math.floor(Math.random() * 3) + 1)
    .forEach(item => item.classList.add("active"));

  calculateBuild();
});

calculateBuild();
