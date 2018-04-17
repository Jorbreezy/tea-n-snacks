$('.modal').modal('hide');
var w = window.localStorage;

var collections = [];
var d;

function makeRequest(callback){
  $.getJSON('https://snacks-n-tea-jorbreezy.c9users.io/data',function(data){
    setData(data);
  });
}

function setData(payload){
  d = payload;

  collections[1] = processCategories(d, 1);
  collections[2] = processCategories(d, 2);
  collections[3] = processCategories(d, 3);
  collections[4] = processCategories(d, 4);
  collections[5] = processCategories(d, 5);
  collections[6] = processCategories(d, 6);


  process(collections[1], '#Combos');
  process(collections[2], '#Snacks');
  process(collections[3], '#BubbleTea');
  process(collections[4], '#IceTea');
  process(collections[5], '#GreenTea');
  process(collections[6], '#Specialty');
}

function processCategories(arr, c){
  var categoryCollection = [];

  //console.log(arr.length);

  for(var i = 0; i < arr.length; i++){

    if ( parseInt(arr[i].category) === c ){
      categoryCollection.push(arr[i]);
    } else {
      continue;
    }

  }
  return categoryCollection;
}

var aa;
var e;
var price;
var id;
function getItem(context, img){
  e = $(context)
  id = e.attr("data-id");
  var image = e.find('img').attr('src');
  var name = e.find('.name').text();
  price = parseFloat(e.find('.price').text()).toFixed(2);
  console.log(id);

  $('#name').html('<h3>' + name + '</h3>');
  $('#price').html('<h4>' + price + '</h4>');
  $('.modal-image').html('<img class="image" src=' + image + ' />');
  $('.money').val(price);
  $(".dataId").val(id);
  $('.modal').modal('show');
}

function cols(id, content){
  return "<div data-id='" + id + "' class='col-sm-6 col-md-4 col-lg-3' onclick='getItem(this, this.img)'>" + content + "</div>";
}


function process(v, id){

  var htmlString = '';
  // var img = '';

  v.forEach(function(ctxt){
    htmlString += cols(ctxt._id,'<center><span><img class="img" src="https://snacks-n-tea-jorbreezy.c9users.io/img/items/' + ctxt.img + '"/></span><h4 class="name">' + ctxt.name + '</h4><br /><span class="price">' + ctxt.price + '</center></span>');
  });

  $(id).html(htmlString);
}

function init(){
  makeRequest();
}
var cart = {};
$('.btn1').click(function(){
 
 
  
  var money = $(".money").val();
  var quantity = $('.quantity').val();
  var id = $(".dataId").val();
  
   cart = {
    m: money,
    c: quantity,
    itemId: id,
    name: $('#name').text()
  };
  
  w.setItem(cart.itemId, JSON.stringify( cart ));
  $('.modal').modal('hide');
});

$('.btn2').click(function(){
  w.removeItem(cart.itemId);
  
  $('.modal').modal('hide');
});

$('.modal').on('hide.bs.modal', function(){
  $('#price').text('');
  $('.quantity').val(1);
});

$('.plus').on('click', function(){
  var price = $('#price').text();
  var quantity = $('.quantity').val();
  
  ++quantity;
  
  $('.quantity').val(quantity);
  $('.money').val(updateCost(price, quantity));
  
  console.log(quantity);
  
});

$('.minus').on('click',function(){
  var price = $('#price').text();
  var quantity = $('.quantity').val();
  
  --quantity;
  
  if(quantity == 0){
    console.log('Thats the lowest one!!');
  } else{
    $('.quantity').val(quantity);
    $('.money').val(updateCost(price, quantity));
  }
  
  console.log(quantity);
});

function updateCost(c, q){
  return (c * q).toFixed(2);
}

