import express, { Router }  from "express";
import cartRouter from "./routes/cart.router.js";
import productsRouter from "./routes/products.router.js"

const app = express();
const HOSTNAME = "localhost";
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);


app.listen(PORT, () => {
  console.log(`Servidor corriendo en  http://${HOSTNAME}:${PORT}`);
});
