import { Router } from "express";
import CartManager from "../managers/cartManager.js";

const CART_PATH = './src/db/cart.json'

const cartRouter = Router();
const cartManager = new CartManager(CART_PATH);

cartRouter.post("/", async (req, res) => {
    try {
        const nuevoCarrito = await cartManager.crearCarrito(); 
        res.json(nuevoCarrito); 
    } catch (error) {
        res.status(500).json({error: "Error al intentar crear un carrito, moriras!"}); 
    }
})

//2) Listamos los productos que pertenecen a determinado carrito: 

cartRouter.get("/:cid", async (req, res) => {
    const cartId = parseInt(req.params.cid); 

    try {
        const carritoBuscado = await cartManager.getCarritoById(cartId); 
        res.json(carritoBuscado.products); 
    } catch (error) {
        res.status(500).send({ status: "error", message: "No tengo una respuesta acertada para tu consulta" }); 
    }
})

//3) Agregar productos al carrito: 

cartRouter.post("/:cid/product/:pid", async (req, res) => {
    const cartId = parseInt(req.params.cid); 
    const productId = req.params.pid; 
    const quantity = req.body.quantity || 1; 

    try {
        const actualizarCarrito = await cartManager.agregarProductoAlCarrito(cartId, productId, quantity); 
        res.json(actualizarCarrito.products);

    } catch (error) {
        res.status(500).json({error: "Error fatal se suspende la navidad"}); 
    }
})

export default cartRouter;
