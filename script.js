const menuItems = [
  { name: "Cookie Cup Coffee", category: "Signature", note: "Coffee served in an edible cookie cup and finished with ice cream." },
  { name: "Iced Matcha Latte", category: "Drinks", note: "A chilled matcha favorite." },
  { name: "Hot Chocolate", category: "Drinks", note: "A warm chocolate drink for slower café moments." },
  { name: "Hot Drinks", category: "Drinks", note: "Coffee and other warm drinks." },
  { name: "Cold Drinks", category: "Drinks", note: "Cold café drinks and refreshers." },
  { name: "New York Roll", category: "Pastries", note: "A laminated round pastry with a rich filling." },
  { name: "Pastries & Viennoiserie", category: "Pastries", note: "Sweet baked treats from the counter." },
  { name: "Ice Cream", category: "Desserts", note: "Scoops and ice-cream desserts." }
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
      <div class="menu-row-price">Available in store</div>
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

menuOpeners.forEach(button => button.addEventListener("click", event => {
  if(button.matches("a")) event.preventDefault();
  openMenu(button);
}));
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
      frame.style.setProperty("--ry", (x * 4).toFixed(2) + "deg");
      frame.style.setProperty("--rx", (y * -3.5).toFixed(2) + "deg");
    });

    frame.addEventListener("pointerleave", () => {
      frame.style.setProperty("--ry", "0deg");
      frame.style.setProperty("--rx", "0deg");
    });
  });
}

const cursor = $("#iceCursor");
const cursorShape = cursor ? $(".cursor-shape", cursor) : null;

if(finePointer && !reducedMotion && cursor && cursorShape){
  document.documentElement.classList.add("custom-cursor");

  let lastX = -100;
  let lastY = -100;
  let lastT = performance.now();
  let speedTarget = 0;
  let speedCurrent = 0;
  let cursorRAF = 0;

  function cursorShapeFrame(){
    cursorRAF = 0;
    speedCurrent += (speedTarget - speedCurrent) * .28;
    speedTarget *= .78;

    const sx = 1 + speedCurrent * .22;
    const sy = 1 - speedCurrent * .1;

    cursorShape.style.setProperty("--sx", sx.toFixed(3));
    cursorShape.style.setProperty("--sy", sy.toFixed(3));

    if(Math.abs(speedTarget - speedCurrent) > .002){
      cursorRAF = requestAnimationFrame(cursorShapeFrame);
    }
  }

  const moveCursor = event => {
    const now = performance.now();
    const dt = Math.max(6, now - lastT);
    const dx = event.clientX - lastX;
    const dy = event.clientY - lastY;
    const velocity = Math.hypot(dx,dy) / dt;

    speedTarget = Math.max(speedTarget, Math.min(1, velocity / 2.25));
    cursor.style.transform =
      `translate3d(${event.clientX}px,${event.clientY}px,0) translate(-50%,-50%)`;
    cursor.classList.add("ready");

    lastX = event.clientX;
    lastY = event.clientY;
    lastT = now;

    if(!cursorRAF) cursorRAF = requestAnimationFrame(cursorShapeFrame);
  };

  addEventListener("pointermove", moveCursor, {passive:true});

  document.addEventListener("mouseover", event => {
    const interactive = !!event.target.closest("a,button,input,select,iframe,[data-tilt]");
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
