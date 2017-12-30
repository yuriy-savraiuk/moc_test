var jsonUrl = 'https://shop.bremont.com/products.json';

var cart = [];

$(document).ready(function () {
  loadProducts();
  checkCart();
  showCart();
});

function loadProducts() {
  $.getJSON(jsonUrl, function(data) {
    var output = '';

    for(var i = 0; i < data.products.length; i++) {
      output += '<li class="single-product">';
      output +='<div class="title-block">';
      output +='<h2 class="product-name">' + data.products[i].title + '</h2>';
      output +='</div>'; //title wrapper

      output +='<ul class="image-slider owl-carousel owl-theme">';
        for(k in data.products[i].images) {
          output += '<li class="image-wrapper">';
          output +='<img src="' + data.products[i].images[k].src +'" class="product-img" />';
          output +='</li>';
        }
      output +='</ul>'; //Image slider wrapper

      output += '<div class="single-product-footer">';
      for (j in data.products[i].variants) {
        if (j == 0) {
          output += '<span class="price">' + '$' + data.products[i].variants[j].price + '</span>';
        }
      }

      var prodObj = {
        title: data.products[i].title,
        price: data.products[i].variants[j].price
      };

      output += '<button id="addProduct" data-prod="'+ prodObj.title +'" data-price="'+ prodObj.price +'" class="add-product">Add to Cart</button>';
      output += '</div>'; //Footer wrapper

      output += '<button class="description-btn">';
      output += 'Product Description';
      output += '</button>'; //Show product description button

      output += '<div class="product-description">';
      output += data.products[i].body_html;
      output += '</div>'; //Product description
      output +='</li>'; //Single product wrapper
    }

    $('#products').html(output); //Update HTML
    $('button.add-product').click(addToCart);

    $('.description-btn').click(function () {
      $('.product-description').addClass('product-description-expanded');
      $(this).next('.product-description').slideToggle('slow');
    }) //Toggle description visibility

    var owl = $(".image-slider");
    owl.owlCarousel({
        items: 1,
        nav: true,
        dots: false,
        navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
        loop: true
    }) //Owl carousel
  }); //get JSON
}; //loadProducts

function addToCart() {
  var product = {
    title : $(this).attr('data-prod'),
    price : $(this).attr('data-price'),
  }
  cart.push(product);

  localStorage.setItem('cart', JSON.stringify(cart));
  showCart();
}; //addToCart

function checkCart() {
  if(localStorage.getItem('cart') != null) {
    cart = JSON.parse(localStorage.getItem('cart'));
  }
}; //checkCart

function showCart() {
  var output = '';

  output += '<button class="close-cart" id="closeCart">Close Cart</button>';
  for(item in cart) {
    output += '<li class="cart-product">';
    output += '<button class="delete-product"><i class="fa fa-times" aria-hidden="true"></i></button>';
    output += '<span class="cart-product-title">' + cart[item].title + '</span>';
    output += '<span class="cart-product-price">' + '$' + cart[item].price + '</span>';
    output += '<span class="total-price">' + '' + '</span>';
    output += '<li>';
  }

  $('#currentProdList').html(output);
}

$('#shoppingCart, #closeCart').click(function() {
$("#currentProdList").toggleClass('cart-list-expanded');
});// Toggle cart visibility
