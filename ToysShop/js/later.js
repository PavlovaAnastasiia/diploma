function init (){
    //читаем файл good.json
    $.getJSON("goods.json", goodsOut);
}

function goodsOut (data){
    //вывод товара на главную страницу
    //var goods = JSON.parse(data); не надо конвертировать json
    console.log(data);    
    var out="";
    var later = {};
    if (localStorage.getItem('later')){
        //если есть - расшифровывает и записывает в переменную cart
        later = JSON.parse(localStorage.getItem('later')); //вычитывает, что лежит в localStorage
        for (var key in later) {
            out +='<div class="cart">';
            out +=`<img src="${data[key].image}" width="250" height="300" alt="">`;
            out +=`<p class="name">${data[key].name}</p>`;
            out +=`<div class="cost">${data[key].cost}</div>`;
            out +=`<a href="goods.html#${key}">Просмотреть</a>`;
            //out += `<button data-id="${id}" class="del-goods">x</button> `;
            out +='</div>';
        }
    }
    else{
        $('.goods-out').html('Добавьте товар!');
    }
    
    $('.goods-out').html(out);
    //$('.del-goods').on('click', delGoods);
}
/* function delGoods() {
    var id = $(this).attr('data-id');
    delete cart[id];
    goodsOut();
} */

$(document).ready(function () {
    init();
});
