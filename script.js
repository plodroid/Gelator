const menuItems = [
  { name:"Classic Waffle", category:"Waffles", price:350, note:"Chocolate, fruit or caramel" },
  { name:"Pistachio Waffle", category:"Waffles", price:550, note:"Pistachio cream and roasted nuts" },
  { name:"Berry Waffle", category:"Waffles", price:500, note:"Berries, cream and sauce" },
  { name:"Mini Waffle Bites", category:"Waffles", price:300, note:"A small shareable box" },

  { name:"Chocolate Crêpe", category:"Crêpes", price:350 },
  { name:"Banana Crêpe", category:"Crêpes", price:450 },
  { name:"Pistachio Crêpe", category:"Crêpes", price:550 },
  { name:"Fruit Crêpe", category:"Crêpes", price:600 },

  { name:"Vanilla Scoop", category:"Gelato", price:250 },
  { name:"Strawberry Scoop", category:"Gelato", price:250 },
  { name:"Pistachio Scoop", category:"Gelato", price:300 },
  { name:"Mello Mix", category:"Gelato", price:650, note:"Three demo flavors and toppings" },

  { name:"Berry Cake", category:"Cakes", price:450 },
  { name:"Chocolate Slice", category:"Cakes", price:500 },
  { name:"Pistachio Slice", category:"Cakes", price:550 },
  { name:"Mini Cheesecake", category:"Cakes", price:400 },

  { name:"Iced Coffee", category:"Drinks", price:300 },
  { name:"Milkshake", category:"Drinks", price:400 },
  { name:"Hot Chocolate", category:"Drinks", price:300 },
  { name:"Fruit Cooler", category:"Drinks", price:350 }
];

const $ = (q, c=document) => c.querySelector(q);
const $$ = (q, c=document) => [...c.querySelectorAll(q)];
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
let menuState = {category:"All",search:""};
let lastMenuTrigger = null;

const categories = ["All", ...new Set(menuItems.map(i=>i.category))];

function populateCategories(){
  menuCategory.innerHTML = categories.map(category => `<option value="${category}">${category}</option>`).join("");
}

function filteredMenu(){
  const q = menuState.search.trim().toLowerCase();
  return menuItems.filter(item => {
    const inCategory = menuState.category === "All" || item.category === menuState.category;
    const haystack = [item.name,item.category,item.note||""].join(" ").toLowerCase();
    return inCategory && (!q || haystack.includes(q));
  });
}

