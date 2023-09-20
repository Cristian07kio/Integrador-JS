const productsContainer = document.querySelector('.products-container')
const productsCart = document.querySelector('.cart-container')
const total = document.querySelector('.total')
const categoriesContainer = document.querySelector('.categories')
const categoriesList = document.querySelectorAll('.category')
const showMoreBtn = document.querySelector('.btn-load')
const buyBtn = document.querySelector('.btn-buy')
const cartBubble = document.querySelector('.cart-bubble')
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

const closeOnScroll = () => {
    if (
        !barsMenu.classList.contains("open-menu") &&
        !cartMenu.classList.contains("open-cart")
    )
    return;

    barsMenu.classList.remove("open-menu");
    cartMenu.classList.remove("open-cart");
    overlay.classList.remove("show-overlay");

};


const createCartProductTemplate = (cartProduct) =>{
    const {id,name,bid,img,quantity} = cartProduct
    return `    
    <div class="cart-item">
      <img src=${img} alt="Te del carrito" />
      <div class="item-info">
        <h3 class="item-title">${name}</h3>
        <p class="item-bid">Current bid</p>
        <span class="item-price">${bid} BTC</span>
      </div>
      <div class="item-handler">
        <span class="quantity-handler down" data-id=${id}>-</span>
        <span class="item-quantity">${quantity}</span>
        <span class="quantity-handler up" data-id=${id}>+</span>
      </div>
    </div>`;
};


const renderCart  = () => {
    if (!cart.length){
        productsCart.innerHTML = '<p class="empty-msg">No hay productos en el carrito.</p>';
        return;
    }
    productsCart.innerHTML = cart.map(createCartProductTemplate).join("")
};


const getCartTotal = () => {
    return cart.reduce((accumulator,current) => accumulator + NUmber(current.bid) * current.quantity, 0)
}

const showCartTotal = () => {
    total.innerHTML = `${getCartTotal().toFixed(2)} BTC`;
  };


const renderCartBubble = () => {
    cartBubble.textContent = cart.reduce((acc, cur) => acc + cur.quantity, 0);
  };

const disableBtn = (btn) => {
    if (!cart.length) {
      btn.classList.add('disabled');
    } else {
      btn.classList.remove('disabled');
    }
  };

  const saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const updateCartState = () => {
    saveCart();
    renderCart();
    showCartTotal();
    disableBtn(buyBtn);
    disableBtn(deleteBtn);
    renderCartBubble();
  };


  const createProductData = ({ id, name, bid, img }) => {
    return {
      id,
      name,
      bid,
      img,
    };
  };


  const addUnitToProduct = (product) => {
    cart = cart.map((cartProduct) => cartProduct.id === product.id
      ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
      : cartProduct);
  };


  const createCartProduct = ( product) =>{
    cart = [...cart, {...product, quantity: 1}]
};


const showSuccessModal = (msg) => {
    successModal.classList.add("active-modal")
    successModal.textContent = msg
    setTimeout(() =>{
        successModal.classList.remove("active-modal")
    }, 1500)
};

const addProduct = (e) => {
    if (!e.target.classList.contains('btn-add')) return;
    const product = createProductData(e.target.dataset);
    if (isExistingCartProduct(product)) {
      addUnitToProduct(product)
      showSuccessModal("Se agregó una unidad del té al carrito")
    }else{
      createCartProduct(product)
      showSuccessModal("El té se ha agregado al carrito")
    }
    updateCartState()
  };



  const handlePlusBtnEvent = (id) =>{
    const existingCartProduct = cart.find((item) => item.id === id)
    addUnitToProduct(existingCartProduct)
  }


  const handleMinusBtnEvent = (id) =>{
    const existingCartProduct = cart.find((item) => item.id === id)
  
    if(existingCartProduct.quantity === 1){
      if(window.confirm("¿Desea eliminar el té del carrito?")){
        removeProductFromCart(existingCartProduct)
      }
      return;
    }
    subtractProductUnit(existingCartProduct)
  }
  

  const removeProductFromCart = (product) =>{
    cart = cart.filter((item) => item.id !== product.id)
    updateCartState()
  }
  

  const subtractProductUnit = (product) =>{
  cart = cart.map((item) => {
    return item.id === product.id ?
    { ...item, quantity: Number(item.quantity) - 1 }
    : item
  });
  }
  
  
  const handleQuantity = (e) => {
    if(e.target.classList.contains("down")){
      handleMinusBtnEvent(e.target.dataset.id)
    }else if (e.target.classList.contains("up")){
      handlePlusBtnEvent(e.target.dataset.id)
    }
  
    updateCartState()
  }
  
  const resetCartItems = () =>{
    cart = []
    updateCartState()
  }
  
  
  const completeCartAction = (confirmMsg, successMsg) =>{
    if(!cart.length) return;
    if(window.confirm(confirmMsg)){
      resetCartItems()
      alert(successMsg)
    }
  }
  

  const completeBuy = () =>{
    completeCartAction("¿Desea completar su compra?", "¡Muchas Gracias por su compra!")
  }
  

  const deleteCart = () =>{
    completeCartAction("¿Desea vaciar el carrito?", "¡No hay productos en el carrito!")
  }
  
  const init = () =>{
    renderProducts(appState.products[0])
    showMoreBtn.addEventListener("click", showMoreProducts)
    categoriesContainer.addEventListener("click", applyFilter)
    cartBtn.addEventListener("click", toggleCart)
    menuBtn.addEventListener("click", toggleMenu)
    window.addEventListener("scroll", closeOnScroll)
    barsMenu.addEventListener("click", closeOnClick)
    overlay.addEventListener("click", closeOnOverlayClick)
    document.addEventListener("DOMContentLoaded", renderCart)
    document.addEventListener("DOMContentLoaded", showCartTotal)
    productsContainer.addEventListener("click", addProduct)
    productsCart.addEventListener("click", handleQuantity)
    buyBtn.addEventListener("click", completeBuy)
    deleteBtn.addEventListener("click", deleteCart)
    disableBtn(buyBtn)
    disableBtn(deleteBtn)
    renderCartBubble(cart)
  }
  
  
  init()