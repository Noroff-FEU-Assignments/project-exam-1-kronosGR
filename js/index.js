import { fetchAllPosts, fetchMediaWithUrl } from "/js/be.js";

const carousel = document.querySelector(".carousel");
const carouselInner = document.querySelector(".car-inner");
const next = document.querySelector("#next");
const previous = document.querySelector("#previous");
const circle1 = document.querySelector("#circle1");
const circle2 = document.querySelector("#circle2");
const circle3 = document.querySelector("#circle3");
const learningList = document.querySelector(".learning-list");

var page = 1;
let res;
let posts;

next.addEventListener("click", (e) => {
  page = page < 3 ? (page += 1) : 3;
  const childWidth = carousel.offsetWidth - (carousel.offsetWidth / 100) * 4;
  carouselInner.scrollBy({
    top: 0,
    left: childWidth,
    behavior: "smooth",
  });
  checkTheCircles();
});
previous.addEventListener("click", () => {
  page = page > 1 ? (page -= 1) : 1;
  const childWidth = carousel.offsetWidth - (carousel.offsetWidth / 100) * 5;
  carouselInner.scrollBy({
    top: 0,
    left: -childWidth,
    behavior: "smooth",
  });
  checkTheCircles();
});

circle1.addEventListener("click", () => {
  page = 1;
  const childWidth = carouselInner.offsetWidth;
  carouselInner.scrollBy({
    top: 0,
    left: -childWidth * 3,
    behavior: "smooth",
  });
  checkTheCircles();
});
circle2.addEventListener("click", () => {
  const childWidth = carouselInner.offsetWidth;
  let offset = 0;
  if (page == 1) {
    offset = childWidth - (carousel.offsetWidth / 100) * 3;
  } else if (page == 3) {
    offset = -childWidth + (carousel.offsetWidth / 100) * 4;
  }

  page = 2;
  carouselInner.scrollBy({
    top: 0,
    left: offset,
    behavior: "smooth",
  });
  checkTheCircles();
});
circle3.addEventListener("click", () => {
  page = 3;
  const childWidth = carouselInner.offsetWidth;
  carouselInner.scrollBy({
    top: 0,
    left: childWidth * 3,
    behavior: "smooth",
  });
  checkTheCircles();
});
window.addEventListener("resize", () => {
  console.log("a");
  adjustSize();
});

showPage();

async function showPage() {
  res = await fetchAllPosts(12, "desc");
  posts = await getMedia();
  showCarousel();
  fillStartLearning();
}

/**
 * add the pages to the carousel
 */
function showCarousel() {
  carouselInner.innerHTML = "";
  carouselInner.appendChild(printCarouselPages(1, posts));
  carouselInner.appendChild(printCarouselPages(2, posts));
  carouselInner.appendChild(printCarouselPages(3, posts));
  carouselInner.innerHTML += "<div class='after'></div>";
  adjustSize();
}

/**
 * adjusts the size for the carousel items
 */
function adjustSize() {
  const childWidth = carousel.offsetWidth;
  const children = document.querySelectorAll(".carousel-item");
  children.forEach((child) => {
    child.style.width = childWidth / 16 / 2.1 + "rem";
  });
}

/**
 * creates the pages for the carousel
 * @param {int} pag current page
 * @param {array} arr posts to print
 * @returns
 */
function printCarouselPages(pag, arr) {
  const pageSize = 4;
  let start = 0 + (pag * pageSize - pageSize);

  const p = document.createElement("div");
  p.id = "page" + pag;
  p.classList.add("carousel-child");
  for (let i = start; i < start + pageSize; i++) {
    p.innerHTML += `
    <a href="tutorial.html?id=${arr[i].id}" class="carousel-item">
      <img src=${arr[i].thumb} alt="${arr[i].title}">
      <div>
        <h2>${arr[i].title}</h2>
      </div>
    </a>
    `;
  }
  return p;
}

/**
 * Gets media for the games
 * @returns An array
 */
async function getMedia() {
  let results = res.map((post) => {
    return fetchMediaWithUrl(post["_links"]["wp:featuredmedia"][0].href).then(
      (images) => {
        const thumb = images["media_details"].sizes.medium.source_url;
        const title = post.title.rendered;
        const postId = post.id;
        return { title: title, thumb: thumb, id: postId };
      }
    );
  });
  return Promise.all(results);
}

/**
 * updates the circles on the screen
 */
function checkTheCircles() {
  switch (page) {
    case 1:
      circle1.src = "/images/circle.png";
      circle2.src = "/images/circle-empty.png";
      circle3.src = "/images/circle-empty.png";
      break;
    case 2:
      circle1.src = "/images/circle-empty.png";
      circle2.src = "/images/circle.png";
      circle3.src = "/images/circle-empty.png";
      break;
    case 3:
      circle1.src = "/images/circle-empty.png";
      circle2.src = "/images/circle-empty.png";
      circle3.src = "/images/circle.png";
      break;
  }
}

/**
 * Shows the start learning list
 */
async function fillStartLearning() {
  const learningPosts = await fetchAllPosts(6, "asc");

  learningPosts.forEach((post) => {
    const learningItem = document.createElement("div");
    learningItem.classList.add("learning-item");

    let shortDesc = post.content.rendered.substring(0, 100) + "...";
    learningItem.innerHTML = `<h3>${post.title.rendered}</h3>
    <p>${shortDesc}</p><br><br>
    <a href="tutorial.html?id=${post.id}" class="cta">Read</a>
    `;

    learningList.appendChild(learningItem);
  });
}
