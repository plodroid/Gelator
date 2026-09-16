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

const $ = (q, c = document) => c.querySelector(q);
const $$ = (q, c = document) => [...c.querySelectorAll(q)];

const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(pointer:fine)").matches;

const menuDrop = $("[data-menu-drop]");
const menuBackdrop = $("[data-menu-backdrop]");
const menuOpeners = $$("[data-menu-open]");
const menuCloser = $("[data-menu-close]");
const menuCategory = $("[data-menu-category]");
const menuSearch = $("[data-menu-search]");
const menuList = $("[data-menu-list]");
const menuCount = $("[data-menu-count]");

let menuState = { category: "All", search: "" };
let lastMenuTrigger = null;

const categories = ["All", ...new Set(menuItems.map(item => item.category))];

function populateCategories(){
  menuCategory.innerHTML = categories
    .map(category => `<option value="${category}">${category}</option>`)
    .join("");
}

function filteredMenu(){
  const q = menuState.search.trim().toLocaleLowerCase();
  return menuItems.filter(item => {
    const inCategory = menuState.category === "All" || item.category === menuState.category;
    const haystack = [item.name, item.category, item.note || ""].join(" ").toLocaleLowerCase();
    return inCategory && (!q || haystack.includes(q));
  });
}

function renderMenu(){
  const items = filteredMenu();
  menuCount.textContent = items.length;

  if(!items.length){
    menuList.innerHTML = `
      <div class="menu-empty">
        <div>
          <strong>No match.</strong><br>
          <span>Try another category or search.</span>
        </div>
      </div>`;
    return;
  }

  menuList.innerHTML = items.map((item, index) => `
    <article class="menu-row" style="--i:${Math.min(index, 18)}">
      <div class="menu-row-copy">
        <small>${item.category}</small>
        <strong>${item.name}</strong>
        ${item.note ? `<p>${item.note}</p>` : ""}
      </div>
      <div class="menu-row-price">${item.price} DA</div>
    </article>
  `).join("");
}

function openMenu(trigger){
  lastMenuTrigger = trigger || document.activeElement;
  menuDrop.classList.add("open");
  menuBackdrop.classList.add("show");
  menuDrop.setAttribute("aria-hidden", "false");
  document.body.classList.add("menu-open");
  renderMenu();
  requestAnimationFrame(() => menuSearch?.focus({preventScroll:true}));
}

function closeMenu(){
  menuDrop.classList.remove("open");
  menuBackdrop.classList.remove("show");
  menuDrop.setAttribute("aria-hidden", "true");
  document.body.classList.remove("menu-open");
  if(lastMenuTrigger instanceof HTMLElement) lastMenuTrigger.focus({preventScroll:true});
}

populateCategories();
renderMenu();

menuOpeners.forEach(button => button.addEventListener("click", () => openMenu(button)));
menuCloser.addEventListener("click", closeMenu);
menuBackdrop.addEventListener("click", closeMenu);

menuCategory.addEventListener("change", event => {
  menuState.category = event.target.value;
  renderMenu();
});

menuSearch.addEventListener("input", event => {
  menuState.search = event.target.value;
  renderMenu();
});

addEventListener("keydown", event => {
  if(event.key === "Escape" && menuDrop.classList.contains("open")) closeMenu();
});

menuDrop.addEventListener("keydown", event => {
  if(event.key !== "Tab") return;
  const focusable = $$("button, input, select, a[href]", menuDrop).filter(el => !el.disabled);
  if(!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if(event.shiftKey && document.activeElement === first){
    event.preventDefault();
    last.focus();
  }else if(!event.shiftKey && document.activeElement === last){
    event.preventDefault();
    first.focus();
  }
});

const revealTargets = $$("[data-reveal]");

if(!reducedMotion && "IntersectionObserver" in window){
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      entry.target.classList.toggle("visible", entry.isIntersecting);
    });
  }, {
    threshold: 0.16,
    rootMargin: "-4% 0px -7% 0px"
  });

  revealTargets.forEach(target => revealObserver.observe(target));
}else{
  revealTargets.forEach(target => target.classList.add("visible"));
}

const header = $("[data-header]");
let lastScrollY = scrollY;
let headerRAF = 0;

function updateHeader(){
  headerRAF = 0;
  const y = scrollY;
  header.classList.toggle("scrolled", y > 20);

  if(y > lastScrollY && y > 300){
    header.classList.add("hidden");
  }else{
    header.classList.remove("hidden");
  }

  lastScrollY = y;
}

addEventListener("scroll", () => {
  if(headerRAF) return;
  headerRAF = requestAnimationFrame(updateHeader);
}, {passive:true});

const parallaxItems = $$("[data-parallax]");
let parallaxRAF = 0;

function updateParallax(){
  parallaxRAF = 0;
  if(reducedMotion) return;

  const vh = innerHeight;

  parallaxItems.forEach(item => {
    const speed = Number(item.dataset.parallax || 0);
    const rect = item.getBoundingClientRect();

    if(rect.bottom < -120 || rect.top > vh + 120) return;

    const centerDelta = (rect.top + rect.height * 0.5) - vh * 0.5;
    const offset = Math.max(-82, Math.min(82, centerDelta * -speed));
    item.style.setProperty("--py", offset.toFixed(2) + "px");
  });
}