function renderMenu(){
  const items = filteredMenu();
  menuCount.textContent = items.length;
  if(!items.length){
    menuList.innerHTML = '<div class="menu-empty"><div><strong>No match.</strong><br><span>Try another category or search.</span></div></div>';
    return;
  }

  menuList.innerHTML = items.map((item,index)=>`
    <article class="menu-row" style="--i:${Math.min(index,18)}">
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
  menuDrop.setAttribute("aria-hidden","false");
  document.body.classList.add("menu-open");
  renderMenu();
  requestAnimationFrame(()=>menuSearch?.focus({preventScroll:true}));
}

function closeMenu(){
  menuDrop.classList.remove("open");
  menuBackdrop.classList.remove("show");
  menuDrop.setAttribute("aria-hidden","true");
  document.body.classList.remove("menu-open");
  if(lastMenuTrigger instanceof HTMLElement) lastMenuTrigger.focus({preventScroll:true});
}

populateCategories();
renderMenu();
menuOpeners.forEach(button=>button.addEventListener("click",()=>openMenu(button)));
menuCloser.addEventListener("click",closeMenu);
menuBackdrop.addEventListener("click",closeMenu);
menuCategory.addEventListener("change",e=>{menuState.category=e.target.value;renderMenu();});
menuSearch.addEventListener("input",e=>{menuState.search=e.target.value;renderMenu();});

addEventListener("keydown",event=>{
  if(event.key==="Escape" && menuDrop.classList.contains("open")) closeMenu();
});

menuDrop.addEventListener("keydown",event=>{
  if(event.key!=="Tab") return;
  const focusable = $$("button,input,select,a[href]",menuDrop).filter(el=>!el.disabled);
  if(!focusable.length) return;
  const first=focusable[0], last=focusable[focusable.length-1];
  if(event.shiftKey && document.activeElement===first){event.preventDefault();last.focus();}
  else if(!event.shiftKey && document.activeElement===last){event.preventDefault();first.focus();}
});

const revealTargets = $$("[data-reveal]");
if(!reducedMotion && "IntersectionObserver" in window){
  const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>entry.target.classList.toggle("visible",entry.isIntersecting));
  },{threshold:.16,rootMargin:"-4% 0px -7% 0px"});
  revealTargets.forEach(target=>observer.observe(target));
}else{
  revealTargets.forEach(target=>target.classList.add("visible"));
}

const header=$("[data-header]");
let lastScrollY=scrollY;
let headerRAF=0;
function updateHeader(){
  headerRAF=0;
  const y=scrollY;
  header.classList.toggle("scrolled",y>20);
  header.classList.toggle("hidden",y>lastScrollY && y>300);
  lastScrollY=y;
}
addEventListener("scroll",()=>{if(!headerRAF) headerRAF=requestAnimationFrame(updateHeader);},{passive:true});

const parallaxItems=$$("[data-parallax]");
const parallaxState=new Map(parallaxItems.map(item=>[item,{current:0,target:0}]));
let measureRAF=0,motionRAF=0;
function measureParallax(){
  measureRAF=0;
  if(reducedMotion) return;
  const vh=innerHeight;
  parallaxItems.forEach(item=>{
    const rect=item.getBoundingClientRect();
    if(rect.bottom < -160 || rect.top > vh+160) return;
    const speed=Number(item.dataset.parallax||0);
    const center=(rect.top+rect.height*.5)-vh*.5;
    parallaxState.get(item).target=Math.max(-78,Math.min(78,center*-speed));
  });
  if(!motionRAF) motionRAF=requestAnimationFrame(animateParallax);
}
function animateParallax(){
  motionRAF=0;
  let again=false;
  parallaxState.forEach((state,item)=>{
    const delta=state.target-state.current;
    state.current+=delta*.13;
    if(Math.abs(delta)>.08) again=true;
    item.style.setProperty("--py",state.current.toFixed(2)+"px");
  });
  if(again) motionRAF=requestAnimationFrame(animateParallax);
}
function requestParallax(){if(!measureRAF) measureRAF=requestAnimationFrame(measureParallax);}
addEventListener("scroll",requestParallax,{passive:true});
addEventListener("resize",requestParallax);
requestParallax();

if(finePointer && !reducedMotion){
  $$("[data-tilt]").forEach(frame=>{
    frame.addEventListener("pointermove",event=>{
      const rect=frame.getBoundingClientRect();
      const x=(event.clientX-rect.left)/rect.width-.5;
      const y=(event.clientY-rect.top)/rect.height-.5;
      frame.style.setProperty("--ry",(x*5.5).toFixed(2)+"deg");
      frame.style.setProperty("--rx",(y*-4.5).toFixed(2)+"deg");
    });
    frame.addEventListener("pointerleave",()=>{
      frame.style.setProperty("--ry","0deg");
      frame.style.setProperty("--rx","0deg");
    });
  });
}

/* Cursor behavior lives in cursor.js so it has one owner only. */

const lightbox=$("#lightbox");
const lightboxImage=$("[data-lightbox-image]");
const lightboxCaption=$("[data-lightbox-caption]");
let lightboxReturnFocus=null;

function openLightbox(card){
  lightboxReturnFocus=card;
  lightboxImage.src=card.dataset.lightbox;
  lightboxImage.alt=$("img",card)?.alt || "Mello demo artwork";
  lightboxCaption.textContent=$("figcaption span",card)?.textContent || "";
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden","false");
  document.body.classList.add("menu-open");
  requestAnimationFrame(()=>$(".lightbox-close",lightbox)?.focus({preventScroll:true}));
}
function closeLightbox(){
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden","true");
  document.body.classList.remove("menu-open");
  lightboxImage.removeAttribute("src");
  lightboxReturnFocus?.focus({preventScroll:true});
}
$$("[data-lightbox]").forEach(card=>{
  card.addEventListener("click",()=>openLightbox(card));
  card.addEventListener("keydown",event=>{
    if(event.key==="Enter" || event.key===" "){event.preventDefault();openLightbox(card);}
  });
});
$$("[data-lightbox-close]").forEach(button=>button.addEventListener("click",closeLightbox));
addEventListener("keydown",event=>{
  if(event.key==="Escape" && lightbox?.classList.contains("open")) closeLightbox();
});

const demoMap=$(".demo-map");
if(demoMap) requestAnimationFrame(()=>demoMap.classList.add("map-loaded"));