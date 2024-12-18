import { Router } from "express";
import ProductManager from "../managers/productManager.js";

const PRODUCTS_PATH = './src/db/products.json'

const productsRouter = Router();
const productManager = new ProductManager(PRODUCTS_PATH);

productsRouter.get("/", (req, res) => {
  res.send("hola");
});


productsRouter.get("/api/products", async (req, res) => {
  let limit = req.query.limit;
  const products = await productManager.getProducts();

  if (limit) return res.send(products.slice(0, limit));

  res.send({ status: "success", products });
});

productsRouter.get("/api/products/:pid", async (req, res) => {
  let id = parseInt(req.params.pid);
  const product = await productManager.getProductById(id);
  res.send(product);
});

productsRouter.post("/api/products", (req, res) => {
  const newProduct = req.body;
  productManager.addProduct(newProduct);
  res.send("Producto creado con éxito");
});

productsRouter.put("/api/products/:pid", (req, res) => {
  let id = parseInt(req.params.pid);
  const { title, description, code, stock, thumbnail, price } = req.body;
  const alteredProduct = {
    id,
    title,
    description,
    code,
    stock,
    thumbnail,
    price,
  };
  productManager.changeProductById(id, alteredProduct);
  res.send("Producto modificado con éxito");
});

productsRouter.delete("/api/products/:pid", (req, res) => {
  let id = parseInt(req.params.pid);

  if (id) {
    productManager.deteleProductById(id);
    res.send({ status: "success", mensaje: "Producto eliminado exitosamente" });
  }
  res.status(404).send({ status: "error", message: "Producto no encontrado" });
});

export default productsRouter;
