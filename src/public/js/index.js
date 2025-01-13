const socket = io();
const dom = document;
const productsContainer = dom.getElementById("products")
const btnEnviar = dom.getElementById("btnEnviar");

socket.on("products", (data) => {
    console.log('data --->',data)
    renderProducts(data)
});


const renderProducts = (products) => {
    products.forEach(item => {
        const card = dom.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <p>${item.title}</p>
            <p>${item.price}</p>
            <p>${item.description}</p>
            <button type="button" class="btn btn-primary btnEliminar">
                Eliminar
            </button>
        `;
        productsContainer.appendChild(card)

        card.querySelector("button").addEventListener("click", () => {
            deleteProduct(item.id);
        })
    });
};


const deleteProduct = (id) => {
    socket.emit("deleteProduct", id)
}

btnEnviar.addEventListener("click", () => {
    addProduct();
});

const addProduct = () => {
    const product = {
        title: dom.getElementById("title").value,
        description: dom.getElementById("description").value,
        price: dom.getElementById("price").value,
        thumbnail: dom.getElementById("thumbnail").value,
        code: dom.getElementById("code").value,
        category: dom.getElementById("category").value,
        status: dom.getElementById("status").value === "true",
        stock: dom.getElementById("stock").value,
    };
    console.log('PRODUCTO EN INDEX --->', product)
    socket.emit("addProduct", product)
};

const deletePoduct = () => {

}