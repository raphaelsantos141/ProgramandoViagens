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
          : (link.style.animation = `navLinkFade 0.5s ease forwards ${
              index / 7 + 0.3
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

/*Galeria da página principal*/
const imagens_carrosel = document.querySelector(".imagens_carrosel");
const carrosel = document.querySelector(".carrosel");
const firstCardWidth = carrosel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".imagens_carrosel i");
const carroselChildrens = [...carrosel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carrosel at once
let cardPerView = Math.round(carrosel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carrosel for infinite scrolling
carroselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carrosel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carrosel for infinite scrolling
carroselChildrens.slice(0, cardPerView).forEach(card => {
    carrosel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carrosel at appropriate postition to hide first few duplicate cards on Firefox
carrosel.classList.add("no-transition");
carrosel.scrollLeft = carrosel.offsetWidth;
carrosel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carrosel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carrosel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carrosel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carrosel
    startX = e.pageX;
    startScrollLeft = carrosel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carrosel based on the cursor movement
    carrosel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carrosel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carrosel is at the beginning, scroll to the end
    if(carrosel.scrollLeft === 0) {
        carrosel.classList.add("no-transition");
        carrosel.scrollLeft = carrosel.scrollWidth - (2 * carrosel.offsetWidth);
        carrosel.classList.remove("no-transition");
    }
    // If the carrosel is at the end, scroll to the beginning
    else if(Math.ceil(carrosel.scrollLeft) === carrosel.scrollWidth - carrosel.offsetWidth) {
        carrosel.classList.add("no-transition");
        carrosel.scrollLeft = carrosel.offsetWidth;
        carrosel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carrosel
    clearTimeout(timeoutId);
    if(!imagens_carrosel.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carrosel after every 2500 ms
    timeoutId = setTimeout(() => carrosel.scrollLeft += firstCardWidth, 3000);
}
autoPlay();

carrosel.addEventListener("mousedown", dragStart);
carrosel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carrosel.addEventListener("scroll", infiniteScroll);
imagens_carrosel.addEventListener("mouseenter", () => clearTimeout(timeoutId));
imagens_carrosel.addEventListener("mouseleave", autoPlay);

let slides = document.querySelectorAll('.slide-container');
let index = 0;

function next(){
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
}

function prev(){
    slides[index].classList.remove('active');
    index = (index - 1 + slides.length) % slides.length;
    slides[index].classList.add('active');
}

setInterval(next, 7000);
/*Fim da Galeria da página principal*/

let slideIndex = 0;
showSlides();

