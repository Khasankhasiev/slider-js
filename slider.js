let images = [
  {
    url: "slider-images/image1.png",
    title: "Заголовок слайда 1",
    text: "Описание 1. Может занимать от 1 до 7 строк. Описание 1. Может занимать от 1 до 7 строк. Описание 1. Может занимать от 1 до 7 строк. Описание 1. Может занимать от 1 до 7 строк. Описание 1. Может занимать от 1 до 7 строк. Описание 1. Может занимать от 1 до 7 строк.",
    btnText: "Текст кнопки 1",
    link: "https://www.youtube.com/",
  },
  {
    url: "slider-images/image2.png",
    title: "Заголовок слайда 2",
    text: "Описание 2. Может занимать от 1 до 7 строк. Описание 2. Может занимать от 1 до 7 строк. Описание 2. Может занимать от 1 до 7 строк. Описание 2. Может занимать от 1 до 7 строк. Описание 2. Может занимать от 1 до 7 строк. Описание 2. Может занимать от 1 до 7 строк.",
    btnText: "Текст кнопки 2",
    link: "https://mail.ru/",
  },
  {
    url: "slider-images/image3.png",
    title: "Заголовок слайда 3",
    text: "Описание 3. Может занимать от 1 до 7 строк. Описание 3. Может занимать от 1 до 7 строк. Описание 3. Может занимать от 1 до 7 строк. Описание 3. Может занимать от 1 до 7 строк. Описание 3. Может занимать от 1 до 7 строк. Описание 3. Может занимать от 1 до 7 строк.",
    btnText: "Текст кнопки 3",
    link: "https://okko.sport/",
  },
  {
    url: "slider-images/image4.png",
    title: "Заголовок слайда 4",
    text: "Описание 4. Может занимать от 1 до 7 строк. Описание 4. Может занимать от 1 до 7 строк. Описание 4. Может занимать от 1 до 7 строк. Описание 4. Может занимать от 1 до 7 строк. Описание 4. Может занимать от 1 до 7 строк. Описание 4. Может занимать от 1 до 7 строк.",
    btnText: "Текст кнопки 4",
    link: "https://animejoy.ru/tv-serialy/3356-blich-tysyacheletnyaya-krovavaya-voyna-2-chast.html",
  },
  {
    url: "slider-images/image5.png",
    title: "Заголовок слайда 5",
    text: "Описание 5. Может занимать от 1 до 7 строк. Описание 5. Может занимать от 1 до 7 строк. Описание 5. Может занимать от 1 до 7 строк. Описание 5. Может занимать от 1 до 7 строк. Описание 5. Может занимать от 1 до 7 строк. Описание 5. Может занимать от 1 до 7 строк.",
    btnText: "Текст кнопки 5",
    link: "https://html.spec.whatwg.org/multipage/named-characters.html",
  },
];

