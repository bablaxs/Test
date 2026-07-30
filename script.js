/* ===========================================================
   AROMEO
   script.js
=========================================================== */
const fragrances={

"Ebony Agarwood":{

category:"Drzewny",

description:"Elegancki zapach inspirowany luksusowymi hotelami. Głęboki, ciepły i niezwykle trwały.",

notes:[
"Agarwood (Oud)",
"Ambra",
"Piżmo",
"Cedr"
]

},

"Zen Tea":{

category:"Herbaciany",

description:"Świeża kompozycja zielonej herbaty z delikatnymi nutami cytrusów.",

notes:[
"Zielona herbata",
"Jaśmin",
"Cytryna"
]

},

"Shangri-La":{

category:"Drzewny",

description:"Luksusowa mieszanka drewna i przypraw.",

notes:[
"Drzewo sandałowe",
"Wanilia",
"Cedr"
]

},

"Gardenia":{

category:"Kwiatowy",

description:"Lekki kwiatowy aromat pełen elegancji.",

notes:[
"Gardenia",
"Jaśmin",
"Białe piżmo"
]

},

"Blue Wind":{

category:"Świeży",

description:"Rześki zapach inspirowany morską bryzą.",

notes:[
"Bergamotka",
"Mięta",
"Piżmo"
]

},

"Ebony Rose":{

category:"Elegancki",

description:"Połączenie róży z głębokimi nutami drzewnymi.",

notes:[
"Róża",
"Oud",
"Ambra"
]

}

};
const cartButton = document.getElementById("cartButton");
const cart = document.querySelector(".cart");
const overlay = document.querySelector(".cart-overlay");
const closeCart = document.getElementById("closeCart");

const checkoutButton = document.getElementById("checkoutButton");
const checkoutModal = document.querySelector(".checkout-modal");
const closeCheckout = document.querySelector(".closeCheckout");

const cartItemsContainer = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

let cartItems = [];
/* ===========================================================
PRODUCT MODAL
=========================================================== */

const modal = document.querySelector(".product-modal");

const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalDescription = document.getElementById("modalDescription");
const modalNotes = document.getElementById("modalNotes");

const closeProduct = document.querySelector(".close-product");
document.querySelectorAll(".show-product").forEach(button=>{

    button.addEventListener("click",()=>{

        const card=button.closest(".product-card");

        const name=card.querySelector("h3").innerText;

        const img=card.querySelector("img").src;

        const data=fragrances[name];

        modal.classList.add("active");

        modalImage.src=img;
        modalTitle.innerText=name;
        modalCategory.innerText=data.category;
        modalDescription.innerText=data.description;

        modalNotes.innerHTML="";

        data.notes.forEach(note=>{

            modalNotes.innerHTML+=`<li>${note}</li>`;

        });

    });

});


/* ===========================================================
OPEN CART
=========================================================== */

cartButton.addEventListener("click",()=>{

cart.classList.add("active");
overlay.classList.add("active");

});



/* ===========================================================
CLOSE CART
=========================================================== */

closeCart.addEventListener("click",()=>{

cart.classList.remove("active");
overlay.classList.remove("active");

});

overlay.addEventListener("click",()=>{

cart.classList.remove("active");
overlay.classList.remove("active");

});



/* ===========================================================
CHECKOUT
=========================================================== */

checkoutButton.addEventListener("click",()=>{

checkoutModal.classList.add("active");

});

closeCheckout.addEventListener("click",()=>{

checkoutModal.classList.remove("active");

});

checkoutModal.addEventListener("click",(e)=>{

if(e.target===checkoutModal){

checkoutModal.classList.remove("active");

}

});



/* ===========================================================
PRODUCTS
=========================================================== */

const buttons = document.querySelectorAll(".add-cart");
buttons.forEach((button,index)=>{

button.addEventListener("click",()=>{

const card=button.closest(".product-card");

const name=card.querySelector("h3").innerText;

const price=parseFloat(

card.querySelector("strong")
.innerText
.replace("zł","")
.replace(",",".")
.trim()

);

const image=card.querySelector("img").src;

addProduct({

name,
price,
image,
quantity:1

});

});

});



/* ===========================================================
ADD PRODUCT
=========================================================== */

function addProduct(product){

const existing=cartItems.find(

item=>item.name===product.name

);

if(existing){

existing.quantity++;

}else{

cartItems.push(product);

}

renderCart();

animateCart();

}



/* ===========================================================
REMOVE PRODUCT
=========================================================== */

function removeProduct(index){

cartItems.splice(index,1);

renderCart();

}



/* ===========================================================
CHANGE QUANTITY
=========================================================== */

function increase(index){

cartItems[index].quantity++;

renderCart();

}

function decrease(index){

cartItems[index].quantity--;

if(cartItems[index].quantity<=0){

removeProduct(index);

}else{

renderCart();

}

}



/* ===========================================================
RENDER CART
=========================================================== */

function renderCart(){

if(cartItems.length===0){

cartItemsContainer.innerHTML=`

<div class="empty-cart">

Koszyk jest pusty.

</div>

`;

cartTotal.innerText="0,00 zł";

document.querySelector("#cartButton span").innerText="0";

return;

}

let html="";

let total=0;

let amount=0;

cartItems.forEach((item,index)=>{

total+=item.price*item.quantity;

amount+=item.quantity;

html+=`

<div class="cart-item">

<img src="${item.image}">

<div class="cart-info">

<h3>${item.name}</h3>

<p>${item.price.toFixed(2)} zł</p>

<div class="quantity">

<button onclick="decrease(${index})">

−

</button>

<span>

${item.quantity}

</span>

<button onclick="increase(${index})">

+

</button>

</div>

</div>

<button
class="remove"

onclick="removeProduct(${index})">

✕

</button>

</div>

`;

});

cartItemsContainer.innerHTML=html;

cartTotal.innerText=

total.toFixed(2).replace(".",",")+" zł";

document.querySelector("#cartButton span").innerText=

amount;

}



