import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import cartRouter from "./routes/cart.router.js";
import productsRouter from "./routes/products.router.js"
import viewsRouter from "./routes/views.router.js";
import ProductManager from "./managers/productManager.js";


const app = express();
const HOSTNAME = "localhost";
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));

app.engine('handlebars', engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views")

app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter)


const httpServer = app.listen(PORT, () => {
  console.log(`Servidor corriendo en  http://${HOSTNAME}:${PORT}`);
});

const io = new Server(httpServer);
const manager = new ProductManager("./src/db/products.json")

io.on("connection", async (socket) => {
  console.log('Hola')
  socket.emit("products", await manager.getProducts());

  socket.on("addProduct", async (product) => {
    try{
      console.log('Entre al try')
      await manager.addProduct(product);
      io.sockets.emit("products", await manager.getProducts());
    } catch(error) {
      console.error("Error --->", error)
    }
  });
});