function initSlider() {
  if (!images || !images.length) return;

  let sliderImages = document.querySelector(".slider__images");
  let sliderArrows = document.querySelector(".slider__arrows");
  let sliderDots = document.querySelector(".slider__dots");
  let adaptiveSliderDots = document.querySelector(".adaptive-slider__dots");
  let sliderTitles = document.querySelector(".section__title");
  let sliderText = document.querySelector(".section__text");
  let sliderBtn = document.querySelector(".section__form");

  let container = document.querySelector(".container"); // the place where the handler acts

  initImages();
  initArrows();
  initDots();
  initTitles();
  initText();
  initBtnText();
  touchSwipe();

  function initImages() {
    images.forEach((image, index) => {
      let imageDiv = `<div class="image n${index} ${
        index === 0 ? "active" : ""
      }" style="background-image:url(${
        images[index].url
      });" data-index="${index}"></div>`;
      sliderImages.innerHTML += imageDiv;
    });
  }

  function initArrows() {
    sliderArrows.querySelectorAll(".slider__arrow").forEach((arrow) => {
      arrow.addEventListener("click", function () {
        let curNumber = +sliderImages.querySelector(".active").dataset.index;
        let nextNumber;
        if (arrow.classList.contains("left")) {
          nextNumber = curNumber === 0 ? images.length - 1 : curNumber - 1;
        } else {
          nextNumber = curNumber === images.length - 1 ? 0 : curNumber + 1;
        }
        moveSlider(nextNumber);
      });
    });
  }

  function initDots() {
    images.forEach((image, index) => {
      let dot = `<div class ="slider__dots-item n${index} ${
        index === 0 ? "active" : ""
      }" data-index = "${index}"></div>`;
      sliderDots.innerHTML += dot;
      adaptiveSliderDots.innerHTML += dot;
    });

    document.querySelectorAll(".slider__dots-item").forEach((dot) => {
      dot.addEventListener("click", function () {
        moveSlider(this.dataset.index);
      });
    });
  }

  function initTitles() {
    images.forEach((image, index) => {
      let link = `<h1 class ="description-title n${index} ${
        index === 0 ? "active" : ""
      }" data-index = "${index}">${images[index].title}</h1>`;
      sliderTitles.innerHTML += link;
    });
  }

  function initText() {
    images.forEach((image, index) => {
      let text = `<p class ="description-text n${index} ${
        index === 0 ? "active" : ""
      }" data-index = "${index}">${images[index].text}</p>`;
      sliderText.innerHTML += text;
    });
  }

  function initBtnText() {
    images.forEach((image, index) => {
      let btnText = `<button class ="section__description-button n${index} ${
        index === 0 ? "active" : ""
      }" type="submit" formaction = '${
        images[index].link
      }' data-index = '${index}'>${images[index].btnText}</button>`;
      sliderBtn.innerHTML += btnText;
    });
  }

  // moving slider images, active dots, titles, texts and button texts

  function moveSlider(num) {
    sliderImages.querySelector(".active").classList.remove("active");
    sliderImages.querySelector(".n" + num).classList.add("active");

    sliderDots.querySelector(".active").classList.remove("active");
    sliderDots.querySelector(".n" + num).classList.add("active");

    adaptiveSliderDots.querySelector(".active").classList.remove("active");
    adaptiveSliderDots.querySelector(".n" + num).classList.add("active");

    sliderTitles.querySelector(".active").classList.remove("active");
    sliderTitles.querySelector(".n" + num).classList.add("active");

    sliderText.querySelector(".active").classList.remove("active");
    sliderText.querySelector(".n" + num).classList.add("active");

    sliderBtn.querySelector(".active").classList.remove("active");
    sliderBtn.querySelector(".n" + num).classList.add("active");
  }

  // touch swipe
  function touchSwipe() {
    let startX, startY, endX, endY;

    container.addEventListener("touchstart", function (event) {
      startX = event.changedTouches[0].pageX;
      startY = event.changedTouches[0].pageY;
    });

    container.addEventListener("touchmove", function (event) {
      endX = event.changedTouches[0].pageX;
      endY = event.changedTouches[0].pageY;
    });

    container.addEventListener("touchend", function (event) {
      let deltaX = endX - startX;
      let deltaY = endY - startY;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // user swipes horizontal
        if (deltaX > 0) {
          // user swipes right
          let curNumber = +sliderImages.querySelector(".active").dataset.index;
          let prevNumber = curNumber === 0 ? images.length - 1 : curNumber - 1;
          moveSlider(prevNumber);
        } else {
          // user swipes left
          let curNumber = +sliderImages.querySelector(".active").dataset.index;
          let nextNumber = curNumber === images.length - 1 ? 0 : curNumber + 1;
          moveSlider(nextNumber);
        }
      }
    });
  }

  // autochange slider

  setInterval(function () {
    let curNumber = +sliderImages.querySelector(".active").dataset.index;
    let nextNumber = curNumber === images.length - 1 ? 0 : curNumber + 1;
    moveSlider(nextNumber);
  }, 5000);
}

document.addEventListener("DOMContentLoaded", initSlider);
