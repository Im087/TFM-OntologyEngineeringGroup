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
