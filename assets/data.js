const productsData = [
    {
        id: 1,
        name: "Te Negro",
        bid: 6.89,
        category: "comun",
        cardImg: "./img/tipos-de-te/Te-Negro.png",
    },
    {
        id: 2,
        name: "Jazmin",
        bid: 5.89,
        category: "especiales",
        cardImg: "./img/tipos-de-te/Especiales/Jazmin.png",
    },
    {
        id: 3, 
        name: "Te Chai",
        bid: 4.89,
        category: "especiales",
        cardImg: "./img/tipos-de-te/Especiales/Te-Chai.png",
    },
    {
        id: 4,
        name: "Te Rojo",
        bid: 3.67,
        category: "especiales",
        cardImg: "./img/tipos-de-te/Especiales/Te-Rojo.png",
    },
    {
        id: 5,
        name: "Te Verde Citrus",
        bid: 4.52,
        category: "especiales",
        cardImg:"./img/tipos-de-te/Especiales/Te-verde-Citrus.png",
    },
    {
        id: 6,
        name: "Te Verde",
        bid: 7.33,
        category: "especiales",
        cardImg: "./img/tipos-de-te/Especiales/Te-Verde.png",
    },
    {
        id: 7,
        name: "Tilo, Manzanilla y Cedron",
        bid: 2.2,
        category: "especiales",
        cardImg: "./img/tipos-de-te/Especiales/Tilo-Manzanilla-Cedron.png",
    },
    {
        id: 8,
        name: "Boldo",
        bid: 1.12,
        category: "herboristeria",
        cardImg: "./img/tipos-de-te/Herboristeria/Boldo.png",
    },
    {
        id: 9,
        name: "Cedron",
        bid: 0.5,
        category: "herboristeria",
        cardImg: "./img/tipos-de-te/Herboristeria/Cedron.png",
    },
    {
        id: 10,
        name: "Manzanilla con Anis",
        bid: 8.35,
        category: "herboristeria",
        cardImg: "./img/tipos-de-te/Herboristeria/Manzanilla-con-Anis.png",
    },
    {
        id: 11,
        name: "Manzanilla",
        bid: 8.65,
        category: "herboristeria",
        cardImg: "./img/tipos-de-te/Herboristeria/Manzanilla.png",
    },
    {
        id: 12,
        name: "Menta Peperina",
        bid: 9.29,
        category: "herboristeria",
        cardImg: "./img/tipos-de-te/Herboristeria/Menta-Peperina.png",
    },
    {
        id: 13,
        name: "Mezcla de Hierbas",
        bid: 8.27,
        category: "herboristeria",
        cardImg: "./img/tipos-de-te/Herboristeria/Mezcla-de-hierbas.png",
    },
    {
        id: 14,
        name: "Tilo",
        bid: 5.55,
        category: "herboristeria",
        cardImg: "./img/tipos-de-te/Herboristeria/Tilo.png",
    },
    {
        id: 15,
        name: "Canela",
        bid: 7.46,
        category: "saborizados",
        cardImg: "./img/tipos-de-te/Saborizados/Canela.png",
    },
    {
        id: 16,
        name: "Durazno",
        bid: 6.89,
        category: "saborizados",
        cardImg:"./img/tipos-de-te/Saborizados/Durazno.png",
    },
    {
        id: 17,
        name: "Frutas Tropicales",
        bid: 4.35,
        category: "saborizados",
        cardImg: "./img/tipos-de-te/Saborizados/Frutas-Tropicales.png",
    },
    {
        id: 18,
        name: "Frutilla",
        bid: 9.32,
        category: "saborizados",
        cardImg: "./img/tipos-de-te/Saborizados/Frutilla.png",
    },
    {
        id: 19,
        name: "Limon",
        bid: 7.77,
        category: "saborizados",
        cardImg: "./img/tipos-de-te/Saborizados/Limon.png",
    },
    {
        id: 20,
        name: "Mandarina, Naranja y Pomelo",
        bid: 4.51,
        category:"saborizados",
        cardImg: "./img/tipos-de-te/Saborizados/Mandarina-Naranja-Pomelo.png",
    },
    {
        id: 21,
        name: "Manzana y Canela",
        bid: 2.55,
        category: "saborizados",
        cardImg: "./img/tipos-de-te/Saborizados/Manzana-Canela.png",
    },
    {
        id: 22,
        name: "Maracuya",
        bid: 2.25,
        category: "saborizados",
        cardImg:"./img/tipos-de-te/Saborizados/Maracuya.png"
    },
    {
        id: 23,
        name: "Rosa Mosqueta y Manzanilla",
        bid: 5.37,
        category: "saborizados",
        cardImg: "./img/tipos-de-te/Saborizados/Rosa-Mosqueta-Manzanilla.png",
    },
    
]

const divideProductsInParts = (size) => {
    let productsList = []
    for (let i = 0; i < productsData.length; i+= size) {
      productsList.push(productsData.slice(i,i + size))
  
    }
    return productsList;
  }

  const appState = { 
    products: divideProductsInParts(6), 
    currentProductsIndex: 0,
    productsLimit: divideProductsInParts(6).length,
    activeFilter: null
  }