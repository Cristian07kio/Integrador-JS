const productsContainer = document.querySelector('.products-container')
const productsCart = document.querySelector('.cart-container')
const total = document.querySelector('.total')
const categoriesContainer = document.querySelector('.categories')
const categoriesList = document.querySelectorAll('.category')
const showMoreBtn = document.querySelector('.btn-load')
const buyBtn = document.querySelector('.btn-buy')
const catBubble = document.querySelector('.cart-bubble')
const cartBtn = document.querySelector('.cart-label')
const menuBtn = document.querySelector('.menu-label')
const cartMenu = document.querySelector('.cart')
const barsMenu = document.querySelector('.navbar-list')
const overlay = document.querySelector('.overlay')
const successModal = document.querySelector('.add-modal')
const deleteBtn = document.querySelector('.btn-delete')

let cart = JSON.parse(localStorage.getItem("cart")) || []

const createProductTemplate = (product) => {
    const {id, name, bid, cardImg } = product;
    return `
    <div class="product">
    <img src=${cardImg} alt=${name} />
    <div class="product-info">

        <div class="product-top">
            <h3>${name}</h3>
            <p>Current Bid</p>
        </div>

        <div class="product-mid">
            <span>${bid} BTC</span>
        </div>


        <div class="product-bot">
            <div class="product-offer">
                <div class="offer-time">
                    <img src="./img/tea.png.png" alt="" />
                    <p>05:12:07</p>
                </div>
                <button class="btn-add"
                data-id='${id}'
                data-name='${name}'
                data-bid='${bid}'
                data-img='${cardImg}'>Add</button>
            </div>
        </div>
    </div>
</div>`;
};

const renderProducts = (productsList) => {
    productsContainer.innerHTML +=productList.map(createProductTemplate).join("")
}

const isLastIndexOf = () => {
    return appState.currentProductsIndex === appState.productLimit -1
}

const showMoreProducts = () => {
    appState.currentProductsIndex += 1
    let {products, currentProductsIndex} = appState
    renderProducts(products, [currentProductsIndex])
    if(isLastIndexOf()){
        shoeMoreBtn.classList.add("hidden")
    }
}

const setShowMoreVisibility = () => {
    if (!appState.activeFilter){
        showMoreBtn.classList.remove("hidden")
        return;
    }
    showMoreBtn.classList.add("hidden")
}