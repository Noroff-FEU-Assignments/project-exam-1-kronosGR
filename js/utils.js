
// html regex
export const regexHTML = /(<([^>]+)>)/gi;

// email regex
export const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// anchor regex
export const regexAnchor = /<a[^>]*>(.*?)<\/a>/g;

/**
 * hide the error message
 * @param {object} el the element to be changed
 */
export function hideError(el){
  if (el.parentNode.contains(el.parentNode.querySelector("span")))
    el.parentNode.removeChild(el.previousSibling);
}

/**
 * Show an error message
 * @param {object} el the element to be changed
 */
export function showError(el, msg){
  if (!el.parentNode.contains(el.parentNode.querySelector("span"))){
    const error = document.createElement("span");
    error.innerHTML = msg;
    error.classList.add("error");
    el.parentNode.insertBefore(error, el);

  }
}

/**
 * Show the paging
 * @param {DOM element} element that will be changed
 * @param {int} page current page
 * @param {int} totalPages total pages
 */
export function showPaging(element, page, totalPages, url) {
  if (page > 1) {
    element.innerHTML = `
    <a href="${url}?page=${
      page - 1
    }" ><img src="/images/arrow-left.png" class="arrow-left"></a>
    `;
  } else {
    element.innerHTML = `
    <a href="javascript: void(0)" class="disabled"><img src="/images/arrow-left.png" class="arrow-left"></a>
    `;
  }
  element.innerHTML += `
  <span class="page-number">Page ${page} / ${totalPages}</span>
  `;

  if (page < totalPages) {
    element.innerHTML += `
    <a href="${url}?page=${
      page + 1
    }" ><img src="/images/arrow-right.png" class="arrow-right"></a>
    `;
  } else {
    element.innerHTML += `
    <a href="javascript: void(0)" class="disabled"><img src="/images/arrow-right.png" class="arrow-right"></a>
    `;
  }
}
