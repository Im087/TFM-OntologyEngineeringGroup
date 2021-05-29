/*CARD*/
/*Create the constructor*/
function Card() {
  /* get elements*/
  this.cardHead = $('div.card-head');
  this.init();
}

/*Create the prototype*/
Card.prototype = {
  /*assign the constructor*/
  constructor: Card,
  /*initialize by binding events to elements*/
  init: function () {
    this.cardHead.hover(this.mouseIn, this.mouseOut);
  },
  /*mask ON when mouse in*/
  mouseIn: function() {
    $(this).find(".mask").slideDown(200);
  },
  /*mask OFF when mouse out*/
  mouseOut: function() {
    $(this).find(".mask").stop().slideUp(200);
  }

 };

// /*Create an instance when the page is ready*/
// $(document).ready(function() {
//   new Card();
// });

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

/*PAGINATION*/
var thisPagination;
/*Create the constructor*/
function Pagination() {
  thisPagination = this;
  /* get elements*/
  this.list = $('#article-list');
  this.pagination = $("ul.pagination");
  this.pages = this.pagination.find('li.pages');
  this.prev = this.pagination.find('li:first');
  this.next = this.pagination.find('li:last');
  this.init();
}

/*Create the prototype*/
Pagination.prototype = {
  /*assign the constructor*/
  constructor: Pagination,
  /*initialize by binding events to elements*/
  init: function () {
    this.pages.click(this.turnPage);  //turn the page
    this.prev.click(this.prevPage); //turn to the previous page
    this.next.click(this.nextPage); //turn to the next page
  },
  /*turn the page*/
  turnPage: function(e) {
    if (e) {
      e.preventDefault();  //unable the link
    }
    thisPagination.setActivePage($(this).find('a').attr('url'));  //set a new active page
    thisPagination.addList($(this).find('a').attr('url'));  //add the list to the page
  },
  /*turn to the previous page*/
  prevPage: function(e) {
    if (e) {
      e.preventDefault();  //unable the link
    }
    var active = thisPagination.pages.filter('.active');  //get the old active element
    /*check if there are more paginations on the left of this element*/
    if (active.prev().text().includes("Previous")) {
      alert('Ya es la primera página'); //alert if NO
    } else {
    var url = active.prev().find('a').attr('url');  //save the url of the left element
    thisPagination.setActivePage(url);  //set a new active page
    thisPagination.addList(url);  //add the list to the page
    }
  },
  /*turn to the next page*/
  nextPage: function(e) {
    if (e) {
      e.preventDefault();  //unable the link
    }
    var active = thisPagination.pages.filter('.active');  //get the old active element
    /*check if there are more paginations on the right of this element*/
    if (active.next().text().includes("Next")) {
      alert('Ya es la última página');  //alert if NO
    } else {
    var url = active.next().find('a').attr('url');  //save the url of the right element
    thisPagination.setActivePage(url);  //set a new active page
    thisPagination.addList(url);  //add the list to the page
    }
  },
  /*set a new active page*/
  setActivePage: function(url) {
    thisPagination.pages.removeClass('active'); //clear the existing ACTIVE class
    thisPagination.pages.find('a').filter('[url="'+ url +'"]').parent().addClass('active'); //set ACTIVE class
  },
  /*add the new list*/
  addList: function(url) {
    this.list.empty(); //remove the existing list
    /*save the template for an article*/
    var template = '<div class="card mb-4 ml-auto px-0" property="itemListElement" typeof="Article"><div class="card-body"><h2 class="card-title" property="headline"><a href="#" property="url">title</a></h2><div class="row mb-3"><div class="col-lg-4 col-sm-12"><div class="card-head"><a href="#" property="image" resource="#"><img class="card-img-top" src="#" alt="videojuegos"></a><div class="mask"><div class="middle-text h3">Leer</div></div></div></div><div class="col-lg-8 col-sm-12"><p class="card-text">intro</p></div></div><a href="#" class="btn btn-primary" property="mainEntityOfPage">Leer más &rarr;</a></div><div class="card-footer text-muted"><span property="datePublished" content="2019-01-01">date</span><span property="author" resource="#OEG"><a href="../index.html">OEG</a></span><meta property="dateModified" content="2019-01-01"><meta property="publisher" resource="#OEG"></div></div>';
    /*get data from the server*/
    $.ajax(url).done(function(data) {
      var list = JSON.parse(data);  //convert the data into JSON format

      /*add and modify templates*/
      for (var i = 0; i < list.length - 1; i++) {
        thisSidebar.list.append(template);  //append the template to the page
        thisSidebar.articles = thisSidebar.list.find('div.card'); //save the template in an array

        thisSidebar.articles.eq(i).find('h2 a').text(list[i + 1]['title']); //set the title
        thisSidebar.articles.eq(i).find('p.card-text').html(list[i + 1]['intro']);  //set the intro
        thisSidebar.articles.eq(i).find('a[property=image]').attr('resource', list[i + 1]['img']);  //set the image
        thisSidebar.articles.eq(i).find('img').attr('src', list[i + 1]['img']); //set the image
        thisSidebar.articles.eq(i).find('img').attr('alt', list[i + 1]['alternate']); //set the alternate name
        thisSidebar.articles.eq(i).find('span[property="datePublished"]').text(list[i + 1]['date']);  //set the publish date
        thisSidebar.articles.eq(i).find('a[href]').attr('href', list[i + 1]['href']); //set the href
      }

      new Card; //initialize the Card object again to affect the newly loaded images in the list

    }).fail(function() {
      alert("ERROR"); //alert if failed
    });

  }

 };

