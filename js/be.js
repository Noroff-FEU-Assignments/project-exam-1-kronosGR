const BE_URL = "https://jsw.kandz.me/wp-json";
const BE_POSTS = "/wp/v2/posts";
const BE_MEDIA = "/wp/v2/media/";
const BE_SEARCH = "/wp/v2/search?search=";

/**
 * search for a term in the posts
 * @param {string} search the term to search for
 * @param {string} order asc | desc
 * @param {int} page the page to fetch
 * @param {int} amount the amount per page to fetch
 * @returns a promise with the results
 */
export async function searchPostsWithTotal(search, order, page, amount) {
  const url =
    BE_URL +
    BE_SEARCH +
    `?search=${search}&order=${order}&per_page=${amount}&page=${page}`;
  const res = await fetch(url);
  return res;
}

/**
 * get a product with product id
 * @param {int} id Post id
 * @returns a json with the product details
 */
export async function getPostWithId(id) {
  const res = await fetch(BE_URL + BE_POSTS + "/" + id);
  const json = await res.json();
  return json;
}

/**
 *
 * @returns promise with the results
 */
export async function getPostsWithTotal(order, page, amount = 10) {
  const url =
    BE_URL + BE_POSTS + `?order=${order}&per_page=${amount}&page=${page}`;
  const res = await fetch(url);
  return res;
}

/**
 * gets the last 12 posts
 * @param {string} order asc|desc
 * @returns json with the posts
 */
export async function fetchAllPosts(amount, order) {
  const res = await fetch(
    BE_URL + BE_POSTS + "?per_page=" + amount + "&order=" + order
  );
  const json = await res.json();
  return json;
}

/**
 * gets the media for one post
 * @param {int} id post id
 */
export async function fetchMediaForPost(id) {
  const res = await fetch(BE_URL + BE_MEDIA + id);
  const json = await res.json();
  return json();
}

/**
 * get the media with a media url
 * @param {string} url the media url of specific post
 * @returns json with the media
 */
export async function fetchMediaWithUrl(url) {
  const res = await fetch(url);
  const json = await res.json();
  return json;
}
