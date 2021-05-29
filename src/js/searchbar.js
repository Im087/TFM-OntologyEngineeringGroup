/*SEARCH BAR*/
var thisSearchBar;
/*Create the constructor*/
function SearchBar() {
  thisSearchBar = this;
  /* get elements*/
  this.search = $(".search");
  this.searchInput = $(".search input");
  this.navs = $(".navbar-nav");
  this.init();
}

/*Create the prototype*/
SearchBar.prototype = {
  /*assign the constructor*/
  constructor: SearchBar,
  /*initialize by binding events to elements*/
  init: function () {
    this.searchInput.focus(this.focus);
    this.searchInput.blur(this.unfocus);
  },
  /*change the searchform when FOCUSED*/
  focus: function () {
    thisSearchBar.navs.css("display", "none"); //hide navs
    thisSearchBar.search.animate({"width": "75%"}, 500); //amplify the search bar
  },
  /*change the searchform when UNFOCUSED*/
  unfocus: function () {
    setTimeout(function() {
      thisSearchBar.navs.css("display", "flex");
    }, 500); //show navs
    thisSearchBar.search.animate({"width": "130px"}, 500); //shorten the search bar
  }
 };

// /*Create an instance when the page is ready*/
// $(document).ready(function() {
//   new SearchBar();
// });