/*ROUTER*/
var thisRouter;
/*Create the constructor*/
function Router() {
  thisRouter = this;
  /* get elements*/
  this.sidebar = $('div.sidebar');
  this.items = this.sidebar.find('a.list-group-item[url]');
  this.pagination = $("ul.pagination");
  this.pages = this.pagination.find('li.pages');
  this.pagesLink = this.pages.find('a');
  this.prev = this.pagination.find('li:first');
  this.prevLink = this.prev.find('a');
  this.next = this.pagination.find('li:last');
  this.nextLink = this.next.find('a');
  this.init();
}

/*Create the prototype*/
Router.prototype = {
  /*assign the constructor*/
  constructor: Router,
  /*initialize by binding events to elements*/
  init: function () {
    window.addEventListener('popstate', this.listenPopstate);
    this.items.off('click', this.pushState);
    this.items.click(this.pushState);
    this.pagesLink.click(this.pushState);
    this.prevLink.click(this.pushState);
    this.nextLink.click(this.pushState);
  },
  /*listen the popstate*/
  listenPopstate: function (e) {
    var state = e.state || {};
    var path = state['path'] || '';

    if(path == '') {
      window.location.reload(); //reload the page
    } else if (path.slice(-1) == 1) {
      var last = thisRouter.items.filter('a[href="'+ path +'"]');
      Sidebar.prototype.changePage.call(last);  //change the page as if the sidebar is clicked
    } else {
      var last = thisRouter.pagesLink.filter('a[href="'+ path +'"]').parent();
      Pagination.prototype.turnPage.call(last); //change the oage as if the pagination is clicked
    }

  },
  /*update HISTORY object*/
  pushState: function (e) {
    var active = thisRouter.pages.filter('.active');
    var path;
    if ($(this).text().includes('Previous') && active.prev() != $(this)) {
      path = active.prev().find('a').attr('href');  //save the href of the previous pagination
    } else if ($(this).text().includes('Next') && active.next() != $(this)) {
      path = active.next().find('a').attr('href');  //save the href of the next pagination
    } else {
      path = $(this).attr('href');  //save the href of the clicked sidebar/pagination
    }

    history.pushState({'path': path}, null, path);  //update HISTORY
  }
 };

// /*Create an instance when the page is ready*/
// $(document).ready(function() {
//   new Router();
// });

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

/*SIDEBAR*/
var thisSidebar;
/*Create the constructor*/
function Sidebar() {
  thisSidebar = this;
  /* get elements*/
  this.sidebar = $('div.sidebar');
  this.items = this.sidebar.find('a.list-group-item[url]');
  this.title = $('h1');
  this.breadcrumbs = $('#breadcrumb li.breadcrumb-item');
  this.list = $('#article-list');
  this.init();
}

