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
