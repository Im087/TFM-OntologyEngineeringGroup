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
