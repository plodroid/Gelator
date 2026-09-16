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
const parallaxState = new Map(
  parallaxItems.map(item => [item, {current:0, target:0}])
);
let parallaxMeasureRAF = 0;
let parallaxMotionRAF = 0;

function measureParallax(){
  parallaxMeasureRAF = 0;
  if(reducedMotion) return;

  const vh = innerHeight;

  parallaxItems.forEach(item => {
    const rect = item.getBoundingClientRect();
    if(rect.bottom < -160 || rect.top > vh + 160) return;

    const speed = Number(item.dataset.parallax || 0);
    const centerDelta = (rect.top + rect.height * .5) - vh * .5;
    const state = parallaxState.get(item);
    state.target = Math.max(-78, Math.min(78, centerDelta * -speed));
  });

  if(!parallaxMotionRAF) parallaxMotionRAF = requestAnimationFrame(animateParallax);
}

function animateParallax(){
  parallaxMotionRAF = 0;
  let keepGoing = false;

  parallaxState.forEach((state, item) => {
    const delta = state.target - state.current;
    state.current += delta * .13;

    if(Math.abs(delta) > .08) keepGoing = true;
    item.style.setProperty("--py", state.current.toFixed(2) + "px");
  });

  if(keepGoing) parallaxMotionRAF = requestAnimationFrame(animateParallax);
}

function requestParallaxMeasure(){
  if(parallaxMeasureRAF) return;
  parallaxMeasureRAF = requestAnimationFrame(measureParallax);
}

addEventListener("scroll", requestParallaxMeasure, {passive:true});
addEventListener("resize", requestParallaxMeasure);
requestParallaxMeasure();

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
const cursorShape = $(".cursor-shape", cursor);

if(finePointer && !reducedMotion && cursor && cursorShape){
  document.documentElement.classList.add("custom-cursor");

  let lastX = -100;
  let lastY = -100;
  let lastT = performance.now();
  let angleTarget = 0;
  let angleCurrent = 0;
  let speedTarget = 0;
  let speedCurrent = 0;
  let cursorRAF = 0;

  function cursorShapeFrame(){
    cursorRAF = 0;

    const angleDelta = ((angleTarget - angleCurrent + 540) % 360) - 180;
    angleCurrent += angleDelta * .24;
    speedCurrent += (speedTarget - speedCurrent) * .28;
    speedTarget *= .78;

    const sx = 1 + speedCurrent * .34;
    const sy = 1 - speedCurrent * .16;
    const blur = Math.min(.7, speedCurrent * .62);

    cursorShape.style.setProperty("--angle", angleCurrent.toFixed(2) + "deg");
    cursorShape.style.setProperty("--sx", sx.toFixed(3));
    cursorShape.style.setProperty("--sy", sy.toFixed(3));
    cursorShape.style.setProperty("--motion-blur", blur.toFixed(2) + "px");

    if(Math.abs(angleDelta) > .08 || Math.abs(speedTarget - speedCurrent) > .002){
      cursorRAF = requestAnimationFrame(cursorShapeFrame);
    }
  }

  const moveCursor = event => {
    const now = performance.now();
    const dt = Math.max(6, now - lastT);
    const dx = event.clientX - lastX;
    const dy = event.clientY - lastY;
    const velocity = Math.hypot(dx,dy) / dt;
    const speed01 = Math.min(1, velocity / 2.25);

    if(Math.abs(dx) + Math.abs(dy) > .08){
      angleTarget = Math.atan2(dy,dx) * 180 / Math.PI;
    }

    speedTarget = Math.max(speedTarget, speed01);

    // Position tracks the real pointer immediately; only shape/rotation are eased.
    cursor.style.transform =
      `translate3d(${event.clientX}px,${event.clientY}px,0) translate(-50%,-50%)`;
    cursor.classList.add("ready");

    lastX = event.clientX;
    lastY = event.clientY;
    lastT = now;

    if(!cursorRAF) cursorRAF = requestAnimationFrame(cursorShapeFrame);
  };

  const pointerEvent = "onpointerrawupdate" in window ? "pointerrawupdate" : "pointermove";
  addEventListener(pointerEvent, moveCursor, {passive:true});

  document.addEventListener("mouseover", event => {
    const interactive = !!event.target.closest(
      "a,button,input,select,iframe,[data-tilt],[data-lightbox]"
    );
    cursor.classList.toggle("hover", interactive);
  });

  addEventListener("pointerdown", () => {
    speedTarget = Math.max(speedTarget,.26);
    if(!cursorRAF) cursorRAF = requestAnimationFrame(cursorShapeFrame);
  }, {passive:true});

  document.addEventListener("mouseleave", () => cursor.classList.remove("ready"));
  document.addEventListener("mouseenter", () => cursor.classList.add("ready"));
}

const lightbox = $("#lightbox");
const lightboxImage = $("[data-lightbox-image]");
const lightboxCaption = $("[data-lightbox-caption]");
const lightboxCards = $$("[data-lightbox]");
const lightboxClosers = $$("[data-lightbox-close]");
let lightboxReturnFocus = null;

function openLightbox(card){
  if(!lightbox || !lightboxImage) return;
  lightboxReturnFocus = card;
  lightboxImage.src = card.dataset.lightbox;
  lightboxImage.alt = $("img",card)?.alt || "Zoom Gelato photo";
  lightboxCaption.textContent = $("figcaption strong",card)?.textContent || "";
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden","false");
  document.body.classList.add("menu-open");
  requestAnimationFrame(() => $(".lightbox-close",lightbox)?.focus({preventScroll:true}));
}

function closeLightbox(){
  if(!lightbox) return;
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden","true");
  document.body.classList.remove("menu-open");
  lightboxImage.removeAttribute("src");
  lightboxReturnFocus?.focus({preventScroll:true});
}

lightboxCards.forEach(card => {
  card.addEventListener("click",() => openLightbox(card));
  card.addEventListener("keydown",event => {
    if(event.key === "Enter" || event.key === " "){
      event.preventDefault();
      openLightbox(card);
    }
  });
});

lightboxClosers.forEach(button => button.addEventListener("click",closeLightbox));
addEventListener("keydown",event => {
  if(event.key === "Escape" && lightbox?.classList.contains("open")) closeLightbox();
});

const mapWrap = $(".map-wrap");
const mapIframe = $(".map-wrap iframe");

mapIframe?.addEventListener("load", () => {
  mapWrap?.classList.add("map-loaded");
});
