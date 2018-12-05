//DOM elements
const slider = document.querySelector('#slider');
const fullscreen = document.querySelector('#fullscreen');
const loader = document.querySelector('#loader');
const photo1 = document.querySelector('#photo1');
const photo2 = document.querySelector('#photo2');
const photo3 = document.querySelector('#photo3');
const photo4 = document.querySelector('#photo4');
const photo5 = document.querySelector('#photo5');
const photos = [photo1, photo2, photo3, photo4, photo5];

const photoWidth = 540;
let isFullscreen = false;
let sliderMargin = 0;
let animate = true;


window.addEventListener('load', () => {
      //set flex order for each photo
      photos.forEach((photo, i) => {
            photo.style.order = i + 1;
      });

      // remove loader and show photos
      loader.parentNode.removeChild(loader);
      slider.classList.add('visible');

      // enable photo manipulation
      slider.addEventListener("mouseover", () => animate = false);
      slider.addEventListener("mouseleave", () => animate = true);
      slider.addEventListener("click", (e) => fullscreen__on(e.target));
      fullscreen.addEventListener("click", fullscreen__off);
      
      //start animating
      repeat();
});
let isPhotoOffScreen = () => {
      return -sliderMargin >= photoWidth;
}

function changeImgOrder() {
      photos.forEach(photo => {
            photo.style.order--;
            if (photo.style.order == 0) {
                  photo.style.order = photos.length;
            }
      });
};

function fullscreen__on(clickedPhoto) {
      fullscreen.innerHTML = `<img src=${clickedPhoto.src} alt="random photo">`;
      isFullscreen = true;
      fullscreen.classList.add("show__photo");
};

function fullscreen__off() {   
      fullscreen.innerHTML = ``;
      isFullscreen = false;
      fullscreen.classList.remove("show__photo");
};

function repeat() {
      if (!isFullscreen && animate) {
            if (isPhotoOffScreen()) {
                  sliderMargin = 0;
                  changeImgOrder();
            }
            //move slider
            sliderMargin -= 2;
            slider.style.marginLeft = `${sliderMargin}px`;
      }
      requestAnimationFrame(repeat);
};