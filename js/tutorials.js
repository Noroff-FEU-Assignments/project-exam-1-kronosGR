import { getPostsWithTotal } from "./be.js";
import { showPaging } from './utils.js';

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
  getPostsWithTotal("asc", page, pageSize)
    .then((res) => {
      totalPages = Number(res.headers.get("x-wp-totalPages"));
      showPaging(tutorialsPaging, page, totalPages, "tutorials.html");
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
