//Script Menu Responsivo
class MobileNavbar {
  constructor(mobileMenu, navList, navLinks) {
    this.mobileMenu = document.querySelector(mobileMenu);
    this.navList = document.querySelector(navList);
    this.navLinks = document.querySelectorAll(navLinks);
    this.activeClass = "active";

    this.handleClick = this.handleClick.bind(this);
  }

  animateLinks() {
    this.navLinks.forEach((link, index) => {
      link.style.animation
        ? (link.style.animation = "")
        : (link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3
          }s`);
    });
  }

  handleClick() {
    this.navList.classList.toggle(this.activeClass);
    this.mobileMenu.classList.toggle(this.activeClass);
    this.animateLinks();
  }

  addClickEvent() {
    this.mobileMenu.addEventListener("click", this.handleClick);
  }

  init() {
    if (this.mobileMenu) {
      this.addClickEvent();
    }
    return this;
  }
}

const mobileNavbar = new MobileNavbar(
  ".mobile-menu",
  ".nav-list",
  ".nav-list li",
);
mobileNavbar.init();
//Script Menu Responsivo

/*Galeria da página principal*/
const imagens_carrosel = document.querySelector(".imagens_carrosel");
const carrosel = document.querySelector(".carrosel");
const firstCardWidth = carrosel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".imagens_carrosel i");
const carroselChildrens = [...carrosel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

let cardPerView = Math.round(carrosel.offsetWidth / firstCardWidth);

carroselChildrens.slice(-cardPerView).reverse().forEach(card => {
  carrosel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

carroselChildrens.slice(0, cardPerView).forEach(card => {
  carrosel.insertAdjacentHTML("beforeend", card.outerHTML);
});

carrosel.classList.add("no-transition");
carrosel.scrollLeft = carrosel.offsetWidth;
carrosel.classList.remove("no-transition");

arrowBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    carrosel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  carrosel.classList.add("dragging");
  startX = e.pageX;
  startScrollLeft = carrosel.scrollLeft;
}

const dragging = (e) => {
  if (!isDragging) return;
  carrosel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
  isDragging = false;
  carrosel.classList.remove("dragging");
}

const infiniteScroll = () => {
  if (carrosel.scrollLeft === 0) {
    carrosel.classList.add("no-transition");
    carrosel.scrollLeft = carrosel.scrollWidth - (2 * carrosel.offsetWidth);
    carrosel.classList.remove("no-transition");
  }
  else if (Math.ceil(carrosel.scrollLeft) === carrosel.scrollWidth - carrosel.offsetWidth) {
    carrosel.classList.add("no-transition");
    carrosel.scrollLeft = carrosel.offsetWidth;
    carrosel.classList.remove("no-transition");
  }

  clearTimeout(timeoutId);
  if (!imagens_carrosel.matches(":hover")) autoPlay();
}

const autoPlay = () => {
  if (window.innerWidth < 800 || !isAutoPlay) return;
  timeoutId = setTimeout(() => carrosel.scrollLeft += firstCardWidth, 3000);
}
autoPlay();
//Fim Galeria 1
//Galeria 2
carrosel.addEventListener("mousedown", dragStart);
carrosel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carrosel.addEventListener("scroll", infiniteScroll);
imagens_carrosel.addEventListener("mouseenter", () => clearTimeout(timeoutId));
imagens_carrosel.addEventListener("mouseleave", autoPlay);

let slides = document.querySelectorAll('.slide-container');
let index = 0;

function next() {
  slides[index].classList.remove('active');
  index = (index + 1) % slides.length;
  slides[index].classList.add('active');
}

function prev() {
  slides[index].classList.remove('active');
  index = (index - 1 + slides.length) % slides.length;
  slides[index].classList.add('active');
}
setInterval(next, 7000);
let slideIndex = 0;
showSlides();
//Fim da Galeria 2