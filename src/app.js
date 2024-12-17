import express from 'express'
import cartRouter from './controllers/cart.router.js'
import productsRouter from './controllers/products.router.js'

const app = express()
const HOSTNAME = 'localhost'
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true})); 


app.use("/api/proucts", productsRouter); 
app.use("/api/cart", cartRouter); 


app.listen(PORT, () => {
    console.log(`Servidor corriendo en  http://${HOSTNAME}:${PORT}`)
})
