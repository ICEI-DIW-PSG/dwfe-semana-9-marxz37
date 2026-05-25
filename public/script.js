const data = {
    produtos: [
        { id: 1, nome: "Smartphone Galaxy", preco: 1500.00, categoria: "Celulares", imagem: "https://m.media-amazon.com/images/I/71ZoDT7a2wL._AC_SL1500_.jpg", descricao: "Celular rápido com ótima câmera.", emEstoque: true },
        { id: 2, nome: "iPhone 13", preco: 4500.00, categoria: "Celulares", imagem: "https://tse2.mm.bing.net/th/id/OIP.o1Rhfh1-sjwQj0qVhx9GRgHaHa?r=0&cb=thfvnextfalcon&rs=1&pid=ImgDetMain&o=7&rm=3", descricao: "Aparelho premium da Apple.", emEstoque: false },
        { id: 3, nome: "Notebook Dell", preco: 3500.50, categoria: "Notebooks", imagem: "https://panoramadigital.com.br/wp-content/uploads/2018/01/Notebook-Dell-Inspiron-Core-i7.jpg", descricao: "Notebook ideal para trabalho e estudo.", emEstoque: true },
        { id: 4, nome: "Macbook Air", preco: 7000.00, categoria: "Notebooks", imagem: "https://macfinder.co.uk/wp-content/uploads/2022/12/img-MacBook-Air-13-Inch-22502.jpg", descricao: "Leve, fino e muito potente.", emEstoque: true },
        { id: 5, nome: "Mouse Gamer", preco: 150.90, categoria: "Acessórios", imagem: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/12/61-f0kqym0l-_ac_sl1500_.jpg", descricao: "Mouse com led RGB e alta precisão.", emEstoque: true },
        { id: 6, nome: "Teclado Mecânico", preco: 299.99, categoria: "Acessórios", imagem: "https://images3.kabum.com.br/produtos/fotos/93163/93163_1_1523620161_gg.jpg", descricao: "Teclado com switches azuis.", emEstoque: false },
        { id: 7, nome: "PlayStation 5", preco: 4000.00, categoria: "Games", imagem: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6523/6523167_bd.jpg", descricao: "Console de última geração.", emEstoque: true },
        { id: 8, nome: "Jogo - Homem Aranha", preco: 250.00, categoria: "Games", imagem: "https://cdn1.epicgames.com/offer/4bc43145bb8245a5b5cc9ea262ffbe0e/EGS_MarvelsSpiderManRemastered_InsomniacGamesNixxesSoftware_S1_2560x1440-73702d11161b29a0b7c40a8b489b1808", descricao: "Jogo de ação e aventura em mundo aberto.", emEstoque: true }
    ]
};

const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const btnRender = document.querySelector("#btnRender");

function formatPrice(preco) {
    return "R$ " + preco.toFixed(2).replace(".", ",");
}

function createProductCard(produto) {
    const card = document.createElement("div"); 
    card.setAttribute("data-id", produto.id); 
    card.classList.add("card"); 
    
    card.style.padding = "10px"; 
    card.style.borderRadius = "8px";

    card.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}">
        <h3 class="card-title">${produto.nome}</h3>
        <p>${produto.categoria}</p>
        <p><strong>${formatPrice(produto.preco)}</strong></p>
        <button class="btn-detalhes">Ver detalhes</button>
        <button class="btn-destaque">Destacar</button>
    `;

    const btnDetalhes = card.querySelector(".btn-detalhes");
    const btnDestaque = card.querySelector(".btn-destaque");

    btnDetalhes.addEventListener("click", function() {
        showProductDetails(produto);
    });

    btnDestaque.addEventListener("click", function() {
        card.classList.toggle("highlight"); 
    });

    return card; 
}

function renderProducts(produtos) {
    productList.innerHTML = "";

    for (let i = 0; i < produtos.length; i++) {
        const cardPronto = createProductCard(produtos[i]);
        productList.appendChild(cardPronto); 
    }

    const allCards = document.querySelectorAll(".card");
    for (let i = 0; i < allCards.length; i++) {
        console.log("Card renderizado no DOM. ID:", allCards[i].getAttribute("data-id"));
    }
}

function renderCategories() {
    const categoriasUnicas = [];
    
    for (let i = 0; i < data.produtos.length; i++) {
        let cat = data.produtos[i].categoria;
        if (!categoriasUnicas.includes(cat)) {
            categoriasUnicas.push(cat);
        }
    }

    for (let i = 0; i < categoriasUnicas.length; i++) {
        const option = document.createElement("option");
        option.value = categoriasUnicas[i];
        option.textContent = categoriasUnicas[i];
        categorySelect.appendChild(option);
    }
}

function showProductDetails(produto) {
    const statusEstoque = produto.emEstoque ? "🟢 Em estoque" : "🔴 Sem estoque";
    
    productDetails.innerHTML = `
        <h2>${produto.nome}</h2>
        <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>
        <p><strong>Categoria:</strong> ${produto.categoria}</p>
        <p><strong>Status:</strong> ${statusEstoque}</p>
        <p><strong>Descrição:</strong> ${produto.descricao}</p>
    `;
}

function filterProducts() {
    const textoBusca = searchInput.value.toLowerCase();
    const categoriaSelecionada = categorySelect.value;
    
    const filtrados = data.produtos.filter(function(produto) {
        const nomeBate = produto.nome.toLowerCase().includes(textoBusca);
        const categoriaBate = (categoriaSelecionada === "Todas") || (produto.categoria === categoriaSelecionada);
        
        return nomeBate && categoriaBate;
    });

    renderProducts(filtrados);
}

searchInput.addEventListener("input", filterProducts);
categorySelect.addEventListener("change", filterProducts);
btnRender.addEventListener("click", function() {
    searchInput.value = "";
    categorySelect.value = "Todas";
    renderProducts(data.produtos);
});

renderCategories();
renderProducts(data.produtos);