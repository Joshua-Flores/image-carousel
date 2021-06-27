const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide img');

// buttons
const buttonPrevious = document.querySelector('#button-previous');
const buttonNext = document.querySelector('#button-next');

// counter
let counter = 1;
const size = carouselImages[0].clientWidth;

// start slider on first slide
carouselSlide.style.transform = `translateX(${-size * counter}px)`;

// functionality for when a button is clicked
const circleClick = (id) => {
  let selectedImage = parseInt(id.charAt(id.length - 1), 10);
  counter = selectedImage;

  carouselSlide.style.transition = 'transform 0.4s ease-in-out';
  carouselSlide.style.transform = `translateX(${-size * counter}px)`;
  dotHighlight(counter);
};

// create dot navigation for each image
for (let i = 1; i < carouselImages.length - 1; i++) {
  const circle = document.createElement('button');
  circle.id = 'navCircle' + i;
  circle.classList.add('nav-circle');
  circle.addEventListener('click', (e) => {
    circleClick(e.target.id);
  });
  const circleContainer = document.querySelector('.slider-dots');
  circleContainer.appendChild(circle);
}

// highlight dot based on slide
const dotHighlight = (counter) => {
  const dots = document.querySelectorAll('.slider-dots button');
  dots.forEach((dot) => (dot.style.opacity = 0.7));

  if (counter === 0) {
    dots[0].style.opacity = 1;
  } else if (counter < carouselImages.length - 1) {
    dots[counter - 1].style.opacity = 1;
  }
};
dotHighlight(counter);

buttonNext.addEventListener('click', (event) => {
  if (counter >= carouselImages.length - 1) return;
  carouselSlide.style.transition = 'transform 0.4s ease-in-out';
  counter++;
  carouselSlide.style.transform = `translateX(${-size * counter}px)`;
  dotHighlight(counter);
});

buttonPrevious.addEventListener('click', (event) => {
  if (counter <= 0) return;
  carouselSlide.style.transition = 'transform 0.4s ease-in-out';
  counter--;
  carouselSlide.style.transform = `translateX(${-size * counter}px)`;
  dotHighlight(counter);
});

carouselSlide.addEventListener('transitionend', () => {
  if (carouselImages[counter].id === 'lastClone') {
    carouselSlide.style.transition = 'none';
    counter = carouselImages.length - 2;
    carouselSlide.style.transform = `translateX(${-size * counter}px)`;
    dotHighlight(counter);
  } else if (carouselImages[counter].id === 'firstClone') {
    carouselSlide.style.transition = 'none';
    counter = carouselImages.length - counter;
    carouselSlide.style.transform = `translateX(${-size * counter}px)`;
    dotHighlight(counter);
  }
});

setInterval(function () {
  counter++;
  dotHighlight(counter);
  carouselSlide.style.transition = 'transform 0.4s ease-in-out';
  carouselSlide.style.transform = `translateX(${-size * counter}px)`;
}, 10000);
