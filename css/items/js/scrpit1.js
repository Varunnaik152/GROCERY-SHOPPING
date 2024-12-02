let searchform = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () => {
    searchform.classList.toggle('active');
    shoppingcart.classList.remove('active');
    loginform.classList.remove('active');
    navbar.classList.remove('active');
}

let aboutus = document.querySelector('.about-us');

document.querySelector('#cart-btn').onclick = () => {
    aboutus.classList.toggle('active');
    searchform.classList.remove('active');
    loginform.classList.remove('active');
    navbar.classList.remove('active');
}

let loginform = document.querySelector('.login-form');

document.querySelector('#login-btn').onclick = () => {
    loginform.classList.toggle('active');
    searchform.classList.remove('active');
    aboutus.classList.remove('active');
    navbar.classList.remove('active');
}

let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
    searchform.classList.remove('active');
    aboutus.classList.remove('active');
    loginform.classList.remove('active');
}

window.onscroll = () => {
    searchform.classList.remove('active');
    aboutus.classList.remove('active');
    loginform.classList.remove('active');
    navbar.classList.remove('active');
}

var swiper = new Swiper(".product-slider", {
    loop:true,
    spaceBetween: 10,
    autoplay:{
        delay: 7500,
        disableoninteraction: false,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 3,
      },
      1020: {
        slidesPerView: 4,
      },
    },
  });

  var swiper = new Swiper(".review-slider", {
    loop:true,
    spaceBetween: 10,
    autoplay:{
        delay: 7500,
        disableoninteraction: false,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 3,
      },
      1020: {
        slidesPerView: 4,
      },
    },
  });
  let openShopping = document.querySelector('.shopping');
  let closeShopping = document.querySelector('.closeShopping');
  let list = document.querySelector('.list');
  let listCard = document.querySelector('.listCard');
  let body = document.querySelector('body');
  let total = document.querySelector('.total');
  let quantity = document.querySelector('.quantity');
  
  openShopping.addEventListener('click', ()=>{
      body.classList.add('active');
  })
  closeShopping.addEventListener('click', ()=>{
      body.classList.remove('active');
  })
  
  let listCards  = [];
  function initApp(){
      products.forEach((value, key) =>{
          let newDiv = document.createElement('div');
          newDiv.classList.add('item');
          newDiv.innerHTML = `
              <img src="image/${value.image}">
              <div class="title">${value.name}</div>
              <div class="price">${value.price.toLocaleString()}</div>
              <button onclick="addToCard(${key})">Add To Card</button>`;
          list.appendChild(newDiv);
      })
  }
  initApp();
  function addToCard(key){
      if(listCards[key] == null){
          // copy product form list to list card
          listCards[key] = JSON.parse(JSON.stringify(products[key]));
          listCards[key].quantity = 1;
      }
      reloadCard();
  }
  function reloadCard(){
      listCard.innerHTML = '';
      let count = 0;
      let totalPrice = 0;
      listCards.forEach((value, key)=>{
          totalPrice = totalPrice + value.price;
          count = count + value.quantity;
          if(value != null){
              let newDiv = document.createElement('li');
              newDiv.innerHTML = `
                  <div><img src="image/${value.image}"/></div>
                  <div>${value.name}</div>
                  <div>${value.price.toLocaleString()}</div>
                  <div>
                      <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                      <div class="count">${value.quantity}</div>
                      <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                  </div>`;
                  listCard.appendChild(newDiv);
          }
      })
      total.innerText = totalPrice.toLocaleString();
      quantity.innerText = count;
  }
  function changeQuantity(key, quantity){
      if(quantity == 0){
          delete listCards[key];
      }else{
          listCards[key].quantity = quantity;
          listCards[key].price = quantity * products[key].price;
      }
      reloadCard();
  }