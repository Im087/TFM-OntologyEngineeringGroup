/*eliminate all spaces, accent symbol and pass to lower case*/
function letterFormat(before) {
  var after = before.replace(/\s*/g,"").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  return after;
}

/*run when the page is ready*/
$(document).ready(function(){
  new Navbar();
  new Card();
  new SearchBar();
  new Sidebar();
  new ToTop();
  new Router();
});
