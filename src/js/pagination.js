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
