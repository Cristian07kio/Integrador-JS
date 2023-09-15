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
};

const isLastIndexOf = () => {
    return appState.currentProductsIndex === appState.productLimit -1
};

const showMoreProducts = () => {
    appState.currentProductsIndex += 1
    let {products, currentProductsIndex} = appState
    renderProducts(products, [currentProductsIndex])
    if(isLastIndexOf()){
        shoeMoreBtn.classList.add("hidden")
    }
};

const setShowMoreVisibility = () => {
    if (!appState.activeFilter){
        showMoreBtn.classList.remove("hidden")
        return;
    }
    showMoreBtn.classList.add("hidden")
};

const changeBtnActiveState =  (selectedCategory) => {
    const categories = [...categoriesList]
    categories.forEach((categoryBtn) =>{
        if(categoryBtn.dataset.category !== selectedCategory){
            categoryBtn.classList.remove("active")
            return;
        }
        categoryBtn.classList.add("active")
    })
};

const changeFilterState = (btn) => {
    appState.activeFilter = btn.dataset.category
    changeBtnActiveState(appState.activateFilter)
    setShowMoreVisibility(appState.activateFilter)
};

const isInactiveFilterBtn = (element) => {
    return (
        element.classList.contains("category") && !element.classList.contains("activate")
    )
};

const applyFilter = (event) => {
    const { target } = event
    if(isInactiveFilterBtn(target)) return;
    productsContainer.innerHTML =""

    if(appState.activateFilter){
        renderFilteredProducts();
        appState.currentProductsIndex = 0;
        return;
    }

    renderProducts(appState.products[0])
    
};

const renderFilteredProducts = () => {
    const FilteredProducts = productsData.filter(
        (product) => product.category === appState.activeFilter
    );
    renderProducts(FilteredProducts)
};

const toggleMenu = () => {
    barsMenu.classList.toggle("open-menu")
    if (cartMenu.classList.contains("open-cart")){
        cartMenu.classList.remove("open-cart")
        return;
    }
    overlay-classList.toggle("show-overlay")
};

const toggleCart = () => {
    cartMenu.classList.toggle("open-cart")
    if(barsMenu.classList.contains("open-menu")){
        barsMenu.classList.remove("open-menu")
        return;
    }
    overlay.classList.toggle("show-overlay")
};

const closeOnClick = (e) => {
    if(!e.target.classList.remove("navbar-link"))return;
    barsMenu.classList.remove("open-menu")
    overlay.classList.remove("show-overlay")
};

