var cart = {};
function loadCart(){
    //проверяет есть ли в localStorage запись cart 
    if (localStorage.getItem('cart')){
        //если есть - расшифровывает и записывает в переменную cart
        cart = JSON.parse(localStorage.getItem('cart')); //вычитывает, что лежит в localStorage
        //showMiniCart();
        showCart();
    }
    else{
        $('.cart').html('Корзина пуста(');
    }
}
function showCart(){
    //$.getJSON('goods.json', function (data){
        //вывод корзины
    if (!isEmpty(cart)) {
        $('.main-cart').html('Корзина пуста! Ждем ваших новых покупок!');
    }
    else {
        $.getJSON('goods.json', function (data) {
            var goods = data;
            var out = '';
            for (var id in cart) {
                out += ` <button data-id="${id}" class="del-goods">x</button> `; //es-6 запись
                out += `<img src="${goods[id].image}" width="150" height="200">`;
                out += ` ${goods[id].name  }`;
                out += ` <button data-id="${id}" class="minus-goods">-</button> `;
                out += ` ${cart[id]  }`;
                out += ` <button data-id="${id}" class="plus-goods">+</button>`;
                out += cart[id]*goods[id].cost;
                out += '<br>';
            }
            $('.main-cart').html(out);
            $('.del-goods').on('click', delGoods);
            $('.plus-goods').on('click', plusGoods);
            $('.minus-goods').on('click', minusGoods);
        });
    }
}
function delGoods() {
    //удаляет товар из корзины
    var id = $(this).attr('data-id');
    delete cart[id];
    saveCart();
    showCart();
}
function plusGoods() {
    //добавляет товар в корзину
    var id = $(this).attr('data-id');
    cart[id]++;
    saveCart();
    showCart();
}
function minusGoods() {
    //уменьшает товар в корзине
    var id = $(this).attr('data-id');
    if (cart[id]==1){
        delete cart[id];
    }
    else{
        cart[id]--;
    }
    saveCart();
    showCart();
}

function saveCart() {
    //сохраняет корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart)); //корзину в строку
}

function isEmpty(object) {
    //проверка корзины на пустоту
    for (var key in object)
    if (object.hasOwnProperty(key)) return true;
    return false;
}

function sendEmail() {
    var ename = $('#ename').val(); //# элементы, с которых идет считывание
    var email = $('#email').val();
    var ephone = $('#ephone').val();
    if (ename!='' && email!='' && ephone!='') {
        if (isEmpty(cart)) {
            $.post(
                "core/mail.php",
                {
                    "ename" : ename,
                    "email" : email,
                    "ephone" : ephone,
                    "cart" : cart
                },
                function(data){
                    //console.log(data); //обработка ответа сервера
                     if (data == 1) {
                        alert('Заказ был сделан. Когда он будет готов, вам на почту поступит сообщение.')
                    }
                    else {
                       alert('Повторите заказ');
                    } 
                }
            );
        }
        else {
            alert('Корзина пуста');
        }
    }
    else {
        alert('Заполните поля');
    }
}
$(document).ready(function(){
    loadCart();
    $('.send-email').on('click', sendEmail); //отправляет письмо с заказом
});