import { getPostWithId } from "./be.js";
import { regexHTML } from "./utils.js";

const tutorialTitle = document.querySelector(".tutorial-title");
const tutorial = document.querySelector(".tutorial");
const modalWindow = document.querySelector(".modal-window");
const modalWindowImg = document.querySelector(".modal-window--img");
const closetBtn = document.querySelector(".close--btn");
const figCaption = document.querySelector(".modal-window--figcaption")

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

closetBtn.addEventListener("click", () => {
  modalWindow.classList.remove("modal-window-show")
})


fillThePage();

async function fillThePage() {
  const post = await getPostWithId(id);

  const title = post.title.rendered;
  const text = post.content.rendered;
  const imgUrl = post.featured_media_src_url;

  // set document title
  document.title = "JS World | Tutorial | " + title;

  // fix and set document description
  const shortDesc = text.substring(0, 100);

  const cleanShortDesc = shortDesc.replace(regexHTML, "") + "...";
  document
    .querySelector('meta[name="description"]')
    .setAttribute("content", cleanShortDesc);

  // show the article/post
  tutorialTitle.innerHTML = title;
  tutorial.innerHTML = `
  <img src="${imgUrl}" alt="${title}" class="tutorial--img"> 
  <div class="tutorial-content">
    <p>${text}</p>
  </div>
  `
  modalWindowImg.setAttribute("src", imgUrl);
  modalWindowImg.setAttribute("alt", title)
  figCaption.innerHTML = title;

  const img = document.querySelector(".tutorial--img");
  img.addEventListener("click", () => {
    modalWindow.classList.add("modal-window-show");
  })
  
  console.log(post);
}