function requestParallax(){
  if(parallaxRAF) return;
  parallaxRAF = requestAnimationFrame(updateParallax);
}

addEventListener("scroll", requestParallax, {passive:true});
addEventListener("resize", requestParallax);
requestParallax();

if(finePointer && !reducedMotion){
  $$("[data-tilt]").forEach(frame => {
    frame.addEventListener("pointermove", event => {
      const rect = frame.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      frame.style.setProperty("--ry", (x * 5.5).toFixed(2) + "deg");
      frame.style.setProperty("--rx", (y * -4.5).toFixed(2) + "deg");
    });

    frame.addEventListener("pointerleave", () => {
      frame.style.setProperty("--ry", "0deg");
      frame.style.setProperty("--rx", "0deg");
    });
  });
}

const cursor = $("#iceCursor");
const particleLayer = $("#cursorParticles");

if(finePointer && !reducedMotion && cursor){
  document.documentElement.classList.add("custom-cursor");

  let x = -100;
  let y = -100;
  let lastX = -100;
  let lastY = -100;
  let lastT = performance.now();
  let angle = 0;
  let stretch = 0;
  let targetStretch = 0;
  let speed01 = 0;
  let lastParticleAt = 0;
  let cursorRAF = 0;

  const particlePool = Array.from({length: 26}, () => {
    const node = document.createElement("span");
    node.className = "cursor-particle";
    node.style.opacity = "0";
    particleLayer.append(node);
    return node;
  });

  let particleIndex = 0;

  function spawnParticle(px, py, intensity){
    const now = performance.now();
    const interval = 54 - intensity * 32;
    if(now - lastParticleAt < interval) return;
    lastParticleAt = now;

    const particle = particlePool[particleIndex++ % particlePool.length];
    const size = 3 + intensity * 5;
    const driftX = (Math.random() - 0.5) * (8 + intensity * 18);
    const fallY = 10 + intensity * 24;
    const lifetime = 360 + Math.random() * 220;

    particle.getAnimations().forEach(animation => animation.cancel());
    particle.style.width = size + "px";
    particle.style.height = size + "px";
    particle.style.left = px + "px";
    particle.style.top = py + "px";
    particle.style.opacity = "1";

    particle.animate([
      {
        transform: "translate(-50%,-50%) scale(1)",
        opacity: 0.82,
        filter: "blur(0px)"
      },
      {
        transform: `translate(calc(-50% + ${driftX}px), calc(-50% + ${fallY}px)) scale(.28)`,
        opacity: 0,
        filter: `blur(${1 + intensity * 2.2}px)`
      }
    ], {
      duration: lifetime,
      easing: "cubic-bezier(.22,1,.36,1)",
      fill: "forwards"
    });
  }

  addEventListener("pointermove", event => {
    const now = performance.now();
    const dt = Math.max(7, now - lastT);
    const dx = event.clientX - lastX;
    const dy = event.clientY - lastY;
    const velocity = Math.hypot(dx,dy) / dt;

    speed01 = Math.min(1, velocity / 2.35);
    targetStretch = speed01 * 0.48;

    if(Math.abs(dx) + Math.abs(dy) > 0.15){
      angle = Math.atan2(dy,dx) * 180 / Math.PI + 90;
    }

    x = event.clientX;
    y = event.clientY;
    lastX = x;
    lastY = y;
    lastT = now;

    cursor.classList.add("ready");

    if(speed01 > 0.24){
      spawnParticle(x - dx * 0.28, y - dy * 0.28 + 8, speed01);
    }

    if(!cursorRAF) cursorRAF = requestAnimationFrame(cursorFrame);
  }, {passive:true});

  function cursorFrame(){
    cursorRAF = 0;
    stretch += (targetStretch - stretch) * 0.28;
    targetStretch *= 0.82;
    speed01 *= 0.9;

    cursor.style.setProperty("--angle", angle.toFixed(2) + "deg");
    cursor.style.setProperty("--stretch", stretch.toFixed(3));
    cursor.style.transform =
      `translate3d(${x}px,${y}px,0) translate(-50%,-50%) rotate(${angle}deg) scale(${1 + stretch},${1 - stretch * 0.18})`;

    if(Math.abs(targetStretch - stretch) > 0.003 || speed01 > 0.02){
      cursorRAF = requestAnimationFrame(cursorFrame);
    }
  }

  document.addEventListener("mouseover", event => {
    const interactive = !!event.target.closest("a,button,input,select,[data-tilt]");
    cursor.classList.toggle("hover", interactive);
  });

  document.addEventListener("mouseleave", () => cursor.classList.remove("ready"));
  document.addEventListener("mouseenter", () => cursor.classList.add("ready"));
}

const mapWrap = $(".map-wrap");
const mapIframe = $(".map-wrap iframe");

mapIframe?.addEventListener("load", () => {
  mapWrap?.classList.add("map-loaded");
});
