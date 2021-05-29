/*NAVBAR*/
/*Create the constructor*/
function Navbar() {
  /* get elements*/
  this.navbar = $('#navbar');
  this.navs = this.navbar.find('a.nav-link');
  this.init();
}

/*Create the prototype*/
Navbar.prototype = {
  /*assign the constructor*/
  constructor: Navbar,
  /*initialize by binding events to elements*/
  init: function () {
    this.addActive();
  },
  /*set ACTIVE class*/
  addActive: function () {
    var url = window.location.href;
    var navName = [];

    for (var i = 0; i < this.navs.length; i++) {
      navName[i] = letterFormat(this.navs.eq(i).text());
      if(url.replace(/-/g,"").includes(navName[i])) {  //compare the current URL eliminating all hyphens with the nav text
        this.navbar.find('.nav-item').eq(i).addClass("active");  //add ACTIVE class to the corresponding element
        break;
      }
    }
  }

 };

// /*Create an instance when the page is ready*/
// $(document).ready(function() {
//   new Navbar();
// });