/* ===========================================================
ANIMATE CART
=========================================================== */

function animateCart(){

cartButton.animate([

{

transform:"scale(1)"

},

{

transform:"scale(1.25)"

},

{

transform:"scale(1)"

}

],{

duration:350

});

}



/* ===========================================================
FAQ
=========================================================== */

const faqItems=document.querySelectorAll(".faq-item");

faqItems.forEach(item=>{

item.addEventListener("click",()=>{

item.classList.toggle("active");

});

});



/* ===========================================================
HEADER
=========================================================== */

window.addEventListener("scroll",()=>{

const header=document.querySelector(".header");

if(window.scrollY>80){

header.style.background="rgba(255,255,255,.96)";

header.style.boxShadow=

"0 10px 40px rgba(0,0,0,.08)";

}else{

header.style.background="rgba(255,255,255,.82)";

header.style.boxShadow="none";

}

});



/* ===========================================================
SCROLL ANIMATION
=========================================================== */

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{
threshold:.15
});

document.querySelectorAll(

".product-card,.review,.tech-card,.gallery img,.faq-item"

).forEach(el=>{

observer.observe(el);

});
/* ===========================================================
LOCAL STORAGE
=========================================================== */

loadCart();

function saveCart(){

localStorage.setItem(

"aromeo-cart",

JSON.stringify(cartItems)

);

}

function loadCart(){

const data=localStorage.getItem("aromeo-cart");

if(data){

cartItems=JSON.parse(data);

renderCart();

}

}

const oldRender=renderCart;

renderCart=function(){

oldRender();

saveCart();

}



/* ===========================================================
NEWSLETTER
=========================================================== */

const newsletterForm=document.querySelector(".newsletter-form");

if(newsletterForm){

newsletterForm.addEventListener("submit",(e)=>{

e.preventDefault();

const input=newsletterForm.querySelector("input");

const email=input.value.trim();

const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(!regex.test(email)){

input.style.border="2px solid red";

return;

}

input.style.border="2px solid #6cb46c";

input.value="";

alert("Dziękujemy za zapis!");

});

}



/* ===========================================================
CHECKOUT FORM
=========================================================== */

const checkoutForm=document.getElementById("checkoutForm");

if(checkoutForm){

checkoutForm.addEventListener("submit",(e)=>{

e.preventDefault();

const fields=checkoutForm.querySelectorAll(

"input, textarea"

);

let ok=true;

fields.forEach(field=>{

if(field.value.trim()==""){

field.style.borderColor="#d94141";

ok=false;

}else{

field.style.borderColor="#dddddd";

}

});

if(!ok){

alert("Uzupełnij wszystkie pola.");

return;

}

alert(

"Zamówienie zostało przyjęte."

);

cartItems=[];

renderCart();

checkoutModal.classList.remove("active");

cart.classList.remove("active");

overlay.classList.remove("active");

checkoutForm.reset();

});

}



/* ===========================================================
PARALLAX HERO
=========================================================== */

const heroImage=document.querySelector(".hero-right img");

window.addEventListener("scroll",()=>{

if(!heroImage)return;

const y=window.scrollY;

heroImage.style.transform=

`translateY(${y*0.12}px)`;

});



/* ===========================================================
FADE ELEMENTS
=========================================================== */

const fadeObserver=new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("fade-visible");

}

});

},

{

threshold:.2

}

);

document.querySelectorAll(

"section,.product-card,.review,.tech-card"

).forEach(el=>{

fadeObserver.observe(el);

});



/* ===========================================================
COUNTER
=========================================================== */

const counters=document.querySelectorAll("[data-counter]");

const counterObserver=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(!entry.isIntersecting)return;

const el=entry.target;

const target=parseInt(el.dataset.counter);

let value=0;

const speed=Math.ceil(target/80);

const timer=setInterval(()=>{

value+=speed;

if(value>=target){

value=target;

clearInterval(timer);

}

el.innerText=value;

},18);

counterObserver.unobserve(el);

});

});

counters.forEach(el=>{

counterObserver.observe(el);

});



/* ===========================================================
IMAGE HOVER
=========================================================== */

document.querySelectorAll(".product-card img")

.forEach(img=>{

img.addEventListener("mousemove",(e)=>{

const rect=img.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

img.style.transformOrigin=

`${x}px ${y}px`;

});

});



/* ===========================================================
SMOOTH LINKS
=========================================================== */

document.querySelectorAll('a[href^="#"]')

.forEach(link=>{

link.addEventListener("click",(e)=>{

const href=link.getAttribute("href");

if(href==="#")return;

e.preventDefault();

const target=document.querySelector(href);

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

});

});


closeProduct.addEventListener("click",()=>{

    modal.classList.remove("active");

});

modal.addEventListener("click",(e)=>{

    if(e.target===modal){

        modal.classList.remove("active");

    }

});
/* ===========================================================
PRELOADER
=========================================================== */

window.addEventListener("load",()=>{

const loader=document.querySelector(".preloader");

if(loader){

loader.classList.add("hide");

setTimeout(()=>{

loader.remove();

},700);

}

});