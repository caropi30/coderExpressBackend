import express from 'express'
import ProductManager from './managers/productManager.js'

const app = express()
const HOSTNAME = 'localhost'
const PORT = 8080
const PRODUCTS_PATH = './src/db/products.json'

const manager = new ProductManager(PRODUCTS_PATH)

app.use(express.json())

app.get('/', (req, res) => {
    res.send('hola')
})

app.get('/api/products', async (req, res) => {
    let limit = req.query.limit
    const products = await manager.getProducts()

    if (limit) return res.send(products.slice(0, limit))

    res.send({ status: 'success', products })
})

app.get('/api/products/:pid', async (req, res) => {
    let id = parseInt(req.params.pid)
    console.log(id)
    const product = await manager.getProductById(id)
    res.send(product)
})

app.post('/api/products', (req, res) => {
    const newProduct = req.body
    console.log('nuevo producto --->', newProduct)
    manager.addProduct(newProduct)
    res.send('Producto creado con éxito')
})

app.put('/api/products/:pid', (req, res) => {
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
    manager.changeProductById(id, alteredProduct)
    res.send('Producto alterado con éxito')
})

app.delete('/api/products/:pid', (req, res) => {
  let id = parseInt(req.params.pid)

  if(id) {
    manager.deteleProductById(id)
    res.send({status: 'success', mensaje: 'Producto eliminado exitosamente'})
  }
  res.status(404).send({status: 'error', message: 'Producto no encontrado'})
})

app.get('/api/carts', (req, res) => {
    res.send('Seccion Carrito')
})

app.post('/api/carts', (req, res) => {
    res.send('Seccion Carrito')
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en  http://${HOSTNAME}:${PORT}`)
})
