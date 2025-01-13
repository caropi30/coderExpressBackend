const socket = io();
const dom = document;
const productsContainer = dom.getElementById("products")
const btnEnviar = dom.getElementById("btnEnviar");

socket.on("products", (data) => {
    console.log('data --->',data)
    renderProducts(data)
});


const renderProducts = (products) => {
    const productsRow = document.getElementById("productsRow");
    productsRow.innerHTML = ""; // Limpia el contenedor antes de renderizar
  
    products.forEach((item) => {
      const cardContainer = document.createElement("div");
      cardContainer.classList.add("col-12", "col-sm-6", "col-md-4", "col-lg-3");
  
      cardContainer.innerHTML = `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
            <p class="card-text">Precio: ${item.price}</p>
            <p class="card-text">${item.description}</p>
            <button type="button" class="btn btn-primary btnEliminar">Eliminar</button>
          </div>
        </div>
      `;
  
      const btnEliminar = cardContainer.querySelector(".btnEliminar");
      btnEliminar.addEventListener("click", () => {
        deleteProduct(item.id);
      });
  
      productsRow.appendChild(cardContainer);
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