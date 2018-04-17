var e = window.localStorage;

function update(name, content){
  $(name).append(content);
}

/*function parseItem(p, item){
  return JSON.parse( e.getItem( p ).item );
}
*/

$(document).ready(function(){
  for(var i in e){
    update('.cart','<center><div class="item"><div class="itemName">' + JSON.parse(e.getItem(i)).name + '</div><div class="money">$' + JSON.parse(e.getItem(i)).m + '</div><div class="quantity">' + JSON.parse(e.getItem(i)).c + 'x</div></div></center>');
  }
});




