var cart = {}; //корзина

function init (){
    //читаем файл good.json
    $.getJSON("goods.json", goodsOut);

    /* $.post(
        "core/admin.php",
        {
            "action" : "loadGoods"
        },
        goodsOut //обрабатывает ответ
    ); */
}

function goodsOut (data){
    //вывод товара на главную страницу
    //var goods = JSON.parse(data); не надо конвертировать json
    console.log(data);    
    var out="";
    for (var key in data) {
        /* out +='<div class="cart">';
        out +='<p class="name">'+data[key].name+'</p>';
        out += '<img src="images/'+data[key].image+'" width="200" height="211" alt="">';
        out +='<div class="cost">'+data[key].cost+'</div>'; */
        out +='<div class="cart">';
        out +=`<div class="scale"><img src="${data[key].image}" class="scale" width="250" height="300" alt=""></div>`;
        out +=`<p class="name">${data[key].name}</p>`;
        out +=`<div class="cost">${data[key].cost}</div>`;
        out +=`<button class="add-to-cart" data-id="${key}">Купить</button>`;
        out +=`<button class="add-to-later" data-id="${key}">&hearts;</button>`;
        out +='</div>';
    }
    $('.goods-out').html(out);
    $('.add-to-cart').on('click', addToCart);
    $('.add-to-later').on('click', addToLater);
}

function addToCart() {
    //добавляем товар в корзину
    var id = $(this).attr('data-id');
    //console.log(id);
    if (cart[id]==undefined) {
        cart[id] = 1; //если в корзине нет товара - делаем равным 1
    }
    else {
        cart[id]++; //если такой товар есть - увеличиваю на единицу
    }
    //console.log(cart);
    showMiniCart();
    saveCart();
}
function saveCart(){
    //сохраняет корзину в localStorage (после перезагрузки страницы сохраняется)
    localStorage.setItem('cart', JSON.stringify(cart)); //сохраняет толькро строку
}

function showMiniCart() {
    //показывает мини-корзину (однако обнуляется при обновлении страницы)
    var out="";
    for (var key in cart) {
        out += key +' --- '+ cart[key]+'<br>';
    }
    //$('.mini-cart').html(out);
}  
function loadCart(){
    //проверяет есть ли в localStorage запись cart 
    if (localStorage.getItem('cart')){
        //если есть - расшифровывает и записывает в переменную cart
        cart = JSON.parse(localStorage.getItem('cart')); //вычитывает, что лежит в localStorage
        showMiniCart();
    }
}
function addToLater(){
    //добавляем товар в wishlist
    var later = {}; //массив
    if (localStorage.getItem('later')){
        //если есть - расшифровывает и записывает в переменную cart
        later = JSON.parse(localStorage.getItem('later')); //вычитывает, что лежит в localStorage
    }
    alert('Добавлено в Отложенные');
    var id = $(this).attr('data-id');
    later[id] = 1;
    localStorage.setItem('later', JSON.stringify(later)); //зашифровываем и записываем
}

$(document).ready(function () {
    init();
    loadCart();
});
