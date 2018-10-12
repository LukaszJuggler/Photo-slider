const slider = document.querySelector('#slider');
const fullscreen = document.querySelector('#fullscreen');
const photo1 = document.querySelector('#photo1');
const photo2 = document.querySelector('#photo2');
const photo3 = document.querySelector('#photo3');
const photo4 = document.querySelector('#photo4');
const photo5 = document.querySelector('#photo5');
const photos = [photo1, photo2, photo3, photo4, photo5];

let isFullscreen = false;
let sliderLeft = 0;
let animate = true;
const photoWidth = 540;

//set flex order for each photo
photos.forEach((photo, i) => {
      photo.style.order = i+1;
});


let isPhotoOffScreen = function() {
      return -sliderLeft >= photoWidth;
}
function changeImgOrder() {
      photos.forEach(photo => {
            photo.style.order--;
            if (photo.style.order == 0) {
                  photo.style.order = photos.length;
            }
      });
}

function repeat() {
    if (!isFullscreen && animate) {
            if (isPhotoOffScreen()) {
                  sliderLeft = 0;
                  changeImgOrder();
            }
            //move slider
            sliderLeft-=2;
            slider.style.marginLeft = `${sliderLeft}px`;
    }
    requestAnimationFrame(repeat);
}

function fullscreen__on(clickedPhoto) {
      fullscreen.innerHTML = `<img src=${clickedPhoto.src} alt="random photo">`;
      isFullscreen = true;
      fullscreen.classList.add("show__photo");
}
function fullscreen__off(clickedPhoto) {
      
      fullscreen.innerHTML = ``;
      isFullscreen = false;
      fullscreen.classList.remove("show__photo");
}
function startAnimation() {
      animate = true;
}

function stopAnimation() {
      animate = false;
}

slider.addEventListener("mouseover", stopAnimation);
slider.addEventListener("mouseleave", startAnimation);
slider.addEventListener("click", function(e) {  
      fullscreen__on(e.target);
});
fullscreen.addEventListener("click", fullscreen__off);

repeat();