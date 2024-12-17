import { Router } from 'express';
import CartManager from '../controllers/cartManager.js';

const cartRouter = Router();
const cartManager = new CartManager();


cartRouter.get('/api/carts', (req, res) => {
    res.send('Seccion Carrito')
})

cartRouter.post('/api/carts', (req, res) => {
    res.send('Seccion Carrito')
})
