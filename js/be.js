const BE_URL = "https://jsw.kandz.me/wp-json";
const BE_POSTS = "/wp/v2/posts";
const BE_MEDIA = "/wp/v2/media/";
const BE_SEARCH = "/wp/v2/search?search=";
const BE_TOKEN = "/jwt-auth/v1/token";
const BE_USERS = "/wp/v2/users";

export const USER_TOKEN = "user-token";
export const USER_EMAIL = "user-email";
export const USER_ID = "user-id";
export const USER_AVATAR = "user-avatar";
export const USER_FIRST_NAME = "user-first-name";
export const USER_LAST_NAME = "user-last-name";
export const USER_DISPLAY_NAME = "user-display-name";
export const USER_LOGIN = "user-login";

// This is user can only create users. Nothing else!!!
export const RE_USERNAME = "registration";
export const RE_PASSWORD = "123456";

/**
 * register a new use
 * @param {string} token important, without it no transactoin
 * @param {string} username
 * @param {string} email
 * @param {string} password
 */
export function register(token, username, email, password) {
  const headers = new Headers();

  fetch(BE_URL + BE_USERS, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      username: username,
      email: email,
      password: password,
    }),
    redirect: "follow",
  })
    .then((res) => {
      console.log("----", res);
      // 201 created!
      if (res.status == 201) return res.json();
      throw new Error(res.status);
    })
    .catch((err) => {
      return err;
    });
}

/**
 * login to wp and set to session storage all the user info
 * @param {string} username
 * @param {string} password
 * @returns 200 or other
 */
export function login(username, password) {
  sessionStorage.removeItem(USER_TOKEN);
  sessionStorage.removeItem(USER_EMAIL);
  sessionStorage.removeItem(USER_ID);
  sessionStorage.removeItem(USER_AVATAR);
  sessionStorage.removeItem(USER_FIRST_NAME);
  sessionStorage.removeItem(USER_LAST_NAME);
  sessionStorage.removeItem(USER_DISPLAY_NAME);
  sessionStorage.removeItem(USER_LOGIN);

  return fetch(BE_URL + BE_TOKEN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
    redirect: "follow",
  })
    .then((res) => {
      if (res.status == "200") return res.json();
      throw new Error(res.status);
    })
    .then((json) => {
      sessionStorage.setItem(USER_TOKEN, json.token);
      sessionStorage.setItem(USER_EMAIL, json.user_email);
      sessionStorage.setItem(USER_ID, json.user_id);
      sessionStorage.setItem(USER_AVATAR, json.user_avatar_url);
      sessionStorage.setItem(USER_FIRST_NAME, json.user_first_name);
      sessionStorage.setItem(USER_LAST_NAME, json.user_last_name);
      sessionStorage.setItem(USER_DISPLAY_NAME, json.user_display_name);
      sessionStorage.setItem(USER_LOGIN, json.user_login);
      return { message: 200 };
    })
    .catch((err) => {
      return err;
    });
}

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
    `${search}&order=${order}&per_page=${amount}&page=${page}&context=view`;
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
