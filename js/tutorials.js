import { fetchAllProduct, getProductsWithTotal } from "./be.js";

const tutorialsList = document.querySelector(".tutorials-list");
const tutorialsPaging = document.querySelector("#tutorials-paging");

const params = new URLSearchParams(window.location.search);
let page = Number(params.get("page")) || 1;
let totalPages = 0;
let pageSize = 10;

showPage();

function showPage() {
  fillTutorials();
}

/**
 * Shows the tutorial list
 */
async function fillTutorials() {
  getProductsWithTotal("asc", page, pageSize)
    .then((res) => {
      totalPages = Number(res.headers.get("x-wp-totalPages"));
      showPaging();
      return res.json();
    })
    .then((json) => {
      json.forEach((post) => {
        const tutItem = document.createElement("div");
        tutItem.classList.add("tutorial-item");

        let shortDesc = post.content.rendered.substring(0, 200) + "...";
        tutItem.innerHTML = `<h3>${post.title.rendered}</h3>
     <p>${shortDesc}</p><br><br>
     <a href="tutorial.html?id=${post.id}" class="cta">Read</a>
     `;

        tutorialsList.appendChild(tutItem);
      });
    });
}

function showPaging() {
  if (page > 1) {
    tutorialsPaging.innerHTML = `
    <a href="tutorials.html?page=${
      page - 1
    }" ><img src="/images/arrow-left.png" class="arrow-left"></a>
    `;
  } else {
    tutorialsPaging.innerHTML = `
    <a href="javascript: void(0)" class="disabled"><img src="/images/arrow-left.png" class="arrow-left"></a>
    `;
  }
  tutorialsPaging.innerHTML += `
  <span class="page-number">Page ${page} / ${totalPages}</span>
  `;

  if (page < totalPages) {
    tutorialsPaging.innerHTML += `
    <a href="tutorials.html?page=${
      page + 1
    }" ><img src="/images/arrow-right.png" class="arrow-right"></a>
    `;
  } else {
    tutorialsPaging.innerHTML += `
    <a href="javascript: void(0)" class="disabled"><img src="/images/arrow-right.png" class="arrow-right"></a>
    `;
  }
}
