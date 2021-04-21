const BE_URL = "https://jsw.kandz.me/wp-json";
const BE_POSTS = "/wp/v2/posts";
const BE_MEDIA = "/wp/v2/media/";

/**
 * gets the last 12 posts
 * @param {string} order asc|desc
 * @returns json with the posts
 */
export async function fetchAllProduct(amount, order) {
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
