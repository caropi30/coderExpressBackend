import { promises as fs } from "fs";

class CartManager {
  constructor(path) {
    this.carts = [];
    this.path = path;
    this.ultId = 0;

    // Carga los carritos almacenados en el archivo:
    this.cargarCarritos();
  }

  async cargarCarritos() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      this.carts = JSON.parse(data);

      // Sincroniza el ID al más alto si hay datos en el archivo
      if (this.carts.length > 0) {
        this.ultId = Math.max(...this.carts.map((cart) => cart.id));
      }
    } catch (error) {
      console.error("Error al cargar los carritos:", error.message);

      // Si el archivo no existe, crea uno nuevo vacío
      if (error.code === "ENOENT") {
        console.log("Archivo no encontrado, creando uno nuevo.");
        await this.guardarCarritos();
      } else {
        throw new Error("Error inesperado al cargar los carritos.");
      }
    }
  }

  async guardarCarritos() {
    try {
      await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
    } catch (error) {
      console.error("Error al guardar los carritos:", error.message);
      throw new Error("No se pudo guardar los carritos.");
    }
  }

  async crearCarrito() {
    try {
      const nuevoCarrito = {
        id: ++this.ultId,
        products: [],
      };

      this.carts.push(nuevoCarrito);
      await this.guardarCarritos();
      return nuevoCarrito;
    } catch (error) {
      console.error("Error al crear un nuevo carrito:", error.message);
      throw new Error("No se pudo crear el carrito.");
    }
  }

  async getCarritoById(cartId) {
    try {
      const carrito = this.carts.find((c) => c.id === cartId);

      if (!carrito) {
        throw new Error(`No existe un carrito con el ID ${cartId}.`);
      }

      return carrito;
    } catch (error) {
      console.error(`Error al obtener el carrito con ID ${cartId}:`, error.message);
      throw error; // Propaga el error para que pueda ser manejado externamente
    }
  }

  async agregarProductoAlCarrito(cartId, productId, quantity = 1) {
    try {
      const carrito = await this.getCarritoById(cartId);

      const existeProducto = carrito.products.find((p) => p.product === productId);

      if (existeProducto) {
        existeProducto.quantity += quantity;
      } else {
        carrito.products.push({ product: productId, quantity });
      }

      await this.guardarCarritos();
      return carrito;
    } catch (error) {
      console.error(
        `Error al agregar el producto ${productId} al carrito ${cartId}:`,
        error.message
      );
      throw error; // Propaga el error para que pueda ser manejado externamente
    }
  }
}

export default CartManager;
