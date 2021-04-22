import {searchPostsWithTotal} from './be.js';

const params = new URLSearchParams(window.location.search);
const searchFor = params.get("searchFor");

let page = params.get("page") || 1;
let totalPages = 0;
let pageSize = 10;

fillResults();

async function fillResults(){
  searchPostsWithTotal(searchFor,"desc", page, pageSize)
  .then(res => {
    totalPages = Number(res.headers.get("x-wp-totalPAges"));
    
  })
}