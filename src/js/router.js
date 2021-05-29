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
