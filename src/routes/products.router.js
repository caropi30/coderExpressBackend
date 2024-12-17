

import { Router } from 'express';
import ProductManager from '../controllers/productscontrollers.js';

const productsRouter = Router();
const productManager = new ProductManager();

productsRouter.get('/', (req, res) => {
    res.send('hola')
})

productsRouter.get('/api/products', async (req, res) => {
    let limit = req.query.limit
    const products = await productManager.getProducts()

    if (limit) return res.send(products.slice(0, limit))

    res.send({ status: 'success', products })
})

productsRouter.get('/api/products/:pid', async (req, res) => {
    let id = parseInt(req.params.pid)
    console.log(id)
    const product = await productManager.getProductById(id)
    res.send(product)
})

productsRouter.post('/api/products', (req, res) => {
    const newProduct = req.body
    console.log('nuevo producto --->', newProduct)
    productManager.addProduct(newProduct)
    res.send('Producto creado con éxito')
})

productsRouter.put('/api/products/:pid', (req, res) => {
    let id = parseInt(req.params.pid)
    const { title, description, code, stock, thumbnail, price } = req.body
    const alteredProduct = {
        id,
        title,
        description,
        code,
        stock,
        thumbnail,
        price,
    }
    productManager.changeProductById(id, alteredProduct)
    res.send('Producto alterado con éxito')
})

productsRouter.delete('/api/products/:pid', (req, res) => {
  let id = parseInt(req.params.pid)

  if(id) {
    productManager.deteleProductById(id)
    res.send({status: 'success', mensaje: 'Producto eliminado exitosamente'})
  }
  res.status(404).send({status: 'error', message: 'Producto no encontrado'})
})

export default productsRouter;