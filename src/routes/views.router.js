import { Router } from "express";
import ProductManager from "../managers/productManager.js";

const viewsRouter = Router();
const manager = new ProductManager("./src/db/products.json");

viewsRouter.get("/products", async (req, res) => {
    const products = await manager.getProducts()
    res.render("home", {products});
})

viewsRouter.get("/realtimeproducts",async (req, res) => {
    res.render("realtimeproducts")
} )
export default viewsRouter;