/*Create the prototype*/
Sidebar.prototype = {
  /*assign the constructor*/
  constructor: Sidebar,
  /*initialize by binding events to elements*/
  init: function () {
    this.items.click(this.changePage);
  },
  /*change the page when the sidebar clicked*/
  changePage: function(e) {
    if (e) {
      e.preventDefault();  //unable the link
    }
    thisSidebar.title.text($(this).text());  //change the title
    thisSidebar.changeBreadcrumbs($(this).text());  //change the breadcrumbs
    thisSidebar.items.removeClass('active'); //clear the ACTIVE class
    $(this).addClass('active'); //add the ACTIVE class
    thisSidebar.addList($(this).attr('url')); //add the new list
    thisSidebar.addPagination($(this).attr('href'), $(this).attr('url')); //add the pagination
  },
  /*change the breadcrumbs*/
  changeBreadcrumbs: function(text) {
    var oldActive = this.breadcrumbs.filter('.active'); //save the old active breadcrumb
    var template = oldActive.clone(); //copy the old active breadcrumb
    var href = "/" + letterFormat(template.text()) + ".html"  //get the href for the breadcrumb when inactive
    var position; //declare the position for the new active breadcrumb
    var newActive;  //declare the new active breadcrumb

    /*compare the template's text with the active sidebar's text
    add the template to the breadcrumb list in two ways*/
    if(template.text() === this.items.filter('.active').text()) {
      oldActive.removeClass("active").after(template).remove();
    } else {
      oldActive.removeClass("active").after(template).find("a").attr("href", href);
    }

    this.breadcrumbs = $('#breadcrumb li.breadcrumb-item'); //update the value
    position = this.breadcrumbs.length;
    newActive = this.breadcrumbs.filter('.active');
    newActive.find("meta").attr("content", position); //update the position for the new active breadcrumb
    newActive.find("span").text(text);  //update the text for the new active breadcrumb
  },
  /*add the new list*/
  addList: function(url) {
    this.list.empty(); //remove the existing list
    /*save the template for an article*/
    var template = '<div class="card mb-4 ml-auto px-0" property="itemListElement" typeof="Article"><div class="card-body"><h2 class="card-title" property="headline"><a href="#" property="url">title</a></h2><div class="row mb-3"><div class="col-lg-4 col-sm-12"><div class="card-head"><a href="#" property="image" resource="#"><img class="card-img-top" src="#" alt="videojuegos"></a><div class="mask"><div class="middle-text h3">Leer</div></div></div></div><div class="col-lg-8 col-sm-12"><p class="card-text">intro</p></div></div><a href="#" class="btn btn-primary" property="mainEntityOfPage">Leer más &rarr;</a></div><div class="card-footer text-muted"><span property="datePublished" content="2019-01-01">date</span><span property="author" resource="#OEG"><a href="../index.html">OEG</a></span><meta property="dateModified" content="2019-01-01"><meta property="publisher" resource="#OEG"></div></div>';
    /*get data from the server*/
    $.ajax(url).done(function(data) {
      var list = JSON.parse(data);  //convert the data into JSON format

      /*add and modify templates*/
      for (var i = 0; i < list.length - 1; i++) {
        thisSidebar.list.append(template);  //append the template to the page
        thisSidebar.articles = thisSidebar.list.find('div.card'); //save the template in an array

        thisSidebar.articles.eq(i).find('h2 a').text(list[i + 1]['title']); //set the title
        thisSidebar.articles.eq(i).find('p.card-text').html(list[i + 1]['intro']);  //set the intro
        thisSidebar.articles.eq(i).find('a[property=image]').attr('resource', list[i + 1]['img']);  //set the image
        thisSidebar.articles.eq(i).find('img').attr('src', list[i + 1]['img']); //set the image
        thisSidebar.articles.eq(i).find('img').attr('alt', list[i + 1]['alternate']); //set the alternate name
        thisSidebar.articles.eq(i).find('span[property="datePublished"]').text(list[i + 1]['date']);  //set the publish date
        thisSidebar.articles.eq(i).find('a[href]').attr('href', list[i + 1]['href']); //set the href
      }

      new Card; //initialize the Card object again to affect the newly loaded images in the list

    }).fail(function() {
      alert("ERROR"); //alert if failed
    });

  },
  /*add the pagination*/
  addPagination: function(href, url) {
    /*save the pagination ul*/
    var pagination = '<ul class="pagination justify-content-center"> <li class="page-item"> <a class="page-link" href="" aria-label="Previous"> <span aria-hidden="true">&laquo;</span> <span class="sr-only">Previous</span> </a> </li> <li class="page-item"> <a class="page-link" href="" aria-label="Next"> <span aria-hidden="true">&raquo;</span> <span class="sr-only">Next</span> </a> </li> </ul>';
    /*save the template li*/
    var template = '<li class="page-item pages"> <a class="page-link">1</a> </li>';
    var href = href.slice(0, -1);

    $("ul.pagination").remove();  //remove the existing pagination
    this.list.after(pagination);  //append the pagination ul to the page
    /*get the total page number*/
    $.ajax(url).done(function (data) {
      var pageNumber = JSON.parse(data)[0]; //save the total page number
      for (var i = pageNumber; i > 0; i--) {
        url = url.split("=")[0] + "=" + i;  //save the new url
        $('ul.pagination li:nth-child(1)').after(template); //add the template li to the pagination
        $('ul.pagination li:nth-child(2) a').attr('url', url).text(i);  //set the url and text
        $('ul.pagination li:nth-child(2) a').attr('href', href + i);  //set the href
      }

      $('ul.pagination li:nth-child(2)').addClass('active');  //set the first page as active page

      new Pagination; //initialize the Pagination object to affect the newly loaded pagination
      new Router; //initialize the Router object to affect the newly loaded pagination

    }).fail(function () {
      alert('ERROR'); //alert if failed
    });

  }

 };

 // /*Create an instance when the page is ready*/
 // $(document).ready(function() {
 //   new Sidebar();
 // });

/*TOTOP*/
var thisToTop;
/*Create the constructor*/
function ToTop() {
  thisToTop = this;
  /* get elements*/
  this.toTop = $('#totop');
  this.init();
}

/*Create the prototype*/
ToTop.prototype = {
  /*assign the constructor*/
  constructor: ToTop,
  /*initialize by binding events to elements*/
  init: function () {
    $(window).scroll(this.trigger);
    this.toTop.click(this.backToTop);
  },
  /*show or hide the button depending on the scroll position*/
  trigger: function() {
    if($(window).scrollTop() > 100) {
      thisToTop.toTop.fadeIn();
    } else {
      thisToTop.toTop.fadeOut();
    }
  },
  /*scroll back to top when clicked*/
  backToTop: function() {
    $("html, body").animate({scrollTop: 0});
  }

 };

// /*Create an instance when the page is ready*/
// $(document).ready(function() {
//   new ToTop();
// });
